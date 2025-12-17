// Content script to widen S1 column on KaOZele website
console.log('🔧 SchoolWare Column Fix extension LOADED at ' + new Date().toISOString());
console.log('🔧 Current URL:', window.location.href);

// Inject CSS directly to ensure it applies
function injectCSS() {
  const style = document.createElement('style');
  style.id = 'schoolware-column-fix-injected';
  style.textContent = `
    /* Force S1 columns to be wider - INJECTED VERSION */
    th:contains('S1'), td:has-text('S1') {
      min-width: 400px !important;
      width: auto !important;
      max-width: none !important;
    }
    
    /* Target by position - S1 appears to be 4th column */
    tbody tr td:nth-child(4),
    thead tr th:nth-child(4),
    tr > *:nth-child(4) {
      min-width: 400px !important;
      width: 400px !important;
      max-width: 600px !important;
      white-space: normal !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      padding: 8px 12px !important;
    }
    
    /* Also target 5th column (second S1) */
    tbody tr td:nth-child(5),
    thead tr th:nth-child(5),
    tr > *:nth-child(5) {
      min-width: 400px !important;
      width: 400px !important;
      max-width: 600px !important;
      white-space: normal !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      padding: 8px 12px !important;
    }
    
    /* And 6th column (third S1) */
    tbody tr td:nth-child(6),
    thead tr th:nth-child(6),
    tr > *:nth-child(6) {
      min-width: 400px !important;
      width: 400px !important;
      max-width: 600px !important;
      white-space: normal !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      padding: 8px 12px !important;
    }
    
    /* Marked columns */
    .s1-column-wide {
      min-width: 400px !important;
      width: 400px !important;
      max-width: 600px !important;
      white-space: normal !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      padding: 8px 12px !important;
      background-color: rgba(255, 255, 0, 0.05) !important;
    }
  `;
  
  // Remove old style if exists
  const oldStyle = document.getElementById('schoolware-column-fix-injected');
  if (oldStyle) {
    oldStyle.remove();
  }
  
  document.head.appendChild(style);
  console.log('🔧 CSS injected successfully');
}

// Function to adjust column widths
function adjustColumns() {
  console.log('🔧 Searching for cells with width: 80px and text content...');
  
  // Find all elements with inline style containing "width: 80px" or "width:80px"
  const allElements = document.querySelectorAll('[style*="width"][style*="80px"]');
  let modifiedCount = 0;
  
  allElements.forEach(element => {
    const text = element.textContent.trim();
    
    // Check if element has text content (not just numbers)
    // If it's only numbers, spaces, or empty, skip it
    // Also skip headers like EX 1, DW 2, S1
    const hasTextContent = text.length > 0 && /[a-zA-Z]/.test(text) && 
                           !text.match(/^(EX\s*\d+|DW\s*\d+|S\d+)$/i);
    
    if (hasTextContent) {
      console.log('🔧 Found element with text and 80px width:', text.substring(0, 50));
      
      // Remove the width: 80px constraint
      const currentStyle = element.getAttribute('style');
      if (currentStyle) {
        // Remove width: 80px or width:80px (with or without spaces)
        const newStyle = currentStyle
          .replace(/width\s*:\s*80px\s*;?/gi, '')
          .replace(/^;+|;+$/g, '') // Clean up leading/trailing semicolons
          .trim();
        
        if (newStyle) {
          element.setAttribute('style', newStyle);
        } else {
          element.removeAttribute('style');
        }
        
        // Also set properties directly to ensure it takes effect
        element.style.width = 'auto';
        element.style.minWidth = 'auto';
        element.style.maxWidth = 'none';
        element.style.whiteSpace = 'normal';
        element.style.wordWrap = 'break-word';
        
        element.classList.add('s1-column-wide');
        modifiedCount++;
        console.log('🔧 Removed 80px width, new style:', element.getAttribute('style'));
      }
    } else {
      console.log('🔧 Skipping numeric/empty cell:', text);
    }
  });
  
  console.log('🔧 Total cells modified:', modifiedCount);
}

// Inject CSS immediately
injectCSS();

// Run adjustColumns multiple times to catch dynamic content
setTimeout(() => {
  console.log('🔧 Running initial column adjustment...');
  adjustColumns();
}, 100);

setTimeout(() => {
  console.log('🔧 Running delayed column adjustment...');
  adjustColumns();
}, 1000);

setTimeout(() => {
  console.log('🔧 Running final column adjustment...');
  adjustColumns();
}, 3000);

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 DOM loaded, adjusting columns...');
    adjustColumns();
  });
} else {
  adjustColumns();
}

// Also observe for dynamic changes
const observer = new MutationObserver((mutations) => {
  // Throttle the calls
  clearTimeout(window.schoolwareFixTimeout);
  window.schoolwareFixTimeout = setTimeout(() => {
    adjustColumns();
  }, 500);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('🔧 SchoolWare Column Fix fully initialized');
