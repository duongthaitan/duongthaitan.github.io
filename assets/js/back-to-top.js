
      
      // Back to top functionality - Mobile optimized
const backToTopBtn = document.getElementById('backToTop');
const scrollProgressBar = document.getElementById('scrollProgress');

// Show/hide button based on scroll position
function toggleBackToTopBtn() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress bar
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrollPercent + '%';
    }
    
    // Show button after scrolling 100px
    if (scrollTop > 100) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
}

// Smooth scroll to top with spin animation
function scrollToTop(e) {
    // Prevent default behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Reset any existing transforms first
    backToTopBtn.style.transform = '';
    
    // Add clicking animation
    backToTopBtn.classList.add('clicking');
    
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Remove clicking animation and reset transforms after scroll completes
    setTimeout(() => {
        backToTopBtn.classList.remove('clicking');
        backToTopBtn.style.transform = '';
        // Force a recheck of visibility after scroll completes
        setTimeout(toggleBackToTopBtn, 100);
    }, 800);
}

// Event listeners for both desktop and mobile
window.addEventListener('scroll', toggleBackToTopBtn, { passive: true });

// Mobile touch events
let touchStarted = false;

backToTopBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchStarted = true;
    // Add visual feedback for touch start
    backToTopBtn.style.transform = 'scale(0.95)';
}, { passive: false });

backToTopBtn.addEventListener('touchend', (e) => {
    if (!touchStarted) return;
    e.preventDefault();
    touchStarted = false;
    
    // Reset visual feedback immediately
    backToTopBtn.style.transform = '';
    
    // Execute scroll to top
    scrollToTop(e);
}, { passive: false });

// Handle touch cancel (when user drags finger away)
backToTopBtn.addEventListener('touchcancel', (e) => {
    touchStarted = false;
    backToTopBtn.style.transform = '';
});

// Desktop click event (fallback)
backToTopBtn.addEventListener('click', scrollToTop);

// Initial check
toggleBackToTopBtn();

// Mobile-friendly hover effects (using touch events)
let hoverTimeout;

backToTopBtn.addEventListener('touchstart', () => {
    clearTimeout(hoverTimeout);
    const orbitContainer = backToTopBtn.querySelector('.orbit-container');
    if (orbitContainer) {
        orbitContainer.style.animationPlayState = 'paused';
    }
});

backToTopBtn.addEventListener('touchend', () => {
    hoverTimeout = setTimeout(() => {
        const orbitContainer = backToTopBtn.querySelector('.orbit-container');
        if (orbitContainer) {
            orbitContainer.style.animationPlayState = 'running';
        }
    }, 500);
});

// Keep desktop hover functionality
backToTopBtn.addEventListener('mouseenter', () => {
    const orbitContainer = backToTopBtn.querySelector('.orbit-container');
    if (orbitContainer) {
        orbitContainer.style.animationPlayState = 'paused';
    }
});

backToTopBtn.addEventListener('mouseleave', () => {
    const orbitContainer = backToTopBtn.querySelector('.orbit-container');
    if (orbitContainer) {
        orbitContainer.style.animationPlayState = 'running';
    }
});

// Add CSS for better mobile interaction
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: manipulation;
        transition: all 0.4s ease, transform 0.2s ease !important;
    }
    
    /* Reset any conflicting transforms */
    .back-to-top:not(.clicking) {
        transform: none !important;
    }
    
    /* Better mobile touch feedback */
    .back-to-top:active {
        transform: scale(0.95) !important;
    }
    
    /* Ensure proper hiding when not active */
    .back-to-top:not(.active) {
        visibility: hidden !important;
        opacity: 0 !important;
        transform: none !important;
    }
    
    /* Ensure button is properly positioned on mobile */
    @media (max-width: 768px) {
        .back-to-top {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            touch-action: manipulation;
        }
        
        /* Force button to hide properly on mobile when at top */
        .back-to-top:not(.active) {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
