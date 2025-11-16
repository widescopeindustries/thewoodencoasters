#!/usr/bin/env node

/**
 * Unsplash Stock Photo Agent
 * Fetches wooden coaster images from Unsplash API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'stock-coasters');
const NUM_PHOTOS = 10;

// Unsplash API configuration
// You can get a free API key from https://unsplash.com/developers
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'demo';

// Search queries to try for variety
const SEARCH_QUERIES = [
  'wooden coaster drink',
  'wood coaster table',
  'wooden drink coasters',
  'wood coasters coffee'
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

async function searchUnsplash(query, perPage = 10) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const headers = {
    'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    'Accept-Version': 'v1'
  };

  try {
    const data = await makeRequest(url, headers);
    return data.results || [];
  } catch (error) {
    console.error(`Error searching Unsplash for "${query}":`, error.message);
    return [];
  }
}

async function main() {
  console.log('🎨 Unsplash Agent: Starting photo collection...');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allPhotos = [];

  // Try different search queries for variety
  for (const query of SEARCH_QUERIES) {
    console.log(`\n🔍 Searching Unsplash: "${query}"`);
    const photos = await searchUnsplash(query, 5);

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
    console.error('   2. Set UNSPLASH_ACCESS_KEY environment variable for better results');
    console.error('      Get a free key at: https://unsplash.com/developers');
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
    const filename = `unsplash-${photo.id}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`   ⏭️  Skipped (exists): ${filename}`);
      continue;
    }

    try {
      // Use regular quality image
      const imageUrl = photo.urls.regular;
      await downloadImage(imageUrl, filepath);
      downloaded++;

      console.log(`   ✅ Downloaded ${i + 1}/${photosToDownload.length}: ${filename}`);
      console.log(`      By: ${photo.user.name} (@${photo.user.username})`);
      console.log(`      URL: ${photo.links.html}`);

      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`   ❌ Failed to download ${filename}:`, error.message);
    }
  }

  console.log(`\n✨ Unsplash Agent Complete!`);
  console.log(`   Downloaded: ${downloaded} new photos`);
  console.log(`   Total in folder: ${fs.readdirSync(OUTPUT_DIR).filter(f => f.startsWith('unsplash-')).length}`);
  console.log(`\n📝 Note: Please attribute Unsplash photographers when using these images.`);
  console.log(`   See: https://unsplash.com/license`);
}

main().catch(console.error);
