# Stock Photo Collection Agents

This directory contains automated agents for collecting high-quality stock photos of wooden coasters for The Wooden Coasters website.

## Available Agents

### 1. Unsplash Agent (`unsplash-agent.js`)
Searches and downloads wooden coaster images from Unsplash.

**Features:**
- Searches multiple query variations for diversity
- Downloads 10 photos (configurable)
- Landscape orientation optimized
- Free to use with attribution

**Usage:**
```bash
# Basic usage (works with demo key, limited results)
node scripts/unsplash-agent.js

# With API key (recommended for better results)
export UNSPLASH_ACCESS_KEY="your-key-here"
node scripts/unsplash-agent.js
```

**Get an API Key:**
1. Visit https://unsplash.com/developers
2. Create a free account
3. Create a new application
4. Copy your Access Key

### 2. Pexels Agent (`pexels-agent.js`)
Searches and downloads wooden coaster images from Pexels.

**Features:**
- Searches multiple query variations for diversity
- Downloads 10 photos (configurable)
- Landscape orientation optimized
- Free to use with attribution

**Usage:**
```bash
# Requires API key
export PEXELS_API_KEY="your-key-here"
node scripts/pexels-agent.js
```

**Get an API Key:**
1. Visit https://www.pexels.com/api/
2. Create a free account
3. Copy your API key

## Running Both Agents

To collect approximately 20 photos from both sources:

```bash
# Set your API keys (one-time setup)
export UNSPLASH_ACCESS_KEY="your-unsplash-key"
export PEXELS_API_KEY="your-pexels-key"

# Run both agents
node scripts/unsplash-agent.js
node scripts/pexels-agent.js
```

## Output Location

All photos are saved to: `public/images/stock-coasters/`

Files are named with their source:
- `unsplash-{id}.jpg` - Photos from Unsplash
- `pexels-{id}.jpg` - Photos from Pexels

## License & Attribution

Both Unsplash and Pexels offer free stock photos, but require attribution:

- **Unsplash License**: https://unsplash.com/license
- **Pexels License**: https://www.pexels.com/license/

Each agent displays photographer information when downloading. Please keep track of credits if you use these images on your site.

## Configuration

You can modify the following variables in each script:
- `NUM_PHOTOS` - Number of photos to download per agent
- `SEARCH_QUERIES` - Array of search terms to find relevant images
- `OUTPUT_DIR` - Where to save downloaded images

## Notes

- Both agents automatically skip already-downloaded photos
- Small delays between requests to respect API rate limits
- Duplicate photos (same ID) are automatically filtered out
- Internet connection required
