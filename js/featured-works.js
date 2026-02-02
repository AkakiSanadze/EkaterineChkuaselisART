/**
 * Featured Works functionality for homepage
 * Displays random selection of artworks in the featured section
 * Now loads artwork data from JSON configuration
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        displayCount: 9 // Number of artworks to display
    };

    // State
    let allArtworks = [];
    let currentLang = 'en';

    /**
     * Detect current language from URL
     */
    const detectLanguage = () => {
        const path = window.location.pathname;
        if (path.includes('-ka.html')) {
            currentLang = 'ka';
        } else if (path.includes('-ru.html')) {
            currentLang = 'ru';
        } else {
            currentLang = 'en';
        }
    };

    /**
     * Get translated title
     */
    const getTitle = (artwork) => {
        if (currentLang === 'ka' && artwork.title_ka) return artwork.title_ka;
        if (currentLang === 'ru' && artwork.title_ru) return artwork.title_ru;
        return artwork.title;
    };

    /**
     * Get translated technique
     */
    const getTechnique = (artwork) => {
        if (currentLang === 'ka' && artwork.technique_ka) return artwork.technique_ka;
        if (currentLang === 'ru' && artwork.technique_ru) return artwork.technique_ru;
        return artwork.technique;
    };

    /**
     * Load artworks from global ARTWORKS_DATA
     */
    const loadArtworks = () => {
        try {
            // Use global ARTWORKS_DATA from data/artworks.js
            if (typeof ARTWORKS_DATA !== 'undefined' && ARTWORKS_DATA.artworks) {
                allArtworks = ARTWORKS_DATA.artworks;
                return allArtworks;
            } else {
                throw new Error('ARTWORKS_DATA not found');
            }
        } catch (error) {
            console.error('Failed to load artworks for featured section:', error);
            return [];
        }
    };

    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} - New shuffled array
     */
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    /**
     * Get random artworks from the collection
     * @param {number} count - Number of artworks to select
     * @returns {Array} - Array of selected artworks
     */
    const getRandomArtworks = (count) => {
        const shuffled = shuffleArray(allArtworks);
        return shuffled.slice(0, Math.min(count, allArtworks.length));
    };

    /**
     * Get gallery URL based on current language
     */
    const getGalleryUrl = () => {
        if (currentLang === 'ka') return 'gallery-ka.html';
        if (currentLang === 'ru') return 'gallery-ru.html';
        return 'gallery.html';
    };

    /**
     * Create HTML for a single artwork item
     * @param {Object} artwork - Artwork data object
     * @param {number} index - Index of the artwork
     * @returns {string} - HTML string
     */
    const createArtworkHTML = (artwork, index) => {
        const title = getTitle(artwork);
        const technique = getTechnique(artwork);
        const galleryUrl = getGalleryUrl();
        
        return `
            <a href="${galleryUrl}" class="featured-work-item" role="listitem" aria-label="View ${title} - ${technique}">
                <img src="${artwork.image}" alt="${title} - ${technique} artwork by Ekaterine Chkuaseli" loading="lazy">
                <div class="overlay">
                    <h3>${title}</h3>
                    <p>${technique}</p>
                </div>
            </a>
        `;
    };

    /**
     * Populate the featured works container with random artworks
     */
    const populateFeaturedWorks = () => {
        const container = document.querySelector('.featured-works');
        
        if (!container) {
            return;
        }

        // Load artworks if not already loaded
        if (allArtworks.length === 0) {
            loadArtworks();
        }

        if (allArtworks.length === 0) {
            container.innerHTML = '<p>Unable to load artworks. Please try again later.</p>';
            return;
        }

        const randomArtworks = getRandomArtworks(CONFIG.displayCount);
        const html = randomArtworks.map((artwork, index) => createArtworkHTML(artwork, index)).join('');
        
        container.innerHTML = html;

        // Refresh lazy loading for newly added images
        if (window.LazyLoad && typeof window.LazyLoad.refresh === 'function') {
            window.LazyLoad.refresh(container);
        }
    };

    /**
     * Refresh featured works with new random selection
     */
    const refreshFeaturedWorks = () => {
        populateFeaturedWorks();
    };

    /**
     * Initialize featured works section
     */
    const initFeaturedWorks = () => {
        detectLanguage();
        populateFeaturedWorks();
    };

    // Expose API globally
    window.FeaturedWorks = {
        init: initFeaturedWorks,
        refresh: refreshFeaturedWorks,
        getAllArtworks: () => [...allArtworks],
        getRandom: getRandomArtworks
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeaturedWorks);
    } else {
        initFeaturedWorks();
    }
})();
