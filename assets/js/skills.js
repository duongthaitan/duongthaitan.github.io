// Circular Skills Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSkillInteractions();
    initProgressAnimations();
    initParallaxEffects();
    initTouchInteractions();
    initHoverEffects();
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate', 'fadeInUp');
                    animateProgressRings(entry.target);
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    skillCircles.forEach(circle => {
        observer.observe(circle);
    });
}

// Animate progress rings
function animateProgressRings(skillCircle) {
    const progressCircle = skillCircle.querySelector('.progress-circle');
    const percentage = skillCircle.querySelector('.percentage');
    
    if (!progressCircle || !percentage) return;
    
    const targetPercentage = parseInt(percentage.textContent);
    const circumference = 2 * Math.PI * 25; // radius = 25
    const offset = circumference - (targetPercentage / 100) * circumference;
    
    // Animate the progress circle
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
    }, 500);
    
    // Animate the percentage counter
    animateCounter(percentage, 0, targetPercentage, 2000);
}

// Counter animation
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

// Initialize skill interactions
function initSkillInteractions() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    skillCircles.forEach(circle => {
        const container = circle.querySelector('.circle-container');
        const centerSkill = circle.querySelector('.center-skill');
        const orbitSkills = circle.querySelectorAll('.orbit-skill');
        
        // Pause animation on hover
        circle.addEventListener('mouseenter', () => {
            container.style.animationPlayState = 'paused';
            centerSkill.style.animationPlayState = 'paused';
            orbitSkills.forEach(skill => {
                skill.style.animationPlayState = 'paused';
            });
        });
        
        // Resume animation on leave
        circle.addEventListener('mouseleave', () => {
            container.style.animationPlayState = 'running';
            centerSkill.style.animationPlayState = 'running';
            orbitSkills.forEach(skill => {
                skill.style.animationPlayState = 'running';
            });
        });
        
        // Click to focus effect
        circle.addEventListener('click', () => {
            // Remove focus from other circles
            skillCircles.forEach(otherCircle => {
                otherCircle.classList.remove('focused');
            });
            
            // Add focus to clicked circle
            circle.classList.add('focused');
            
            // Add pulse effect
            centerSkill.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                centerSkill.style.animation = 'reverseRotate 30s linear infinite';
            }, 600);
        });
    });
}

// Enhanced hover effects for orbit skills
function initHoverEffects() {
    const orbitSkills = document.querySelectorAll('.orbit-skill');
    
    orbitSkills.forEach(skill => {
        const skillIcon = skill.querySelector('.skill-icon');
        
        skill.addEventListener('mouseenter', () => {
            // Scale effect
            skillIcon.style.transform = 'scale(1.2)';
            
            // Glow effect
            const color = getComputedStyle(skillIcon).color;
            skillIcon.style.boxShadow = `0 0 20px ${color}, 0 15px 30px rgba(0, 0, 0, 0.3)`;
            
            // Rotate effect
            skillIcon.style.animation = 'skillHover 0.6s ease-out forwards';
        });
        
        skill.addEventListener('mouseleave', () => {
            skillIcon.style.transform = 'scale(1)';
            skillIcon.style.boxShadow = '';
            skillIcon.style.animation = '';
        });
        
        // Click effect
        skill.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Ripple effect
            createRipple(skillIcon, e);
            
            // Show skill details (you can customize this)
            showSkillDetails(skill);
        });
    });
}

