# SchoolWare Fix

A Chrome extension that enhances the KaOZele SchoolWare website with multiple improvements for better readability and usability.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the `SchoolWareFix` folder
5. The extension is now installed and will automatically work on the KaOZele website

## Features

### Text Column Width Enhancement
- Automatically removes the 80px width constraint from text columns containing actual text
- Sets flexible width (200-800px) that auto-adjusts based on screen size
- Keeps numeric columns at their original 80px width
- Preserves header columns (EX 1, DW 2, S1, etc.) at their original width
- Enables text wrapping for better readability

### Column Hiding
- Hides the icon column (fa-seedling) on the rapporten-puntenboekje page
- Automatically detects and hides columns with seedling icons

### Homepage Redirect
- When pressing F5, Ctrl+R, or the browser reload button, automatically redirects to the homepage (https://kaozele-intranet.durme.be/)
- Prevents accidental reloads of nested pages

### Visual Improvements
- Custom extension icon with table and expansion arrow
- Better text wrapping and overflow handling
- Improved padding and line height for readability

## Files

- `manifest.json` - Extension configuration with permissions and icon references
- `content.js` - JavaScript that modifies the page layout and behavior
- `styles.css` - CSS styling for column width adjustments
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons
- `generate-icons.html` - Tool to regenerate icons if needed
- `README.md` - This file

## How It Works

The extension runs on all pages matching `*://kaozele-intranet.durme.be/*` and:

1. **Detects text columns**: Searches for elements with `width: 80px` inline styles
2. **Identifies text content**: Checks if cells contain actual text (not just numbers or headers)
3. **Removes width constraints**: Strips the 80px width and applies flexible min/max width
4. **Monitors for changes**: Uses MutationObserver to handle dynamically loaded content
5. **Hides specific columns**: Detects and hides columns containing `.fa-seedling` icons
6. **Intercepts reloads**: Redirects F5/reload button presses to the homepage

## Troubleshooting

If the extension doesn't work:

1. **Check the browser console** (F12) for messages starting with 🔧:
   - "SchoolWare Column Fix extension LOADED"
   - "Searching for cells with width: 80px"
   - "Total cells modified: X"

2. **Verify the extension is enabled**:
   - Go to `chrome://extensions/`
   - Make sure the toggle for "SchoolWare Fix" is blue/on

3. **Reload the extension**:
   - Click the refresh/reload icon on the extension card
   - Then hard refresh the page with `Ctrl+Shift+R`

4. **Check the URL pattern**:
   - Extension only works on `kaozele-intranet.durme.be`
   - Make sure you're on the correct domain

## Development

To modify the extension:

1. Edit the files (`content.js`, `styles.css`, etc.)
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension
4. Reload the webpage to see changes

To regenerate icons:
1. Open `generate-icons.html` in a browser
2. Click "Generate & Download All Icons"
3. Replace the existing icon files

## Version History

**v1.0** - Initial release
- Text column width adjustment (200-800px)
- Column hiding for icon columns
- Homepage redirect on reload
- Custom extension icons
