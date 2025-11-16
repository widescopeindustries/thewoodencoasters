#!/usr/bin/env node

/**
 * Pexels Stock Photo Agent
 * Fetches wooden coaster images from Pexels API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'stock-coasters');
const NUM_PHOTOS = 10;

// Pexels API configuration
// You can get a free API key from https://www.pexels.com/api/
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

// Search queries to try for variety
const SEARCH_QUERIES = [
  'wooden coasters',
  'wood drink coasters',
  'rustic coasters',
  'handmade wood coasters'
];

function makeRequest(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function searchPexels(query, perPage = 10) {
  if (!PEXELS_API_KEY) {
    console.error('❌ PEXELS_API_KEY environment variable not set');
    console.error('   Get a free API key at: https://www.pexels.com/api/');
    return [];
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const headers = {
    'Authorization': PEXELS_API_KEY
  };

  try {
    const data = await makeRequest(url, headers);
    return data.photos || [];
  } catch (error) {
    console.error(`Error searching Pexels for "${query}":`, error.message);
    return [];
  }
}

async function main() {
  console.log('🎨 Pexels Agent: Starting photo collection...');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);

  if (!PEXELS_API_KEY) {
    console.error('\n❌ Missing PEXELS_API_KEY environment variable');
    console.error('   To use this agent:');
    console.error('   1. Get a free API key at: https://www.pexels.com/api/');
    console.error('   2. Run: export PEXELS_API_KEY="your-key-here"');
    console.error('   3. Run this script again');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allPhotos = [];

  // Try different search queries for variety
  for (const query of SEARCH_QUERIES) {
    console.log(`\n🔍 Searching Pexels: "${query}"`);
    const photos = await searchPexels(query, 5);

    if (photos.length > 0) {
      console.log(`   Found ${photos.length} photos`);
      allPhotos.push(...photos);
    } else {
      console.log(`   No results found`);
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  if (allPhotos.length === 0) {
    console.error('\n❌ No photos found. Please check:');
    console.error('   1. Your internet connection');
    console.error('   2. Your PEXELS_API_KEY is valid');
    return;
  }

  // Remove duplicates based on photo ID
  const uniquePhotos = Array.from(new Map(allPhotos.map(p => [p.id, p])).values());

  // Limit to NUM_PHOTOS
  const photosToDownload = uniquePhotos.slice(0, NUM_PHOTOS);

  console.log(`\n📥 Downloading ${photosToDownload.length} unique photos...`);

  let downloaded = 0;
  for (let i = 0; i < photosToDownload.length; i++) {
    const photo = photosToDownload[i];
    const filename = `pexels-${photo.id}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`   ⏭️  Skipped (exists): ${filename}`);
      continue;
    }

    try {
      // Use large quality image
      const imageUrl = photo.src.large;
      await downloadImage(imageUrl, filepath);
      downloaded++;

      console.log(`   ✅ Downloaded ${i + 1}/${photosToDownload.length}: ${filename}`);
      console.log(`      By: ${photo.photographer}`);
      console.log(`      URL: ${photo.url}`);

      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`   ❌ Failed to download ${filename}:`, error.message);
    }
  }

  console.log(`\n✨ Pexels Agent Complete!`);
  console.log(`   Downloaded: ${downloaded} new photos`);
  console.log(`   Total in folder: ${fs.readdirSync(OUTPUT_DIR).filter(f => f.startsWith('pexels-')).length}`);
  console.log(`\n📝 Note: Please attribute Pexels photographers when using these images.`);
  console.log(`   See: https://www.pexels.com/license/`);
}

main().catch(console.error);