// Create ripple effect
function createRipple(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show skill details
function showSkillDetails(skillElement) {
    const skillName = skillElement.getAttribute('data-skill') || 
                      skillElement.querySelector('.skill-name')?.textContent || 
                      'Skill';
    const skillLevel = skillElement.getAttribute('data-level') || 'Advanced';
    const skillDescription = skillElement.getAttribute('data-description') || 
                           'Professional experience with this technology';
    
    // Create or update details panel
    let detailsPanel = document.getElementById('skill-details-panel');
    if (!detailsPanel) {
        detailsPanel = document.createElement('div');
        detailsPanel.id = 'skill-details-panel';
        detailsPanel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 15px;
            padding: 30px;
            max-width: 400px;
            text-align: center;
            z-index: 10000;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(detailsPanel);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        `;
        closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
        closeBtn.addEventListener('click', () => hideSkillDetails());
        detailsPanel.appendChild(closeBtn);
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.id = 'skill-details-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        overlay.addEventListener('click', hideSkillDetails);
        document.body.appendChild(overlay);
    }
    
    // Update content
    detailsPanel.innerHTML = `
        <button style="
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        " onclick="hideSkillDetails()">×</button>
        <h3 style="margin: 0 0 15px; color: #fff; font-size: 24px;">${skillName}</h3>
        <div style="
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
            height: 4px;
            border-radius: 2px;
            margin: 0 0 20px;
            animation: shimmer 2s infinite;
        "></div>
        <p style="margin: 0 0 15px; color: #ccc; font-size: 16px;">
            <strong>Level:</strong> ${skillLevel}
        </p>
        <p style="margin: 0; color: #aaa; line-height: 1.6;">
            ${skillDescription}
        </p>
    `;
    
    // Show panel with animation
    setTimeout(() => {
        document.getElementById('skill-details-overlay').style.opacity = '1';
        detailsPanel.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
}

// Hide skill details
function hideSkillDetails() {
    const detailsPanel = document.getElementById('skill-details-panel');
    const overlay = document.getElementById('skill-details-overlay');
    
    if (detailsPanel && overlay) {
        detailsPanel.style.transform = 'translate(-50%, -50%) scale(0)';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            detailsPanel.remove();
            overlay.remove();
        }, 300);
    }
}

// Initialize progress animations
function initProgressAnimations() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    skillCircles.forEach(circle => {
        const progressRing = circle.querySelector('.progress-ring');
        if (progressRing) {
            const percentage = circle.getAttribute('data-percentage') || '75';
            const circumference = 2 * Math.PI * 45; // Assuming radius of 45
            
            progressRing.style.strokeDasharray = circumference;
            progressRing.style.strokeDashoffset = circumference;
            
            // Animate when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const offset = circumference - (percentage / 100) * circumference;
                        progressRing.style.strokeDashoffset = offset;
                    }
                });
            });
            observer.observe(circle);
        }
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    const skillsSection = document.querySelector('.skills-section');
    if (!skillsSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = skillsSection.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize touch interactions for mobile
function initTouchInteractions() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    skillCircles.forEach(circle => {
        let touchStartTime = 0;
        
        circle.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            circle.classList.add('touch-active');
        });
        
        circle.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            circle.classList.remove('touch-active');
            
            // Long press effect
            if (touchDuration > 500) {
                circle.classList.add('long-press');
                setTimeout(() => {
                    circle.classList.remove('long-press');
                }, 1000);
            }
        });
        
        // Prevent default touch behaviors for better UX
        circle.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize keyboard navigation
function initKeyboardNavigation() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    let currentIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && skillCircles.length > 0) {
            e.preventDefault();
            
            // Remove focus from current
            skillCircles[currentIndex].classList.remove('keyboard-focus');
            
            // Move to next
            currentIndex = (currentIndex + 1) % skillCircles.length;
            
            // Add focus to new
            skillCircles[currentIndex].classList.add('keyboard-focus');
            skillCircles[currentIndex].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
        
        if (e.key === 'Enter' && skillCircles[currentIndex]) {
            skillCircles[currentIndex].click();
        }
    });
}

// Initialize resize handler
function initResizeHandler() {
    const handleResize = debounce(() => {
        // Recalculate positions and sizes for responsive design
        const skillCircles = document.querySelectorAll('.skill-circle');
        skillCircles.forEach(circle => {
            // Trigger reflow for any dynamic sizing
            circle.style.transform = 'scale(0.99)';
            setTimeout(() => {
                circle.style.transform = '';
            }, 10);
        });
    }, 250);
    
    window.addEventListener('resize', handleResize);
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes skillHover {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg); }
            100% { transform: rotateY(360deg); }
        }
        
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
        }
        
        .skill-circle.keyboard-focus {
            outline: 2px solid #4ecdc4;
            outline-offset: 4px;
        }
        
        .skill-circle.touch-active {
            transform: scale(0.95);
        }
        
        .skill-circle.long-press {
            animation: pulse 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addDynamicStyles();
    initKeyboardNavigation();
    initResizeHandler();
});

// Make hideSkillDetails globally accessible
window.hideSkillDetails = hideSkillDetails;