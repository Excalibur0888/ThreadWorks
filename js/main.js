// Slider functionality
function initSlider(sliderClass) {
    const slider = document.querySelector(sliderClass);
    if (!slider) return;

    const slides = slider.querySelectorAll('.workshop-slide, .review-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let interval;

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                if (slide.classList.contains('workshop-slide')) {
                    slide.style.display = 'grid';
                    slide.style.gridTemplateColumns = '1fr 1fr';
                } else {
                    slide.style.display = 'block';
                }
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
                slide.style.visibility = 'visible';
            } else {
                slide.style.display = 'none';
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(50px)';
                slide.style.visibility = 'hidden';
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function startAutoplay() {
        if (interval) clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, false);

    slider.addEventListener('touchend', () => {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoplay();
    }, false);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlides();
            startAutoplay();
        });
    });

    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', startAutoplay);

    updateSlides();
    startAutoplay();
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);
    updateHeader();
}

// Mobile menu
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
}

// Service Tabs
function initServiceTabs() {
    const tabs = document.querySelectorAll('.service-tab');
    const panels = document.querySelectorAll('.service-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const service = tab.dataset.service;
            document.querySelector(`.service-panel[data-service="${service}"]`).classList.add('active');
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initMobileMenu();
    initServiceTabs();
    
    // Initialize all sliders
    initSlider('.workshops-slider');
    initSlider('.reviews-slider');
}); 