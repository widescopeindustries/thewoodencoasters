# Stock Photo Setup Guide

## Quick Start (Running Agents Locally)

Since the agents require internet access, you'll need to run them on your local machine:

### Step 1: Get API Keys (Free)

**Unsplash (Optional but recommended):**
1. Visit https://unsplash.com/developers
2. Sign up/login
3. Click "New Application"
4. Accept terms and create app
5. Copy your "Access Key"

**Pexels (Required for Pexels agent):**
1. Visit https://www.pexels.com/api/
2. Sign up/login
3. Copy your API key

### Step 2: Set Environment Variables

**On macOS/Linux:**
```bash
export UNSPLASH_ACCESS_KEY="your-unsplash-access-key-here"
export PEXELS_API_KEY="your-pexels-api-key-here"
```

**On Windows (PowerShell):**
```powershell
$env:UNSPLASH_ACCESS_KEY="your-unsplash-access-key-here"
$env:PEXELS_API_KEY="your-pexels-api-key-here"
```

**On Windows (Command Prompt):**
```cmd
set UNSPLASH_ACCESS_KEY=your-unsplash-access-key-here
set PEXELS_API_KEY=your-pexels-api-key-here
```

### Step 3: Run the Agents

```bash
# Navigate to your project directory
cd /path/to/thewoodencoasters

# Run Unsplash agent (gets 10 photos)
node scripts/unsplash-agent.js

# Run Pexels agent (gets 10 photos)
node scripts/pexels-agent.js
```

### Step 4: Verify Downloads

Check `public/images/stock-coasters/` - you should see ~20 photos:
- `unsplash-*.jpg` files from Unsplash
- `pexels-*.jpg` files from Pexels

---

## Alternative: Manual Download

If you prefer to manually select photos:

### Option 1: Unsplash
1. Visit: https://unsplash.com/s/photos/wooden-coasters
2. Find photos you like
3. Click photo → Click "Download free" button
4. Save to `public/images/stock-coasters/`
5. Rename as needed (e.g., `unsplash-1.jpg`, `unsplash-2.jpg`, etc.)

### Option 2: Pexels
1. Visit: https://www.pexels.com/search/wooden%20coasters/
2. Find photos you like
3. Click photo → Click "Download" button → Select size
4. Save to `public/images/stock-coasters/`
5. Rename as needed (e.g., `pexels-1.jpg`, `pexels-2.jpg`, etc.)

### Option 3: Other Free Stock Sites
- **Pixabay**: https://pixabay.com/images/search/wooden%20coasters/
  - No attribution required
- **Freepik**: https://www.freepik.com/search?query=wooden+coasters
  - Free with attribution

---

## Photo Search Tips

For best results, try these search terms:
- "wooden coasters"
- "wood drink coasters"
- "rustic coasters"
- "handmade wood coasters"
- "wooden coaster set"
- "natural wood coasters"
- "cork coasters" (similar aesthetic)

---

## Attribution Requirements

### Unsplash
- Free to use
- Attribution appreciated but not required
- License: https://unsplash.com/license
- Example: "Photo by [Photographer Name] on Unsplash"

### Pexels
- Free to use
- Attribution appreciated but not required
- License: https://www.pexels.com/license/
- Example: "Photo by [Photographer Name] on Pexels"

### Best Practice
Consider adding photo credits in your footer or a credits page:
```
Images courtesy of talented photographers on Unsplash and Pexels
```

---

## Troubleshooting

**Agent returns "No photos found":**
- Check internet connection
- Verify API keys are set correctly
- Try running with `echo $UNSPLASH_ACCESS_KEY` to verify key is set

**"ENOTFOUND" or "EAI_AGAIN" errors:**
- DNS/network issue
- Check firewall settings
- Try on different network

**Want more photos?**
- Edit `NUM_PHOTOS` variable in each agent script
- Increase from 10 to desired number (e.g., 20, 30)

**Need different photo styles?**
- Edit `SEARCH_QUERIES` array in agent scripts
- Add your own search terms
