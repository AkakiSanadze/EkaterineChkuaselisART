/**
 * Lazy Loading implementation for images
 * Improves page performance by loading images only when they enter viewport
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        rootMargin: '50px 0px', // Load images 50px before they enter viewport
        threshold: 0.01
    };

    /**
     * Initialize lazy loading for images
     * Supports both native loading="lazy" and Intersection Observer fallback
     */
    const initLazyLoad = () => {
        // Check for native lazy loading support
        const hasNativeLazyLoad = 'loading' in HTMLImageElement.prototype;

        if (hasNativeLazyLoad) {
            // Use native lazy loading for browsers that support it
            applyNativeLazyLoad();
        } else {
            // Fallback to Intersection Observer
            applyIntersectionObserverLazyLoad();
        }
    };

    /**
     * Apply native lazy loading to images
     */
    const applyNativeLazyLoad = () => {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            // Skip images that are above the fold or critical
            if (!img.classList.contains('no-lazy')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    };

    /**
     * Apply Intersection Observer lazy loading for older browsers
     */
    const applyIntersectionObserverLazyLoad = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, CONFIG);

        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    };

    /**
     * Load an image by swapping data-src to src
     * @param {HTMLImageElement} img - The image element to load
     */
    const loadImage = (img) => {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Create a new image to preload
        const preloadImg = new Image();
        
        preloadImg.onload = () => {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        };

        preloadImg.onerror = () => {
            // Handle error - could add a placeholder image here
            console.warn(`Failed to load image: ${src}`);
            img.classList.add('load-error');
        };

        preloadImg.src = src;
    };

    /**
     * Manually trigger lazy load for a specific container
     * Useful for dynamically added content
     * @param {HTMLElement} container - Container to search for lazy images
     */
    const refreshLazyLoad = (container = document) => {
        const images = container.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, CONFIG);

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback: load all images immediately
            images.forEach(img => loadImage(img));
        }
    };

    // Expose functions globally
    window.LazyLoad = {
        init: initLazyLoad,
        refresh: refreshLazyLoad,
        loadImage: loadImage
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoad);
    } else {
        initLazyLoad();
    }
})();
