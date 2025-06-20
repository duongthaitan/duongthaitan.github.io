// Enhanced Services Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');
    const particles = document.querySelectorAll('.particle');
    const colors = ['#7877c6', '#ff6784', '#00d4ff'];
    
    // Add random colors to particles
    particles.forEach(particle => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
    });

    // Card interaction effects
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glowing effect to nearby particles
            particles.forEach(particle => {
                const rect = card.getBoundingClientRect();
                const particleRect = particle.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(rect.left - particleRect.left, 2) + 
                    Math.pow(rect.top - particleRect.top, 2)
                );
                
                if (distance < 300) {
                    particle.style.transform = 'scale(1.5)';
                    particle.style.opacity = '1';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            particles.forEach(particle => {
                particle.style.transform = 'scale(1)';
                particle.style.opacity = '0.6';
            });
        });

        // 3D Tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });

        // Click effect
        card.addEventListener('click', function() {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initially hide cards for animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Dynamic background particles
    function createDynamicParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        const servicesSection = document.querySelector('.services-section');
        if (servicesSection) {
            servicesSection.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 8000);
        }
    }

    // Create new particles periodically
    setInterval(createDynamicParticle, 2000);

    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const servicesSection = document.querySelector('.services-section');
        
        if (servicesSection) {
            const rate = scrolled * -0.5;
            servicesSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const servicesSection = document.querySelector('.services-section');
        
        if (servicesSection) {
            const rate = scrolled * -0.2;
            servicesSection.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add typing effect to code backgrounds
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effects when cards are visible
    const codeBackgrounds = document.querySelectorAll('.code-background');
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const originalText = entry.target.textContent;
                setTimeout(() => {
                    typeWriter(entry.target, originalText, 30);
                }, 800);
                codeObserver.unobserve(entry.target);
            }
        });
    });

    codeBackgrounds.forEach(bg => {
        codeObserver.observe(bg);
    });

    // Add glitch effect to title on hover
    const title = document.querySelector('.section-title');
    if (title) {
        title.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        title.addEventListener('animationend', function() {
            this.style.animation = 'gradientShift 3s ease-in-out infinite';
        });
    }

    // Add CSS for glitch animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);
});