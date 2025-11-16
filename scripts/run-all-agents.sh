#!/bin/bash

# Run all stock photo collection agents
# This script runs both Unsplash and Pexels agents to collect ~20 photos

echo "=================================="
echo "Stock Photo Collection Agents"
echo "=================================="
echo ""

# Check if API keys are set
if [ -z "$UNSPLASH_ACCESS_KEY" ]; then
    echo "⚠️  Warning: UNSPLASH_ACCESS_KEY not set"
    echo "   Agent will use demo key (limited results)"
    echo ""
fi

if [ -z "$PEXELS_API_KEY" ]; then
    echo "⚠️  Warning: PEXELS_API_KEY not set"
    echo "   Pexels agent will be skipped"
    echo ""
fi

echo "Starting collection process..."
echo ""

# Run Unsplash agent
echo "=================================="
echo "Running Unsplash Agent..."
echo "=================================="
node "$(dirname "$0")/unsplash-agent.js"
UNSPLASH_EXIT=$?

echo ""
echo ""

# Run Pexels agent only if API key is set
if [ -n "$PEXELS_API_KEY" ]; then
    echo "=================================="
    echo "Running Pexels Agent..."
    echo "=================================="
    node "$(dirname "$0")/pexels-agent.js"
    PEXELS_EXIT=$?
else
    echo "⏭️  Skipping Pexels agent (no API key)"
    PEXELS_EXIT=1
fi

echo ""
echo ""
echo "=================================="
echo "Collection Complete!"
echo "=================================="

# Count total photos
STOCK_DIR="$(dirname "$0")/../public/images/stock-coasters"
if [ -d "$STOCK_DIR" ]; then
    TOTAL=$(find "$STOCK_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | wc -l)
    echo "Total photos in stock-coasters folder: $TOTAL"
else
    echo "Stock coasters folder not found"
fi

echo ""
echo "📁 Location: public/images/stock-coasters/"
echo ""

# Exit with error if both failed
if [ $UNSPLASH_EXIT -ne 0 ] && [ $PEXELS_EXIT -ne 0 ]; then
    echo "❌ Both agents failed. Please check your API keys and internet connection."
    exit 1
fi

echo "✅ Success! Check the setup guide for attribution requirements."
exit 0
