       // Enhanced Custom Cursor System
        class EnhancedCursor {
            constructor() {
                this.cursor = document.getElementById('cursor');
                this.cursorFollower = document.getElementById('cursorFollower');
                this.isHovering = false;
                this.mouseX = 0;
                this.mouseY = 0;
                this.followerX = 0;
                this.followerY = 0;
                
                // Kiểm tra xem có phải mobile không
                this.isMobile = window.matchMedia('(max-width: 767px)').matches || 
                              !window.matchMedia('(hover: hover)').matches;
                
                if (!this.isMobile) {
                    this.init();
                }
            }

            init() {
                this.bindEvents();
                this.animateFollower();
            }

            bindEvents() {
                // Mouse move event với throttling
                let mouseMoveTimer = null;
                document.addEventListener('mousemove', (e) => {
                    this.mouseX = e.clientX;
                    this.mouseY = e.clientY;
                    
                    // Update cursor position immediately
                    this.cursor.style.left = this.mouseX + 'px';
                    this.cursor.style.top = this.mouseY + 'px';
                    
                    // Create trail effect
                    if (Math.random() > 0.7) { // Giảm frequency để tối ưu performance
                        this.createTrail(this.mouseX, this.mouseY);
                    }
                });

                // Hover effects
                const hoverElements = document.querySelectorAll('a, button, .hoverable, .magnetic-zone');
                hoverElements.forEach(el => {
                    el.addEventListener('mouseenter', () => this.onHover(true));
                    el.addEventListener('mouseleave', () => this.onHover(false));
                });

                // Click effects
                document.addEventListener('mousedown', (e) => this.onClick(e));
                document.addEventListener('mouseup', () => this.onRelease());

                // Mouse leave/enter document
                document.addEventListener('mouseleave', () => this.onMouseLeave());
                document.addEventListener('mouseenter', () => this.onMouseEnter());
            }

            animateFollower() {
                // Smooth follower animation
                const lerp = (start, end, factor) => start + (end - start) * factor;
                
                const animate = () => {
                    this.followerX = lerp(this.followerX, this.mouseX, 0.1);
                    this.followerY = lerp(this.followerY, this.mouseY, 0.1);
                    
                    this.cursorFollower.style.left = this.followerX + 'px';
                    this.cursorFollower.style.top = this.followerY + 'px';
                    
                    requestAnimationFrame(animate);
                };
                
                animate();
            }

            onHover(isHovering) {
                this.isHovering = isHovering;
                if (isHovering) {
                    this.cursor.classList.add('hover');
                    this.cursorFollower.classList.add('hover');
                } else {
                    this.cursor.classList.remove('hover');
                    this.cursorFollower.classList.remove('hover');
                }
            }

            onClick(e) {
                this.cursor.classList.add('click');
                this.cursorFollower.classList.add('click');
                
                // Create particle explosion
                this.createParticleExplosion(e.clientX, e.clientY);
            }

            onRelease() {
                this.cursor.classList.remove('click');
                this.cursorFollower.classList.remove('click');
            }

            onMouseLeave() {
                this.cursor.style.opacity = '0';
                this.cursorFollower.style.opacity = '0';
            }

            onMouseEnter() {
                this.cursor.style.opacity = '1';
                this.cursorFollower.style.opacity = '0.7';
            }

            createTrail(x, y) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = x + 'px';
                trail.style.top = y + 'px';
                document.body.appendChild(trail);
                
                // Remove after animation
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500);
            }

            createParticleExplosion(x, y) {
                const particleCount = 8;
                const colors = ['#4facfe', '#00f2fe', '#f093fb', '#f5576c', '#667eea'];
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    
                    const angle = (360 / particleCount) * i;
                    const velocity = 30 + Math.random() * 20;
                    const offsetX = Math.cos(angle * Math.PI / 180) * velocity;
                    const offsetY = Math.sin(angle * Math.PI / 180) * velocity;
                    
                    particle.style.left = x + 'px';
                    particle.style.top = y + 'px';
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    
                    document.body.appendChild(particle);
                    
                    // Animate particle
                    particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                    
                    // Remove after animation
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 1000);
                }
            }
        }

        // Scroll Indicator (optimized)
        function updateScrollIndicator() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));
            
            const indicator = document.getElementById('scrollIndicator');
            indicator.style.transform = `scaleX(${scrollPercent})`;
        }

        // Floating Action Button
        const fab = document.getElementById('fab');
        fab.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/Hide FAB based on scroll (optimized)
        let fabVisible = false;
        function updateFAB() {
            const shouldShow = window.pageYOffset > 300;
            if (shouldShow !== fabVisible) {
                fabVisible = shouldShow;
                fab.classList.toggle('show', shouldShow);
            }
        }

        // Performance optimized scroll handler
        let ticking = false;
        function updateAnimations() {
            updateScrollIndicator();
            updateFAB();
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        // Event listeners
        window.addEventListener('scroll', requestTick, { passive: true });

        // Initialize enhanced cursor
        document.addEventListener('DOMContentLoaded', () => {
            new EnhancedCursor();
            console.log('Enhanced Cursor System Loaded Successfully! ✨🎯');
        });

        // Magnetic effect for elements
        document.querySelectorAll('.magnetic-zone').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });