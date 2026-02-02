/**
 * Main JavaScript file for Ekaterine Chkuaseli's Art website
 * Initializes all modules and handles shared functionality
 */

(function() {
    'use strict';

    /**
     * Initialize all modules when DOM is ready
     */
    const init = () => {
        // Initialize lazy loading first (applies to all images)
        if (window.LazyLoad && typeof window.LazyLoad.init === 'function') {
            window.LazyLoad.init();
        }

        // Initialize hero slider (index.html)
        if (window.HeroSlider && typeof window.HeroSlider.init === 'function') {
            window.HeroSlider.init();
        }

        // Initialize featured works (index.html)
        if (window.FeaturedWorks && typeof window.FeaturedWorks.init === 'function') {
            window.FeaturedWorks.init();
        }

        // Initialize gallery (gallery.html)
        if (window.Gallery && typeof window.Gallery.init === 'function') {
            window.Gallery.init();
        }

        // Initialize shared UI components
        initUI();
    };

    /**
     * Initialize shared UI components
     */
    const initUI = () => {
        // Smooth scroll for anchor links
        initSmoothScroll();

        // Header scroll behavior
        initHeaderBehavior();

        // Mobile navigation (if needed in future)
        initMobileNav();

        // Back to top button
        initBackToTop();

        // Active navigation indicator
        initActiveNavigation();

        // Image loading states
        initImageLoadingStates();

        // Update copyright year dynamically
        updateCopyrightYear();
    };

    /**
     * Initialize smooth scrolling for anchor links
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    /**
     * Initialize header scroll behavior
     * Adds class to header when scrolled
     */
    const initHeaderBehavior = () => {
        const header = document.querySelector('header');
        if (!header) return;

        const scrollThreshold = 50;
        let lastScrollY = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Add/remove scrolled class
            if (currentScrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        };

        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
    };

    /**
     * Initialize mobile navigation
     * Placeholder for future mobile menu functionality
     */
    const initMobileNav = () => {
        // Mobile nav toggle functionality can be added here
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const nav = document.querySelector('nav');

        if (mobileNavToggle && nav) {
            mobileNavToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileNavToggle.classList.toggle('active');
            });
        }
    };

    /**
     * Initialize Back to Top button
     * Shows button when user scrolls down and smooth scrolls to top on click
     */
    const initBackToTop = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        // Show/hide button based on scroll position
        const toggleBackToTop = () => {
            if (window.scrollY > 200) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTop, { passive: true });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initial check
        toggleBackToTop();
    };

    /**
     * Initialize Active Navigation Indicator
     * Highlights the current page in the navigation menu
     */
    const initActiveNavigation = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav ul li a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            
            // Check if this link matches the current page
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === '/' && linkPage === 'index.html')) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active');
            } else {
                link.removeAttribute('aria-current');
                link.classList.remove('active');
            }
        });
    };

    /**
     * Update copyright year dynamically
     * Replaces the year in footer copyright text with current year
     */
    const updateCopyrightYear = () => {
        const currentYear = new Date().getFullYear();
        const copyrightElements = document.querySelectorAll('.copyright');
        
        copyrightElements.forEach(el => {
            // Replace any 4-digit year with current year
            el.textContent = el.textContent.replace(/\d{4}/, currentYear);
        });
    };

    /**
     * Initialize Image Loading States
     * Adds loading indicators and skeleton screens for images
     */
    const initImageLoadingStates = () => {
        const images = document.querySelectorAll('img:not([loading="lazy"])');
        
        images.forEach(img => {
            // Skip if image is already loaded
            if (img.complete) return;

            // Add loading class
            img.classList.add('image-loading');
            
            // Create skeleton loader if parent allows
            const parent = img.parentElement;
            if (parent && !parent.querySelector('.skeleton-loader')) {
                const skeleton = document.createElement('div');
                skeleton.className = 'skeleton-loader';
                skeleton.setAttribute('aria-hidden', 'true');
                parent.style.position = 'relative';
                parent.insertBefore(skeleton, img);
            }

            // Handle load event
            img.addEventListener('load', () => {
                img.classList.remove('image-loading');
                img.classList.add('image-loaded');
                const skeleton = parent.querySelector('.skeleton-loader');
                if (skeleton) {
                    skeleton.remove();
                }
            });

            // Handle error event
            img.addEventListener('error', () => {
                img.classList.remove('image-loading');
                img.classList.add('image-error');
                const skeleton = parent.querySelector('.skeleton-loader');
                if (skeleton) {
                    skeleton.remove();
                }
            });
        });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose main API globally
    window.App = {
        init: init,
        version: '1.0.0'
    };
})();
