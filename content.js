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
      min-width: 200px !important;
      width: auto !important;
      max-width: 800px !important;
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
        element.style.minWidth = '200px';
        element.style.maxWidth = '800px';
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

// Function to hide icon column on rapporten-puntenboekje page
function hideIconColumn() {
  // Check if we're on the rapporten-puntenboekje page
  if (!window.location.href.includes('rapporten-puntenboekje')) {
    return;
  }
  
  console.log('🔧 Hiding icon column on rapporten-puntenboekje page...');
  
  // Find all tables
  const tables = document.querySelectorAll('table');
  
  tables.forEach(table => {
    const firstRow = table.querySelector('tr');
    if (!firstRow) return;
    
    // Check each column header for fa-seedling
    Array.from(firstRow.children).forEach((cell, columnIndex) => {
      const hasSeedlingIcon = cell.querySelector('.fa-seedling');
      
      if (hasSeedlingIcon) {
        console.log('🔧 Found column with fa-seedling at index:', columnIndex);
        
        // Hide all cells in this column
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
          const targetCell = row.children[columnIndex];
          if (targetCell) {
            targetCell.style.setProperty('display', 'none', 'important');
            targetCell.style.setProperty('width', '0', 'important');
          }
        });
      }
    });
  });
}

// Inject CSS immediately
injectCSS();

// Run adjustColumns multiple times to catch dynamic content
setTimeout(() => {
  console.log('🔧 Running initial column adjustment...');
  adjustColumns();
  hideIconColumn();
}, 100);

setTimeout(() => {
  console.log('🔧 Running delayed column adjustment...');
  adjustColumns();
  hideIconColumn();
}, 1000);

setTimeout(() => {
  console.log('🔧 Running final column adjustment...');
  adjustColumns();
  hideIconColumn();
}, 3000);

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 DOM loaded, adjusting columns...');
    adjustColumns();
    hideIconColumn();
  });
} else {
  adjustColumns();
  hideIconColumn();
}

// Also observe for dynamic changes
const observer = new MutationObserver((mutations) => {
  // Throttle the calls
  clearTimeout(window.schoolwareFixTimeout);
  window.schoolwareFixTimeout = setTimeout(() => {
    adjustColumns();
    hideIconColumn();
  }, 500);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('🔧 SchoolWare Column Fix fully initialized');

// Check if the page was reloaded (by F5 or reload button)
const navigation = performance.getEntriesByType('navigation')[0];
if (navigation && navigation.type === 'reload') {
  const currentUrl = window.location.href;
  const homepage = 'https://kaozele-intranet.durme.be/';
  
  // Only redirect if we're not already on the homepage
  if (currentUrl !== homepage && !currentUrl.startsWith(homepage + '#')) {
    console.log('🔧 Page reload detected, redirecting to homepage');
    window.location.replace(homepage);
  }
}

// Redirect to homepage when F5 or Ctrl+R is pressed
document.addEventListener('keydown', function(e) {
  // Check for F5 or Ctrl+R (Cmd+R on Mac)
  if (e.key === 'F5' || (e.key === 'r' && (e.ctrlKey || e.metaKey))) {
    e.preventDefault();
    console.log('🔧 Reload key pressed, redirecting to homepage');
    window.location.href = 'https://kaozele-intranet.durme.be/';
  }
}, true);
