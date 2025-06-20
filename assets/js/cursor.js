    
        // Device detection
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Three.js setup
        let scene, camera, renderer, stars = [], nebula = [];
        let mouseX = 0, mouseY = 0;
        let targetMouseX = 0, targetMouseY = 0;
        let zoomLevel = 1;
        let touchPoints = [];
        let longPressTimer = null;
        let longPressIndicator = null;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            document.getElementById('canvas-container').appendChild(renderer.domElement);

            createStarField();
            createNebula();
            
            camera.position.z = 50;
            animate();
        }

        function createStarField() {
            const starGeometry = new THREE.BufferGeometry();
            const starCount = isMobile ? 1500 : 3000; // Reduce stars on mobile
            const positions = new Float32Array(starCount * 3);
            const colors = new Float32Array(starCount * 3);
            const sizes = new Float32Array(starCount);

            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;
                
                const radius = Math.random() * 400 + 50;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                
                positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i3 + 2] = radius * Math.cos(phi);

                const colorType = Math.random();
                if (colorType < 0.3) {
                    colors[i3] = 0.5 + Math.random() * 0.5;
                    colors[i3 + 1] = 0.8 + Math.random() * 0.2;
                    colors[i3 + 2] = 1.0;
                } else if (colorType < 0.7) {
                    colors[i3] = 1.0;
                    colors[i3 + 1] = 1.0;
                    colors[i3 + 2] = 1.0;
                } else {
                    colors[i3] = 1.0;
                    colors[i3 + 1] = 0.8 + Math.random() * 0.2;
                    colors[i3 + 2] = 0.3 + Math.random() * 0.3;
                }

                sizes[i] = Math.random() * 3 + 1;
            }

            starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const starMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: `
                    attribute float size;
                    attribute vec3 color;
                    varying vec3 vColor;
                    uniform float time;
                    
                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + 0.3 * sin(time + position.x * 0.01));
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    
                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;
                        
                        float alpha = 1.0 - (dist * 2.0);
                        alpha = pow(alpha, 2.0);
                        
                        gl_FragColor = vec4(vColor, alpha);
                    }
                `,
                transparent: true,
                vertexColors: true
            });

            const starField = new THREE.Points(starGeometry, starMaterial);
            scene.add(starField);
            stars.push({ mesh: starField, material: starMaterial });
        }

        function createNebula() {
            const nebulaCount = isMobile ? 3 : 5; // Reduce nebula count on mobile
            for (let i = 0; i < nebulaCount; i++) {
                const nebulaGeometry = new THREE.PlaneGeometry(100, 100);
                const nebulaMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 },
                        opacity: { value: 0.1 + Math.random() * 0.1 }
                    },
                    vertexShader: `
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        uniform float time;
                        uniform float opacity;
                        varying vec2 vUv;
                        
                        float noise(vec2 p) {
                            return sin(p.x * 10.0 + time * 0.5) * sin(p.y * 10.0 + time * 0.3) * 0.5 + 0.5;
                        }
                        
                        void main() {
                            vec2 uv = vUv;
                            float n = noise(uv * 2.0) * noise(uv * 4.0) * noise(uv * 8.0);
                            
                            vec3 color1 = vec3(0.1, 0.3, 0.8);
                            vec3 color2 = vec3(0.8, 0.2, 0.8);
                            vec3 color = mix(color1, color2, n);
                            
                            float alpha = n * opacity;
                            gl_FragColor = vec4(color, alpha);
                        }
                    `,
                    transparent: true,
                    side: THREE.DoubleSide
                });

                const nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
                nebulaMesh.position.set(
                    (Math.random() - 0.5) * 300,
                    (Math.random() - 0.5) * 300,
                    (Math.random() - 0.5) * 200
                );
                nebulaMesh.rotation.z = Math.random() * Math.PI * 2;
                
                scene.add(nebulaMesh);
                nebula.push({ mesh: nebulaMesh, material: nebulaMaterial });
            }
        }

        function animate() {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            targetMouseX = (mouseX / window.innerWidth) * 2 - 1;
            targetMouseY = -(mouseY / window.innerHeight) * 2 + 1;

            camera.position.x += (targetMouseX * 10 - camera.position.x) * 0.05;
            camera.position.y += (targetMouseY * 10 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            stars.forEach(star => {
                star.material.uniforms.time.value = time;
                star.mesh.rotation.y += 0.001;
            });

            nebula.forEach(cloud => {
                cloud.material.uniforms.time.value = time;
                cloud.mesh.rotation.z += 0.002;
            });

            camera.fov = 75 / zoomLevel;
            camera.updateProjectionMatrix();

            renderer.render(scene, camera);
        }

        // Touch event handlers
        function createTouchRipple(x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 800);
        }

        function createTouchTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'touch-trail';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            document.body.appendChild(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.remove();
                }
            }, 1000);
        }

        function createTouchParticles(x, y, color = '#00ffff') {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'touch-particle';
                    
                    const angle = (i / 8) * Math.PI * 2;
                    const distance = 20 + Math.random() * 25;
                    const dx = Math.cos(angle) * distance;
                    const dy = Math.sin(angle) * distance;
                    
                    particle.style.left = x + 'px';
                    particle.style.top = y + 'px';
                    particle.style.setProperty('--dx', dx + 'px');
                    particle.style.setProperty('--dy', dy + 'px');
                    particle.style.background = color;
                    particle.style.boxShadow = `0 0 8px ${color}`;
                    
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, 1500);
                }, i * 50);
            }
        }

        function createTouchVibration(x, y) {
            const vibration = document.createElement('div');
            vibration.className = 'touch-vibration';
            vibration.style.left = x + 'px';
            vibration.style.top = y + 'px';
            document.body.appendChild(vibration);
            
            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            setTimeout(() => {
                if (vibration.parentNode) {
                    vibration.remove();
                }
            }, 300);
        }

        function startLongPress(x, y) {
            longPressIndicator = document.createElement('div');
            longPressIndicator.className = 'long-press-indicator';
            longPressIndicator.style.left = x + 'px';
            longPressIndicator.style.top = y + 'px';
            document.body.appendChild(longPressIndicator);
            
            let progress = 0;
            const duration = 1000; // 1 second
            const interval = 50;
            
            const progressInterval = setInterval(() => {
                progress += (interval / duration) * 100;
                if (longPressIndicator) {
                    longPressIndicator.style.setProperty('--progress', progress + '%');
                }
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    if (longPressIndicator) {
                        createTouchParticles(x, y, '#ff6b00');
                        createTouchVibration(x, y);
                    }
                }
            }, interval);
            
            longPressTimer = setTimeout(() => {
                clearInterval(progressInterval);
            }, duration);
        }

        function endLongPress() {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
            if (longPressIndicator) {
                longPressIndicator.remove();
                longPressIndicator = null;
            }
        }

        // Desktop cursor setup
        if (!isMobile) {
            const cursor = document.getElementById('cursor');
            const trails = [];
            const maxTrails = 20;

            for (let i = 0; i < maxTrails; i++) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.cssText = `
                    position: fixed;
                    width: 12px;
                    height: 12px;
                    background: radial-gradient(circle, #00ffff 0%, rgba(0,255,255,0.8) 30%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 999;
                    transform: translate(-50%, -50%);
                `;
                document.body.appendChild(trail);
                trails.push({
                    element: trail,
                    x: 0,
                    y: 0,
                    opacity: 1 - (i / maxTrails)
                });
            }

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
                const isClickable = elementUnderCursor && (
                    elementUnderCursor.style.cursor === 'pointer' ||
                    elementUnderCursor.classList.contains('demo-element') ||
                    elementUnderCursor.tagName === 'BUTTON' ||
                    elementUnderCursor.tagName === 'A' ||
                    window.getComputedStyle(elementUnderCursor).cursor === 'pointer'
                );
                
                if (isClickable) {
                    cursor.classList.add('pointer');
                } else {
                    cursor.classList.remove('pointer');
                }
                
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';

                for (let i = trails.length - 1; i > 0; i--) {
                    trails[i].x += (trails[i - 1].x - trails[i].x) * 0.3;
                    trails[i].y += (trails[i - 1].y - trails[i].y) * 0.3;
                }
                trails[0].x = mouseX;
                trails[0].y = mouseY;

                trails.forEach((trail, index) => {
                    trail.element.style.left = trail.x + 'px';
                    trail.element.style.top = trail.y + 'px';
                    trail.element.style.opacity = (trail.opacity * 0.9) * (1 - index * 0.04);
                    const scale = 1 - index * 0.03;
                    trail.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
                });
            });

            document.addEventListener('wheel', (e) => {
                e.preventDefault();
                zoomLevel += e.deltaY * 0.001;
                zoomLevel = Math.max(0.5, Math.min(3, zoomLevel));
                
                const scaleEffect = 1 + (zoomLevel - 1) * 0.5;
                cursor.style.transform = `translate(-50%, -50%) scale(${scaleEffect})`;
            });
        }

        // Touch event handlers
        if (isTouch) {
            document.addEventListener('touchstart', (e) => {
                e.preventDefault();
                Array.from(e.touches).forEach(touch => {
                    const x = touch.clientX;
                    const y = touch.clientY;
                    
                    mouseX = x;
                    mouseY = y;
                    
                    createTouchRipple(x, y);
                    createTouchParticles(x, y);
                    
                    // Start long press detection
                    if (e.touches.length === 1) {
                        startLongPress(x, y);
                    }
                    
                    touchPoints.push({ id: touch.identifier, x, y, startTime: Date.now() });
                });
            });

            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
                Array.from(e.touches).forEach(touch => {
                    const x = touch.clientX;
                    const y = touch.clientY;
                    
                    mouseX = x;
                    mouseY = y;
                    
                    if (Math.random() < 0.3) {
                        createTouchTrail(x, y);
                    }
                    
                    // Update touch points
                    const touchPoint = touchPoints.find(tp => tp.id === touch.identifier);
                    if (touchPoint) {
                        touchPoint.x = x;
                        touchPoint.y = y;
                    }
                });
                
                // End long press if moving too much
                endLongPress();
            });

            document.addEventListener('touchend', (e) => {
                e.preventDefault();
                endLongPress();
                
                Array.from(e.changedTouches).forEach(touch => {
                    const x = touch.clientX;
                    const y = touch.clientY;
                    
                    createTouchVibration(x, y);
                    
                    // Remove touch point
                    touchPoints = touchPoints.filter(tp => tp.id !== touch.identifier);
                });
            });

            // Handle pinch-to-zoom
            let initialDistance = 0;
            document.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    initialDistance = Math.sqrt(
                        Math.pow(touch2.clientX - touch1.clientX, 2) +
                        Math.pow(touch2.clientY - touch1.clientY, 2)
                    );
                }
            });

            document.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    const currentDistance = Math.sqrt(
                        Math.pow(touch2.clientX - touch1.clientX, 2) +
                        Math.pow(touch2.clientY - touch1.clientY, 2)
                    );
                    
                    if (initialDistance > 0) {
                        const scale = currentDistance / initialDistance;
                        zoomLevel *= scale;
                        zoomLevel = Math.max(0.5, Math.min(3, zoomLevel));
                        initialDistance = currentDistance;
                        
                        // Create zoom particles
                        const centerX = (touch1.clientX + touch2.clientX) / 2;
                        const centerY = (touch1.clientY + touch2.clientY) / 2;
                        createTouchParticles(centerX, centerY, '#ffff00');
                    }
                }
            });
        }

        // Demo button interactions
        document.querySelectorAll('.demo-element').forEach(element => {
            element.addEventListener('click', (e) => {
                const rect = element.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                createTouchParticles(x, y, '#ff6b00');
                createTouchVibration(x, y);
                
                // Add temporary glow effect
                element.style.boxShadow = '0 0 30px rgba(255, 107, 0, 0.8)';
                setTimeout(() => {
                    element.style.boxShadow = '';
                }, 500);
            });
        });

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Prevent default touch behaviors
        document.addEventListener('touchstart', (e) => {
            if (e.target === document.body || e.target.closest('#canvas-container')) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (e.target === document.body || e.target.closest('#canvas-container')) {
                e.preventDefault();
            }
        }, { passive: false });

        // Initialize
        init();

        // Performance optimization for mobile
        if (isMobile) {
            // Reduce animation frequency on mobile
            let animationFrameId;
            let lastTime = 0;
            const targetFPS = 30; // Reduce FPS on mobile
            const frameInterval = 1000 / targetFPS;

            function optimizedAnimate(currentTime) {
                animationFrameId = requestAnimationFrame(optimizedAnimate);
                
                if (currentTime - lastTime >= frameInterval) {
                    animate();
                    lastTime = currentTime;
                }
            }
            
            // Replace the original animate call
            cancelAnimationFrame(animationFrameId);
            optimizedAnimate(0);
            
            // Cleanup particles more aggressively on mobile
            setInterval(() => {
                const particles = document.querySelectorAll('.touch-particle, .touch-trail, .touch-ripple');
                if (particles.length > 50) {
                    particles.forEach((particle, index) => {
                        if (index < particles.length - 30) {
                            particle.remove();
                        }
                    });
                }
            }, 2000);
        }

        // Add keyboard support for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused && focused.classList.contains('demo-element')) {
                    e.preventDefault();
                    focused.click();
                }
            }
        });

        // Make demo elements focusable
        document.querySelectorAll('.demo-element').forEach(element => {
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            element.setAttribute('aria-label', element.textContent);
        });

        console.log('Mobile-optimized cursor system initialized');
        console.log('Device type:', isMobile ? 'Mobile' : 'Desktop');
        console.log('Touch support:', isTouch ? 'Yes' : 'No');