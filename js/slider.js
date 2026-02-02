/**
 * Hero Slider functionality
 * Auto-rotating image slider for the homepage hero section
 * Includes keyboard navigation support
 * Now loads slides from JSON configuration
 */

(function() {
    'use strict';

    // Slider configuration
    const CONFIG = {
        autoPlayInterval: 5000, // 5 seconds between slides
        slideTransition: 'fade' // Transition type
    };

    // DOM elements
    let slides = [];
    let dots = [];
    let prevArrow = null;
    let nextArrow = null;
    let heroContent = null;
    let slider = null;
    let sliderNav = null;

    // State
    let currentSlide = 0;
    let slideInterval = null;
    let isInitialized = false;
    let slideData = [];

    /**
     * Load slider configuration from global SLIDER_DATA
     */
    const loadSliderConfig = () => {
        // Use global SLIDER_DATA from data/slider.js
        if (typeof SLIDER_DATA !== 'undefined' && SLIDER_DATA.slides) {
            slideData = SLIDER_DATA.slides;
        } else {
            console.warn('SLIDER_DATA not found, using defaults');
            // Fallback to default slides if data not loaded
            slideData = [
                { id: 1, image: 'images/still-life.jpg', alt: 'Still life artwork' },
                { id: 2, image: 'images/Untitled.jpg', alt: 'Untitled artwork' },
                { id: 3, image: 'images/spring.jpg', alt: 'Spring artwork' }
            ];
        }
        return slideData;
    };

    /**
     * Generate slider HTML from JSON data
     */
    const generateSliderHTML = () => {
        const sliderContainer = document.querySelector('.hero-slider');
        if (!sliderContainer || slideData.length === 0) return;

        // Get gallery URL based on current language
        const currentPath = window.location.pathname;
        let galleryUrl = 'gallery.html';
        if (currentPath.includes('-ka.html')) {
            galleryUrl = 'gallery-ka.html';
        } else if (currentPath.includes('-ru.html')) {
            galleryUrl = 'gallery-ru.html';
        }

        // Generate slides
        const slidesHTML = slideData.map((slide, index) => `
            <a href="${galleryUrl}" 
               class="hero-slide ${index === 0 ? 'active' : ''}" 
               data-slide-index="${index}"
               aria-label="${slide.alt || 'View artwork in gallery'}" 
               aria-roledescription="slide" 
               aria-hidden="${index !== 0}"
               style="background-image: url('${slide.image}')"></a>
        `).join('');

        // Generate dots
        const dotsHTML = slideData.map((_, index) => `
            <button class="slider-dot ${index === 0 ? 'active' : ''}" 
                    role="tab" 
                    aria-label="Go to slide ${index + 1}" 
                    aria-selected="${index === 0}" 
                    aria-controls="slide-${index + 1}"></button>
        `).join('');

        // Insert slides before hero-content
        const heroContentEl = sliderContainer.querySelector('.hero-content');
        if (heroContentEl) {
            heroContentEl.insertAdjacentHTML('beforebegin', slidesHTML);
        }

        // Update dots
        const sliderNavEl = sliderContainer.querySelector('.slider-nav');
        if (sliderNavEl) {
            sliderNavEl.innerHTML = dotsHTML;
        }
    };

    /**
     * Initialize the slider
     */
    const initSlider = () => {
        // Find slider elements
        slider = document.querySelector('.hero-slider');
        
        if (!slider) {
            return;
        }

        // Load configuration and generate HTML
        loadSliderConfig();
        generateSliderHTML();

        // Now query for the generated elements
        slides = document.querySelectorAll('.hero-slide');
        dots = document.querySelectorAll('.slider-dot');
        prevArrow = document.querySelector('.slider-arrow.prev');
        nextArrow = document.querySelector('.slider-arrow.next');
        heroContent = document.querySelector('.hero-content');
        sliderNav = document.querySelector('.slider-nav');

        // Exit if no slides found
        if (slides.length === 0) {
            return;
        }

        isInitialized = true;

        // Set up event listeners
        setupEventListeners();

        // Start auto-play
        startSlideshow();
    };

    /**
     * Show a specific slide by index
     * @param {number} index - The slide index to show
     */
    const showSlide = (index) => {
        if (!isInitialized || slides.length === 0) return;

        // Remove active class from all slides and dots
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            slide.setAttribute('tabindex', '-1');
        });
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });

        // Add active class to current slide and dot
        const safeIndex = ((index % slides.length) + slides.length) % slides.length;
        slides[safeIndex].classList.add('active');
        slides[safeIndex].setAttribute('aria-hidden', 'false');
        slides[safeIndex].setAttribute('tabindex', '0');
        
        if (dots[safeIndex]) {
            dots[safeIndex].classList.add('active');
            dots[safeIndex].setAttribute('aria-selected', 'true');
        }

        currentSlide = safeIndex;
    };

    /**
     * Navigate to next slide
     */
    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    /**
     * Navigate to previous slide
     */
    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    /**
     * Start automatic slideshow
     */
    const startSlideshow = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, CONFIG.autoPlayInterval);
    };

    /**
     * Stop automatic slideshow
     */
    const stopSlideshow = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    };

    /**
     * Reset the slideshow interval (called after manual navigation)
     */
    const resetInterval = () => {
        stopSlideshow();
        startSlideshow();
    };

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - Keyboard event
     */
    const handleKeyboardNavigation = (e) => {
        // Only handle if slider is in viewport
        const rect = slider.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (!isInViewport) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                resetInterval();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                resetInterval();
                break;
            case 'Home':
                e.preventDefault();
                showSlide(0);
                resetInterval();
                break;
            case 'End':
                e.preventDefault();
                showSlide(slides.length - 1);
                resetInterval();
                break;
        }
    };

    /**
     * Set up all event listeners
     */
    const setupEventListeners = () => {
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(index);
                resetInterval();
            });
            
            // Keyboard support for dots
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showSlide(index);
                    resetInterval();
                }
            });
        });

        // Previous arrow
        if (prevArrow) {
            prevArrow.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
                resetInterval();
            });
        }

        // Next arrow
        if (nextArrow) {
            nextArrow.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
                resetInterval();
            });
        }

        // Prevent clicks on hero content from navigating
        if (heroContent) {
            heroContent.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        }

        // Pause on hover
        if (slider) {
            slider.addEventListener('mouseenter', stopSlideshow);
            slider.addEventListener('mouseleave', startSlideshow);
        }

        // Handle visibility change (pause when tab is hidden)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlideshow();
            } else {
                startSlideshow();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
    };

    /**
     * Get current slide index
     * @returns {number} - Current slide index
     */
    const getCurrentSlide = () => currentSlide;

    /**
     * Get total number of slides
     * @returns {number} - Total slides count
     */
    const getTotalSlides = () => slides.length;

    /**
     * Refresh slider with new data (useful for dynamic updates)
     */
    const refreshSlider = () => {
        loadSliderConfig();
        
        // Remove existing slides
        slides.forEach(slide => slide.remove());
        dots.forEach(dot => dot.remove());
        
        // Regenerate
        generateSliderHTML();
        
        // Re-query elements
        slides = document.querySelectorAll('.hero-slide');
        dots = document.querySelectorAll('.slider-dot');
        
        currentSlide = 0;
        showSlide(0);
    };

    // Expose slider API globally
    window.HeroSlider = {
        init: initSlider,
        next: nextSlide,
        prev: prevSlide,
        goTo: showSlide,
        start: startSlideshow,
        stop: stopSlideshow,
        getCurrent: getCurrentSlide,
        getTotal: getTotalSlides,
        refresh: refreshSlider
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlider);
    } else {
        initSlider();
    }
})();
