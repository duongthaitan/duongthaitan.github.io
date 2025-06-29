        // Loading Animation
        window.addEventListener('load', function() {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Particles Animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        createParticles();

        // Swiper Initialization
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                },
            },
        });

        // Pause autoplay on hover
        const swiperContainer = document.querySelector('.swiper');
        swiperContainer.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
        });
        swiperContainer.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
        });

        // Gallery Filter
        const filterTabs = document.querySelectorAll('.filter-tab');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-filter');
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Album data with multiple images per album
        const albumData = {
            nature: [
                {
                    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Núi Non Hùng Vĩ',
                    description: 'Cảnh quan núi non tuyệt đẹp'
                },
                {
                    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Rừng Xanh Bí Ẩn',
                    description: 'Thiên nhiên hoang dã nguyên sinh'
                },
                {
                    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Rừng Sương Mù',
                    description: 'Không gian mờ ảo trong rừng'
                },
                {
                    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Hồ Nước Trong Xanh',
                    description: 'Mặt nước phản chiếu bầu trời'
                },
                {
                    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Đỉnh Núi Tuyết Phủ',
                    description: 'Phong cảnh mùa đông trên cao'
                }
            ],
            architecture: [
                {
                    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Kiến Trúc Hiện Đại',
                    description: 'Thiết kế kiến trúc độc đáo'
                },
                {
                    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Tòa Nhà Chọc Trời',
                    description: 'Đô thị hiện đại phồn hoa'
                },
                {
                    src: 'https://images.unsplash.com/photo-1516156008625-3a99312b8371?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Kiến Trúc Cổ Điển',
                    description: 'Vẻ đẹp trường tồn qua thời gian'
                },
                {
                    src: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Nhà Thờ Gothic',
                    description: 'Kiến trúc tôn giáo uy nghi'
                }
            ],
            art: [
                {
                    src: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Nghệ Thuật Trừu Tượng',
                    description: 'Sáng tạo đương đại đầy màu sắc'
                },
                {
                    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Tranh Sơn Dầu',
                    description: 'Nghệ thuật hội họa cổ điển'
                },
                {
                    src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Điêu Khắc Hiện Đại',
                    description: 'Tác phẩm ba chiều ấn tượng'
                }
            ],
            lifestyle: [
                {
                    src: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Cuộc Sống Hiện Đại',
                    description: 'Phong cách sống đương đại'
                },
                {
                    src: 'https://images.unsplash.com/photo-1517263104271-d4ebe4fd8430?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Không Gian Làm Việc',
                    description: 'Văn phòng thiết kế đẹp mắt'
                },
                {
                    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    title: 'Nội Thất Sang Trọng',
                    description: 'Thiết kế nội thất cao cấp'
                }
            ]
        };

        // Lightbox for Gallery Albums
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const category = item.getAttribute('data-category');
                const albumImages = albumData[category] || [];
                
                if (albumImages.length === 0) return;
                
                // Create album lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'album-lightbox-overlay';
                
                let currentIndex = 0;
        lightbox.innerHTML = `
                <style>
                    .album-lightbox-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        background: rgba(0, 0, 0, 0.95);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                        margin: 0;
                        padding: 0;
                    }
                    .album-lightbox-content {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    .album-lightbox-image {
                        max-width: 90vw;
                        max-height: 80vh;
                        object-fit: contain;
                        transition: opacity 0.3s ease;
                    }
                    .album-lightbox-close {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        font-size: 36px;
                        color: white;
                        cursor: pointer;
                        z-index: 1001;
                        background: rgba(0, 0, 0, 0.5);
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        transition: background 0.2s;
                    }
                    .album-lightbox-close:hover {
                        background: rgba(255, 0, 0, 0.7);
                    }
                    .album-navigation {
                        position: absolute;
                        top: 50%;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        transform: translateY(-50%);
                    }
                    .album-nav-btn {
                        background: rgba(0, 0, 0, 0.5);
                        border: none;
                        color: white;
                        font-size: 24px;
                        padding: 10px;
                        cursor: pointer;
                        transition: background 0.2s;
                    }
                    .album-nav-btn:hover {
                        background: rgba(0, 0, 0, 0.8);
                    }
                    .album-image-info {
                        color: white;
                        text-align: center;
                        margin-top: 20px;
                    }
                    .album-image-title {
                        font-size: 24px;
                        margin: 10px 0;
                    }
                    .album-image-description {
                        font-size: 16px;
                        margin: 5px 0;
                    }
                    .album-counter {
                        font-size: 14px;
                        margin-top: 10px;
                    }
                </style>
                <div class="album-lightbox-content">
                    <span class="album-lightbox-close">×</span>
                    <div class="album-navigation">
                        <button class="album-nav-btn album-prev-btn">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="album-nav-btn album-next-btn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="album-image-container">
                        <img src="${albumImages[0].src}" alt="${albumImages[0].title}" class="album-lightbox-image">
                        <div class="album-image-info">
                            <h3 class="album-image-title">${albumImages[0].title}</h3>
                            <p class="album-image-description">${albumImages[0].description}</p>
                            <div class="album-counter">1 / ${albumImages.length}</div>
                        </div>
                    </div>
                </div>
            `;

            
                
                document.body.appendChild(lightbox);
                
                const img = lightbox.querySelector('.album-lightbox-image');
                const title = lightbox.querySelector('.album-image-title');
                const description = lightbox.querySelector('.album-image-description');
                const counter = lightbox.querySelector('.album-counter');
                const prevBtn = lightbox.querySelector('.album-prev-btn');
                const nextBtn = lightbox.querySelector('.album-next-btn');
                const closeBtn = lightbox.querySelector('.album-lightbox-close');
                
                // Update image function
                function updateImage(index) {
                    currentIndex = index;
                    if (currentIndex < 0) currentIndex = albumImages.length - 1;
                    if (currentIndex >= albumImages.length) currentIndex = 0;
                    
                    const currentImage = albumImages[currentIndex];
                    img.style.opacity = '0';
                    
                    setTimeout(() => {
                        img.src = currentImage.src;
                        img.alt = currentImage.title;
                        title.textContent = currentImage.title;
                        description.textContent = currentImage.description;
                        counter.textContent = `${currentIndex + 1} / ${albumImages.length}`;
                        img.style.opacity = '1';
                    }, 150);
                }
                
                // Navigation events
                prevBtn.addEventListener('click', () => updateImage(currentIndex - 1));
                nextBtn.addEventListener('click', () => updateImage(currentIndex + 1));
                
                // Keyboard navigation
                function handleKeyPress(e) {
                    switch(e.key) {
                        case 'ArrowLeft':
                            updateImage(currentIndex - 1);
                            break;
                        case 'ArrowRight':
                            updateImage(currentIndex + 1);
                            break;
                        case 'Escape':
                            closeLightbox();
                            break;
                    }
                }
                
                // Close lightbox function
                function closeLightbox() {
                    document.removeEventListener('keydown', handleKeyPress);
                    document.body.removeChild(lightbox);
                }
                
                // Close events
                closeBtn.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) closeLightbox();
                });
                
                // Add keyboard listener
                document.addEventListener('keydown', handleKeyPress);
                
                // Touch/swipe support for mobile
                let startX = 0;
                let startY = 0;
                let threshold = 50;
                
                img.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                });
                
                img.addEventListener('touchend', (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const endY = e.changedTouches[0].clientY;
                    const diffX = startX - endX;
                    const diffY = startY - endY;
                    
                    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                        if (diffX > 0) {
                            updateImage(currentIndex + 1); // Swipe left - next image
                        } else {
                            updateImage(currentIndex - 1); // Swipe right - prev image
                        }
                    }
                });
            });
        });

        // Scroll Indicator
        function updateScrollIndicator() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            
            const indicator = document.getElementById('scrollIndicator');
            indicator.style.transform = `scaleX(${scrollPercent})`;
        }

        window.addEventListener('scroll', updateScrollIndicator);

        // Floating Action Button
        const fab = document.getElementById('fab');
        fab.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/Hide FAB based on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                fab.style.opacity = '1';
                fab.style.transform = 'translateY(0)';
            } else {
                fab.style.opacity = '0';
                fab.style.transform = 'translateY(100px)';
            }
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Hero title animation
        gsap.fromTo('.hero-title', 
            { 
                y: 100, 
                opacity: 0,
                scale: 0.8
            },
            { 
                y: 0, 
                opacity: 1,
                scale: 1,
                duration: 1.5, 
                ease: 'power3.out',
                delay: 0.5
            }
        );

        // Hero subtitle animation
        gsap.fromTo('.hero-subtitle', 
            { 
                y: 50, 
                opacity: 0 
            },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power2.out',
                delay: 0.8
            }
        );

        // CTA button animation
        gsap.fromTo('.cta-button', 
            { 
                y: 30, 
                opacity: 0,
                scale: 0.9
            },
            { 
                y: 0, 
                opacity: 1,
                scale: 1,
                duration: 0.8, 
                ease: 'back.out(1.7)',
                delay: 1.2
            }
        );

        // Gallery items stagger animation
        gsap.fromTo('.gallery-item', 
            { 
                y: 60, 
                opacity: 0,
                rotateX: 15
            },
            { 
                y: 0, 
                opacity: 1,
                rotateX: 0,
                duration: 0.8, 
                ease: 'power2.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.gallery',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Section titles animation
        gsap.fromTo('.section-title', 
            { 
                y: 50, 
                opacity: 0,
                scale: 0.9
            },
            { 
                y: 0, 
                opacity: 1,
                scale: 1,
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.section-title',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Parallax effect for hero background
        gsap.to('.hero::before', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Tilt effect for gallery items
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                gsap.to(item, {
                    rotateX: 5,
                    rotateY: 5,
                    z: 50,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', (e) => {
                gsap.to(item, {
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                gsap.to(item, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Smooth reveal animation for wrapper
        gsap.fromTo('.wrapper', 
            { 
                y: 100, 
                opacity: 0 
            },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.wrapper',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.cta-button, .filter-tab, .fab');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });

        // Add scroll-triggered animations for slider
        gsap.fromTo('.slider-section', 
            { 
                y: 80, 
                opacity: 0,
                scale: 0.95
            },
            { 
                y: 0, 
                opacity: 1,
                scale: 1,
                duration: 1.2, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.slider-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Performance optimization
        let ticking = false;
        function updateAnimations() {
            updateScrollIndicator();
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);

        // Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.gallery-image').forEach(img => {
            imageObserver.observe(img);
        });

        // Add CSS for lightbox
        const lightboxStyles = `
            <style>
                .lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }

                .album-lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }

                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                }

                .album-lightbox-content {
                    position: relative;
                    width: 90%;
                    height: 90%;
                    max-width: 1200px;
                    max-height: 800px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .album-image-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .lightbox-image {
                    max-width: 100%;
                    max-height: 80vh;
                    object-fit: contain;
                    border-radius: 10px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                }

                .album-lightbox-image {
                    max-width: 100%;
                    max-height: 70vh;
                    object-fit: contain;
                    border-radius: 15px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
                    transition: opacity 0.3s ease;
                }

                .lightbox-close, .album-lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    font-size: 2rem;
                    color: white;
                    cursor: pointer;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .lightbox-close:hover, .album-lightbox-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }

                .album-navigation {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    transform: translateY(-50%);
                    pointer-events: none;
                    z-index: 10;
                }

                .album-nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                    pointer-events: all;
                }

                .album-prev-btn {
                    left: -80px;
                }

                .album-next-btn {
                    right: -80px;
                }

                .album-nav-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-50%) scale(1.1);
                }

                .album-image-info {
                    position: absolute;
                    bottom: -80px;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    color: white;
                    width: 100%;
                    max-width: 600px;
                }

                .album-image-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: white;
                }

                .album-image-description {
                    font-size: 1rem;
                    opacity: 0.8;
                    margin-bottom: 1rem;
                }

                .album-counter {
                    display: inline-block;
                    padding: 8px 16px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .lightbox-caption {
                    color: white;
                    font-size: 1.2rem;
                    margin-top: 20px;
                    font-weight: 500;
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .gallery-image.loaded {
                    transition: all 0.3s ease;
                }

                @media (max-width: 768px) {
                    .lightbox-close, .album-lightbox-close {
                        top: -40px;
                        right: -40px;
                        width: 40px;
                        height: 40px;
                        font-size: 1.5rem;
                    }

                    .album-nav-btn {
                        width: 50px;
                        height: 50px;
                        font-size: 1.2rem;
                    }

                    .album-prev-btn {
                        left: -60px;
                    }

                    .album-next-btn {
                        right: -60px;
                    }

                    .album-image-info {
                        bottom: -100px;
                        padding: 0 20px;
                    }

                    .album-image-title {
                        font-size: 1.2rem;
                    }

                    .album-image-description {
                        font-size: 0.9rem;
                    }

                    .album-lightbox-image {
                        max-height: 60vh;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', lightboxStyles);

        // Add ScrollTrigger script
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.head.appendChild(scrollTriggerScript);

        console.log('Visual Symphony Album Website Loaded Successfully! 🎨✨');

        