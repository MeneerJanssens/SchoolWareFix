# SchoolWare Column Fix

A Chrome extension that widens the S1 column on the KaOZele website for better readability.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `SchoolWareFix` folder
5. The extension is now installed and will automatically work on the KaOZele website

## What it does

- Automatically widens the S1 column to make text fully readable
- Uses flexible width (min 300px, max 600px) to adapt to content
- Enables text wrapping for better readability
- Works automatically when you visit the KaOZele website

## Files

- `manifest.json` - Extension configuration
- `content.js` - JavaScript that modifies the page
- `styles.css` - CSS styling to widen the column
- `README.md` - This file

## Note about icons

For a complete extension, you should add icon files (icon16.png, icon48.png, icon128.png). For now, you can either:
- Create simple icons in an image editor
- Remove the "icons" section from manifest.json if you don't need icons
- The extension will work fine without icons, Chrome will just use a default icon

## Troubleshooting

If the column doesn't widen:
1. Check the browser console (F12) for any errors
2. The script logs "SchoolWare Column Fix extension loaded" when it runs
3. Try refreshing the page after installing the extension
4. Check that the website URL matches the pattern in manifest.json
