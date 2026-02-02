/**
 * Gallery functionality
 * Includes filtering by category, search, sorting, load more, and lightbox for viewing artwork
 * Enhanced with keyboard navigation and accessibility features
 * Now loads artwork data from JSON configuration
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        itemsPerLoad: 12,

    };

    // DOM elements
    let filterButtons = [];
    let galleryGrid = null;
    let lightbox = null;
    let lightboxImg = null;
    let lightboxTitle = null;
    let lightboxTechnique = null;
    let lightboxDetails = null;
    let lightboxClose = null;
    let lightboxPrev = null;
    let lightboxNext = null;
    let lightboxCounter = null;
    let currentIndexEl = null;
    let totalIndexEl = null;

    // Gallery controls
    let searchInput = null;
    let searchClearBtn = null;

    let activeFiltersContainer = null;
    let activeFiltersList = null;
    let clearFiltersBtn = null;
    let galleryLoading = null;
    let noResults = null;
    let loadMoreBtn = null;
    let loadMoreContainer = null;
    let loadedCountEl = null;
    let totalCountEl = null;
    let backToTopBtn = null;
    let breadcrumbs = null;

    // State
    let currentFilter = 'all';
    let currentSearch = '';

    let isInitialized = false;
    let currentLightboxIndex = -1;
    let visibleItems = [];
    let filteredItems = [];
    let lastFocusedElement = null;
    let currentLoadedCount = 0;
    let allArtworks = [];
    let galleryItems = [];

    // Current language
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
            showLoading();
            // Use global ARTWORKS_DATA from data/artworks.js
            if (typeof ARTWORKS_DATA !== 'undefined' && ARTWORKS_DATA.artworks) {
                allArtworks = ARTWORKS_DATA.artworks;
                return allArtworks;
            } else {
                throw new Error('ARTWORKS_DATA not found');
            }
        } catch (error) {
            console.error('Failed to load artworks:', error);
            noResults.style.display = 'flex';
            if (noResults) {
                const h3 = noResults.querySelector('h3');
                const p = noResults.querySelector('p');
                if (h3) h3.textContent = 'Error loading artworks';
                if (p) p.textContent = 'Please try refreshing the page';
            }
            return [];
        }
    };

    /**
     * Generate gallery HTML from JSON data
     */
    const generateGalleryHTML = () => {
        if (!galleryGrid || allArtworks.length === 0) return;

        const artworksHTML = allArtworks.map((artwork, index) => {
            const title = getTitle(artwork);
            const technique = getTechnique(artwork);
            const yearText = artwork.year > 0 ? `, ${artwork.year}` : '';
            const desc = `${technique}, ${artwork.size}${yearText}`;

            return `
                <article class="gallery-item" data-category="${artwork.category}" data-id="${artwork.id}" tabindex="0" role="button" aria-label="View ${title} - ${desc}">
                    <img src="${artwork.image}" alt="${title} - ${desc}" loading="lazy">
                    <div class="gallery-item-info">
                        <h3>${title}</h3>
                        <p>${desc}</p>
                    </div>
                </article>
            `;
        }).join('');

        // Insert before no-results and load-more elements
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = artworksHTML;

        // Move all generated items into the gallery grid
        while (tempDiv.firstChild) {
            galleryGrid.insertBefore(tempDiv.firstChild, noResults);
        }

        // Re-query gallery items
        galleryItems = document.querySelectorAll('.gallery-item');
    };

    /**
     * Initialize gallery functionality
     */
    const initGallery = async () => {
        // Detect language
        detectLanguage();

        // Find gallery elements
        filterButtons = document.querySelectorAll('.gallery-menu button');
        galleryGrid = document.getElementById('gallery-grid');
        lightbox = document.querySelector('.lightbox');

        // Gallery controls
        searchInput = document.getElementById('gallery-search');
        searchClearBtn = document.getElementById('search-clear');

        activeFiltersContainer = document.getElementById('active-filters');
        activeFiltersList = document.getElementById('active-filters-list');
        clearFiltersBtn = document.getElementById('clear-filters');
        galleryLoading = document.getElementById('gallery-loading');
        noResults = document.getElementById('no-results');
        loadMoreBtn = document.getElementById('load-more-btn');
        loadMoreContainer = document.getElementById('load-more-container');
        loadedCountEl = document.getElementById('loaded-count');
        totalCountEl = document.getElementById('total-count');
        backToTopBtn = document.getElementById('back-to-top');
        breadcrumbs = document.querySelector('.breadcrumbs');

        // Exit if no gallery found
        if (!galleryGrid) {
            return;
        }

        // Load artworks and generate HTML
        loadArtworks();
        generateGalleryHTML();

        // Exit if no items generated
        if (galleryItems.length === 0) {
            return;
        }

        isInitialized = true;

        // Cache lightbox elements if lightbox exists
        if (lightbox) {
            lightboxImg = lightbox.querySelector('.lightbox-content img');
            lightboxTitle = lightbox.querySelector('.lightbox-info h3');
            lightboxTechnique = lightbox.querySelector('.lightbox-technique');
            lightboxDetails = lightbox.querySelector('.lightbox-details');
            lightboxClose = lightbox.querySelector('.lightbox-close');
            lightboxPrev = lightbox.querySelector('.lightbox-prev');
            lightboxNext = lightbox.querySelector('.lightbox-next');
            lightboxCounter = document.getElementById('lightbox-counter');
            currentIndexEl = document.getElementById('current-index');
            totalIndexEl = document.getElementById('total-index');
        }

        // Parse all items data
        parseItemsData();

        // Set up initial animations
        setupInitialAnimations();

        // Set up event listeners
        setupEventListeners();

        // Initialize filter counters
        updateFilterCounters();

        // Check for URL filter parameter
        checkUrlFilter();

        // Apply initial sort and load
        applyFiltersAndSort();

        // Initialize back to top button
        initBackToTop();

        hideLoading();
    };

    /**
     * Parse all gallery items data for filtering and sorting
     */
    const parseItemsData = () => {
        allArtworks.forEach((artwork, index) => {
            const item = galleryItems[index];
            if (!item) return;

            const title = getTitle(artwork);
            const technique = getTechnique(artwork);
            const year = artwork.year || 0;

            // Parse dimensions (e.g., "30x45cm" or "70x100cm")
            const sizeMatch = artwork.size.match(/(\d+)x(\d+)/);
            const width = sizeMatch ? parseInt(sizeMatch[1]) : 0;
            const height = sizeMatch ? parseInt(sizeMatch[2]) : 0;
            const area = width * height;

            // Store data on the element for easy access
            item.artworkData = {
                element: item,
                index: index,
                title: title.toLowerCase(),
                titleOriginal: title,
                category: artwork.category,
                year: year,
                width: width,
                height: height,
                area: area,
                technique: technique.toLowerCase(),
                techniqueOriginal: technique,
                imgSrc: artwork.image,
                imgAlt: `${title} - ${technique}, ${artwork.size}`
            };
        });
    };

    /**
     * Set up initial staggered animation delays for gallery items
     */
    const setupInitialAnimations = () => {
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.05}s`;
        });
    };

    /**
     * Update filter counters
     */
    const updateFilterCounters = () => {
        const counts = {
            all: allArtworks.length,
            oil: 0,
            ink: 0,
            pastel: 0,
            mixed: 0
        };

        allArtworks.forEach(artwork => {
            if (counts.hasOwnProperty(artwork.category)) {
                counts[artwork.category]++;
            }
        });

        Object.keys(counts).forEach(key => {
            const counter = document.getElementById(`count-${key}`);
            if (counter) {
                counter.textContent = counts[key];
            }
        });
    };

    /**
     * Apply search, filter, and sort
     */
    const applyFiltersAndSort = () => {
        if (!isInitialized) return;

        showLoading();

        // Small delay to show loading state
        setTimeout(() => {
            // Filter items
            filteredItems = Array.from(galleryItems).filter(item => {
                const data = item.artworkData;
                if (!data) return false;

                // Category filter
                const categoryMatch = currentFilter === 'all' || data.category === currentFilter;

                // Search filter
                const searchMatch = !currentSearch ||
                    data.title.includes(currentSearch.toLowerCase()) ||
                    data.technique.includes(currentSearch.toLowerCase()) ||
                    data.year.toString().includes(currentSearch);

                return categoryMatch && searchMatch;
            });



            // Reset load count
            currentLoadedCount = 0;

            // Update display
            updateGalleryDisplay();

            // Update active filters display
            updateActiveFilters();

            // Update breadcrumbs
            updateBreadcrumbs();

            hideLoading();
        }, 150);
    };



    /**
     * Update gallery display with filtered and sorted items
     */
    const updateGalleryDisplay = () => {
        // Hide all items first
        galleryItems.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('visible');
        });

        // Show no results message if needed
        if (filteredItems.length === 0) {
            if (noResults) noResults.style.display = 'flex';
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
            updateVisibleItems();
            return;
        }

        if (noResults) noResults.style.display = 'none';

        // Calculate how many items to show
        const itemsToShow = Math.min(currentLoadedCount + CONFIG.itemsPerLoad, filteredItems.length);

        // Show items
        for (let i = 0; i < itemsToShow; i++) {
            const item = filteredItems[i];
            item.style.display = 'block';
            item.style.animationDelay = `${i * 0.05}s`;
            item.classList.add('visible');

            // Trigger animation
            item.style.animation = 'none';
            void item.offsetWidth;
            item.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }

        currentLoadedCount = itemsToShow;

        // Update load more button
        updateLoadMoreButton();

        // Update visible items list
        updateVisibleItems();

        // Update counter
        if (loadedCountEl) loadedCountEl.textContent = currentLoadedCount;
        if (totalCountEl) totalCountEl.textContent = filteredItems.length;
    };

    /**
     * Update load more button visibility
     */
    const updateLoadMoreButton = () => {
        if (!loadMoreContainer) return;

        if (currentLoadedCount >= filteredItems.length) {
            loadMoreContainer.style.display = 'none';
        } else {
            loadMoreContainer.style.display = 'flex';
        }
    };

    /**
     * Load more items
     */
    const loadMore = () => {
        const itemsToShow = Math.min(currentLoadedCount + CONFIG.itemsPerLoad, filteredItems.length);

        for (let i = currentLoadedCount; i < itemsToShow; i++) {
            const item = filteredItems[i];
            item.style.display = 'block';
            item.style.animationDelay = `${(i - currentLoadedCount) * 0.05}s`;

            // Trigger animation
            item.style.animation = 'none';
            void item.offsetWidth;
            item.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }

        currentLoadedCount = itemsToShow;

        // Update load more button
        updateLoadMoreButton();

        // Update visible items list
        updateVisibleItems();

        // Update counter
        if (loadedCountEl) loadedCountEl.textContent = currentLoadedCount;
    };

    /**
     * Update active filters display
     */
    const updateActiveFilters = () => {
        if (!activeFiltersContainer || !activeFiltersList) return;

        const activeFilters = [];

        if (currentFilter !== 'all') {
            const filterBtn = document.querySelector(`button[data-filter="${currentFilter}"]`);
            const filterText = filterBtn ? filterBtn.textContent.replace(/\d+/, '').trim() : currentFilter;
            activeFilters.push({ type: 'category', value: filterText, id: 'category' });
        }

        if (currentSearch) {
            activeFilters.push({ type: 'search', value: `"${currentSearch}"`, id: 'search' });
        }

        if (activeFilters.length > 0) {
            activeFiltersContainer.style.display = 'flex';
            activeFiltersList.innerHTML = activeFilters.map(filter => `
                <span class="active-filter-tag" data-filter-id="${filter.id}">
                    ${filter.value}
                    <button class="remove-filter" data-filter-type="${filter.type}" aria-label="Remove ${filter.type} filter">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </span>
            `).join('');

            // Add event listeners to remove filter buttons
            activeFiltersList.querySelectorAll('.remove-filter').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const filterType = e.currentTarget.getAttribute('data-filter-type');
                    if (filterType === 'category') {
                        applyFilter('all');
                    } else if (filterType === 'search') {
                        clearSearch();
                    }
                });
            });
        } else {
            activeFiltersContainer.style.display = 'none';
        }
    };

    /**
     * Update breadcrumbs based on current filter
     */
    const updateBreadcrumbs = () => {
        if (!breadcrumbs) return;

        const breadcrumbList = breadcrumbs.querySelector('ol');
        if (!breadcrumbList) return;

        const homeText = currentLang === 'ka' ? 'მთავარი' : (currentLang === 'ru' ? 'Главная' : 'Home');
        const galleryText = currentLang === 'ka' ? 'გალერეა' : (currentLang === 'ru' ? 'Галерея' : 'Gallery');
        const allWorksText = currentLang === 'ka' ? 'ყველა ნამუშევარი' : (currentLang === 'ru' ? 'Все работы' : 'All Works');

        let breadcrumbHTML = `
            <li><a href="index${currentLang === 'en' ? '' : '-' + currentLang}.html">${homeText}</a></li>
            <li><a href="gallery${currentLang === 'en' ? '' : '-' + currentLang}.html">${galleryText}</a></li>
        `;

        if (currentFilter !== 'all') {
            const filterNames = {
                oil: currentLang === 'ka' ? 'ზეთის სურათები' : (currentLang === 'ru' ? 'Картины маслом' : 'Oil Paintings'),
                ink: currentLang === 'ka' ? 'მელნის ნახატები' : (currentLang === 'ru' ? 'Рисунки тушью' : 'Ink Drawings'),
                pastel: currentLang === 'ka' ? 'პასტელი' : (currentLang === 'ru' ? 'Пастель' : 'Pastel'),
                mixed: currentLang === 'ka' ? 'შერეული ტექნიკა' : (currentLang === 'ru' ? 'Смешанная техника' : 'Mixed Media')
            };
            breadcrumbHTML += `<li aria-current="page">${filterNames[currentFilter] || currentFilter}</li>`;
        } else if (currentSearch) {
            const searchText = currentLang === 'ka' ? 'ძიება' : (currentLang === 'ru' ? 'Поиск' : 'Search');
            breadcrumbHTML += `<li aria-current="page">${searchText}: "${currentSearch}"</li>`;
        } else {
            breadcrumbHTML += `<li aria-current="page">${allWorksText}</li>`;
        }

        breadcrumbList.innerHTML = breadcrumbHTML;
    };

    /**
     * Show loading spinner
     */
    const showLoading = () => {
        if (galleryLoading) {
            galleryLoading.style.display = 'flex';
        }
        if (noResults) noResults.style.display = 'none';
    };

    /**
     * Hide loading spinner
     */
    const hideLoading = () => {
        if (galleryLoading) {
            galleryLoading.style.display = 'none';
        }
    };

    /**
     * Apply filter to gallery items
     * @param {string} filterValue - The filter category to apply
     */
    const applyFilter = (filterValue) => {
        currentFilter = filterValue;

        // Update active button state
        filterButtons.forEach(btn => {
            const btnFilter = btn.getAttribute('data-filter');
            if (btnFilter === filterValue) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        // Apply filters and sort
        applyFiltersAndSort();

        // Announce filter change to screen readers
        announceFilterChange(filteredItems.length);
    };

    /**
     * Handle search input
     */
    const handleSearch = (value) => {
        currentSearch = value.trim();

        // Show/hide clear button
        if (searchClearBtn) {
            searchClearBtn.style.display = currentSearch ? 'flex' : 'none';
        }

        // Apply filters and sort
        applyFiltersAndSort();
    };

    /**
     * Clear search input
     */
    const clearSearch = () => {
        if (searchInput) {
            searchInput.value = '';
        }
        currentSearch = '';
        if (searchClearBtn) {
            searchClearBtn.style.display = 'none';
        }
        applyFiltersAndSort();
        if (searchInput) searchInput.focus();
    };



    /**
     * Clear all filters
     */
    const clearAllFilters = () => {
        currentFilter = 'all';
        currentSearch = '';

        if (searchInput) {
            searchInput.value = '';
        }
        if (searchClearBtn) {
            searchClearBtn.style.display = 'none';
        }

        // Update filter buttons
        filterButtons.forEach(btn => {
            const btnFilter = btn.getAttribute('data-filter');
            if (btnFilter === 'all') {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        applyFiltersAndSort();
    };

    /**
     * Announce filter change to screen readers
     * @param {number} count - Number of visible items
     */
    const announceFilterChange = (count) => {
        const artworkText = currentLang === 'ka' ? 'ნამუშევარი' : (currentLang === 'ru' ? 'произведений' : 'artworks');
        const showingText = currentLang === 'ka' ? 'ნაჩვენებია' : (currentLang === 'ru' ? 'Показано' : 'Showing');

        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `${showingText} ${count} ${artworkText}`;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };

    /**
     * Check URL parameters for initial filter
     */
    const checkUrlFilter = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');

        if (filterParam) {
            // Validate filter value
            const validFilters = ['all', 'oil', 'ink', 'pastel', 'mixed'];
            if (validFilters.includes(filterParam)) {
                currentFilter = filterParam;

                // Update button states
                filterButtons.forEach(btn => {
                    const btnFilter = btn.getAttribute('data-filter');
                    if (btnFilter === filterParam) {
                        btn.classList.add('active');
                        btn.setAttribute('aria-selected', 'true');
                    } else {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-selected', 'false');
                    }
                });
            }
        }
    };

    /**
     * Update the list of currently visible items
     */
    const updateVisibleItems = () => {
        visibleItems = Array.from(galleryItems).filter(item =>
            item.style.display !== 'none'
        );
    };

    /**
     * Get index of item in visible items list
     * @param {HTMLElement} item - Gallery item
     * @returns {number} - Index in visible items
     */
    const getVisibleItemIndex = (item) => {
        return visibleItems.indexOf(item);
    };

    /**
     * Open lightbox with artwork details
     * @param {HTMLElement} item - The gallery item element
     */
    const openLightbox = (item) => {
        if (!lightbox || !lightboxImg) return;

        // Store last focused element for restoration
        lastFocusedElement = document.activeElement;

        const data = item.artworkData;
        if (!data) return;

        const title = data.titleOriginal;
        const technique = data.techniqueOriginal;
        const artworkId = item.getAttribute('data-id');
        const artwork = allArtworks.find(a => a.id === artworkId);
        const year = artwork ? artwork.year : 0;
        const size = artwork ? artwork.size : '';
        const details = year > 0 ? `${size}, ${year}` : size;

        lightboxImg.src = data.imgSrc;
        lightboxImg.alt = data.imgAlt;

        if (lightboxTitle) {
            lightboxTitle.textContent = title;
        }
        if (lightboxTechnique) {
            lightboxTechnique.textContent = technique;
        }
        if (lightboxDetails) {
            lightboxDetails.textContent = details;
        }

        // Add share buttons to lightbox
        addLightboxShareButtons(title, data.imgSrc);

        // Set current index
        currentLightboxIndex = getVisibleItemIndex(item);

        // Update counter
        if (currentIndexEl && totalIndexEl) {
            currentIndexEl.textContent = currentLightboxIndex + 1;
            totalIndexEl.textContent = visibleItems.length;
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Set focus to lightbox
        lightbox.setAttribute('tabindex', '0');
        lightbox.focus();

        // Trap focus within lightbox
        trapFocus(lightbox);
    };

    /**
     * Close the lightbox
     */
    const closeLightbox = () => {
        if (!lightbox) return;

        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling

        // Restore focus to the element that opened the lightbox
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    /**
     * Navigate to previous item in lightbox
     */
    const prevLightboxItem = () => {
        if (visibleItems.length === 0) return;

        currentLightboxIndex--;
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = visibleItems.length - 1;
        }

        const item = visibleItems[currentLightboxIndex];
        if (item) {
            updateLightboxContent(item);
        }
    };

    /**
     * Navigate to next item in lightbox
     */
    const nextLightboxItem = () => {
        if (visibleItems.length === 0) return;

        currentLightboxIndex++;
        if (currentLightboxIndex >= visibleItems.length) {
            currentLightboxIndex = 0;
        }

        const item = visibleItems[currentLightboxIndex];
        if (item) {
            updateLightboxContent(item);
        }
    };

    /**
     * Update lightbox content without closing
     * @param {HTMLElement} item - Gallery item
     */
    const updateLightboxContent = (item) => {
        const data = item.artworkData;
        if (!data) return;

        const title = data.titleOriginal;
        const technique = data.techniqueOriginal;
        const artworkId = item.getAttribute('data-id');
        const artwork = allArtworks.find(a => a.id === artworkId);
        const year = artwork ? artwork.year : 0;
        const size = artwork ? artwork.size : '';
        const details = year > 0 ? `${size}, ${year}` : size;

        // Add fade effect
        lightboxImg.style.opacity = '0.5';

        setTimeout(() => {
            lightboxImg.src = data.imgSrc;
            lightboxImg.alt = data.imgAlt;

            if (lightboxTitle) lightboxTitle.textContent = title;
            if (lightboxTechnique) lightboxTechnique.textContent = technique;
            if (lightboxDetails) lightboxDetails.textContent = details;

            lightboxImg.style.opacity = '1';
        }, 150);

        // Update counter
        if (currentIndexEl && totalIndexEl) {
            currentIndexEl.textContent = currentLightboxIndex + 1;
            totalIndexEl.textContent = visibleItems.length;
        }
    };

    /**
     * Trap focus within an element (for modals)
     * @param {HTMLElement} element - Element to trap focus within
     */
    const trapFocus = (element) => {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });

        firstFocusable.focus();
    };

    /**
     * Handle keyboard navigation for gallery items
     * @param {KeyboardEvent} e - Keyboard event
     * @param {HTMLElement} item - Gallery item
     */
    const handleGalleryItemKeydown = (e, item) => {
        const index = getVisibleItemIndex(item);
        const itemsPerRow = getItemsPerRow();

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                openLightbox(item);
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (index < visibleItems.length - 1) {
                    visibleItems[index + 1].focus();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (index > 0) {
                    visibleItems[index - 1].focus();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (index + itemsPerRow < visibleItems.length) {
                    visibleItems[index + itemsPerRow].focus();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (index - itemsPerRow >= 0) {
                    visibleItems[index - itemsPerRow].focus();
                }
                break;
            case 'Home':
                e.preventDefault();
                if (visibleItems.length > 0) {
                    visibleItems[0].focus();
                }
                break;
            case 'End':
                e.preventDefault();
                if (visibleItems.length > 0) {
                    visibleItems[visibleItems.length - 1].focus();
                }
                break;
        }
    };

    /**
     * Get number of items per row based on viewport
     * @returns {number} - Items per row
     */
    const getItemsPerRow = () => {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    };

    /**
     * Handle keyboard navigation in lightbox
     * @param {KeyboardEvent} e - Keyboard event
     */
    const handleLightboxKeydown = (e) => {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevLightboxItem();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextLightboxItem();
                break;
        }
    };

    /**
     * Initialize back to top button
     */
    const initBackToTop = () => {
        if (!backToTopBtn) return;

        // Show/hide button based on scroll position
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
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
    };

    /**
     * Set up all event listeners
     */
    const setupEventListeners = () => {
        // Filter button clicks
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filterValue = this.getAttribute('data-filter');
                applyFilter(filterValue);
            });
        });

        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                handleSearch(e.target.value);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    clearSearch();
                }
            });
        }

        // Search clear button
        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', clearSearch);
        }



        // Clear all filters button
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearAllFilters);
        }

        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMore);
        }

        // Gallery item clicks and keyboard navigation
        galleryItems.forEach(item => {
            item.addEventListener('click', function (e) {
                // Check if click was on a share button
                if (e.target.closest('.gallery-item-share')) {
                    return;
                }
                if (this.style.display !== 'none') {
                    openLightbox(this);
                }
            });

            item.addEventListener('keydown', (e) => {
                if (item.style.display !== 'none') {
                    handleGalleryItemKeydown(e, item);
                }
            });
        });

        // Add share buttons to gallery items
        addSocialShareToGalleryItems();

        // Lightbox controls
        if (lightbox) {
            // Close lightbox on background click
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                    closeLightbox();
                }
            });

            // Close button
            if (lightboxClose) {
                lightboxClose.addEventListener('click', closeLightbox);
            }

            // Previous button
            if (lightboxPrev) {
                lightboxPrev.addEventListener('click', (e) => {
                    e.stopPropagation();
                    prevLightboxItem();
                });
            }

            // Next button
            if (lightboxNext) {
                lightboxNext.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nextLightboxItem();
                });
            }

            // Keyboard navigation
            lightbox.addEventListener('keydown', handleLightboxKeydown);
        }

        // Prevent lightbox image click from closing
        if (lightboxImg) {
            lightboxImg.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }

        // Global keyboard navigation (Escape to close)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
                closeLightbox();
            }
        });
    };

    /**
     * Add share buttons to lightbox
     */
    const addLightboxShareButtons = (title, imgSrc) => {
        const lightboxInfo = document.querySelector('.lightbox-info');
        if (!lightboxInfo) return;

        // Remove existing share buttons
        const existingShare = lightboxInfo.querySelector('.lightbox-share');
        if (existingShare) {
            existingShare.remove();
        }

        // Generate artwork ID from title
        const artworkId = title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const shareText = currentLang === 'ka' ? 'გაზიარება:' : (currentLang === 'ru' ? 'Поделиться:' : 'Share:');

        const shareContainer = document.createElement('div');
        shareContainer.className = 'lightbox-share';
        shareContainer.innerHTML = `
            <span>${shareText}</span>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/artwork.html?id=' + artworkId)}" 
               class="share-btn-small facebook" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <i class="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/artwork.html?id=' + artworkId)}&text=${encodeURIComponent(title)}" 
               class="share-btn-small twitter" target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                <i class="fab fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.origin + '/artwork.html?id=' + artworkId)}&media=${encodeURIComponent(window.location.origin + '/' + imgSrc)}&description=${encodeURIComponent(title)}" 
               class="share-btn-small pinterest" target="_blank" rel="noopener noreferrer" aria-label="Pin on Pinterest">
                <i class="fab fa-pinterest-p" aria-hidden="true"></i>
            </a>
            <a href="mailto:?subject=${encodeURIComponent('Check out this artwork: ' + title)}&body=${encodeURIComponent('I thought you might like this artwork by Ekaterine Chkuaseli:\n\n' + title + '\n\n' + window.location.origin + '/artwork.html?id=' + artworkId)}" 
               class="share-btn-small email" aria-label="Share via email">
                <i class="fas fa-envelope" aria-hidden="true"></i>
            </a>
        `;

        lightboxInfo.appendChild(shareContainer);
    };

    /**
     * Get current active filter
     * @returns {string} - Current filter value
     */
    const getCurrentFilter = () => currentFilter;

    /**
     * Get visible gallery items count
     * @returns {number} - Number of visible items
     */
    const getVisibleCount = () => visibleItems.length;

    /**
     * Add social share buttons to gallery items
     */
    const addSocialShareToGalleryItems = () => {
        galleryItems.forEach(item => {
            const infoBox = item.querySelector('.gallery-item-info');
            if (!infoBox || infoBox.querySelector('.gallery-item-share')) return;

            const data = item.artworkData;
            if (!data) return;

            const title = data.titleOriginal;
            const imgSrc = data.imgSrc;

            // Generate artwork ID from title
            const artworkId = title.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const shareContainer = document.createElement('div');
            shareContainer.className = 'gallery-item-share';
            shareContainer.innerHTML = `
                <button class="share-toggle" aria-label="Share this artwork" title="Share">
                    <i class="fas fa-share-alt" aria-hidden="true"></i>
                </button>
                <div class="share-menu">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/artwork.html?id=' + artworkId)}" 
                       class="share-btn-small facebook" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                        <i class="fab fa-facebook-f" aria-hidden="true"></i>
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/artwork.html?id=' + artworkId)}&text=${encodeURIComponent(title)}" 
                       class="share-btn-small twitter" target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                        <i class="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.origin + '/artwork.html?id=' + artworkId)}&media=${encodeURIComponent(window.location.origin + '/' + imgSrc)}&description=${encodeURIComponent(title)}" 
                       class="share-btn-small pinterest" target="_blank" rel="noopener noreferrer" aria-label="Pin on Pinterest">
                        <i class="fab fa-pinterest-p" aria-hidden="true"></i>
                    </a>
                    <a href="mailto:?subject=${encodeURIComponent('Check out this artwork: ' + title)}&body=${encodeURIComponent('I thought you might like this artwork by Ekaterine Chkuaseli:\n\n' + title + '\n\n' + window.location.origin + '/artwork.html?id=' + artworkId)}" 
                       class="share-btn-small email" aria-label="Share via email">
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                    </a>
                </div>
            `;

            infoBox.appendChild(shareContainer);

            // Toggle share menu
            const shareToggle = shareContainer.querySelector('.share-toggle');
            const shareMenu = shareContainer.querySelector('.share-menu');

            shareToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                shareMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!shareContainer.contains(e.target)) {
                    shareMenu.classList.remove('active');
                }
            });
        });
    };

    /**
     * Refresh gallery with new data
     */
    const refreshGallery = () => {
        loadArtworks();

        // Clear existing items
        galleryItems.forEach(item => item.remove());

        // Regenerate
        generateGalleryHTML();
        parseItemsData();
        setupInitialAnimations();

        // Re-apply filters
        applyFiltersAndSort();
    };

    // Expose gallery API globally
    window.Gallery = {
        init: initGallery,
        filter: applyFilter,
        search: handleSearch,

        loadMore: loadMore,
        clearFilters: clearAllFilters,
        openLightbox: openLightbox,
        closeLightbox: closeLightbox,
        prevItem: prevLightboxItem,
        nextItem: nextLightboxItem,
        getCurrentFilter: getCurrentFilter,
        getVisibleCount: getVisibleCount,
        refresh: refreshGallery,
        getAllArtworks: () => [...allArtworks]
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
})();
