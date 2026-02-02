/**
 * Artwork Detail Page JavaScript
 * Handles loading artwork details, navigation, social sharing, and similar works
 */

(function() {
    'use strict';

    // Artwork database - contains all artwork information
    const artworkDatabase = [
        { id: 'a-dancer', title: 'A dancer', category: 'ink', technique: 'Ink', size: '22x31cm', year: '', image: 'images/dancer.jpg', description: 'A graceful ink drawing capturing the elegance and movement of a dancer.' },
        { id: 'a-dancer-in-a-black-dress', title: 'A dancer in a black dress', category: 'ink', technique: 'Ink', size: '22x31cm', year: '', image: 'images/a dancer in a black dress.jpg', description: 'An elegant ink drawing of a dancer in dark attire, showcasing fluid movement.' },
        { id: 'freeze', title: 'Freeze', category: 'oil', technique: 'Oil on Canvas', size: '30x45cm', year: '', image: 'images/freeze oil on canvas.jpg', description: 'A frozen moment captured in oil paint, depicting stillness and contemplation.' },
        { id: 'girl-bird', title: 'Girl & Bird', category: 'oil', technique: 'Oil on Canvas', size: '30x45cm', year: '2008', image: 'images/girl bird oil on canvas.jpg', description: 'An oil painting showing a girl with a bird, symbolizing freedom and connection.' },
        { id: 'spring', title: 'Spring', category: 'oil', technique: 'Oil on Canvas', size: '30x45cm', year: '2008', image: 'images/spring.jpg', description: 'An oil painting capturing the essence and renewal of spring season.' },
        { id: 'still-life', title: 'Still life', category: 'oil', technique: 'Oil on Canvas', size: '20x70cm', year: '', image: 'images/still-life.jpg', description: 'A classic still life oil painting of arranged objects.' },
        { id: 'ginger-color', title: 'Ginger Color', category: 'oil', technique: 'Oil on Canvas', size: '45x35cm', year: '2005', image: 'images/Ginger Color.jpg', description: 'A warm-toned oil painting with rich ginger hues.' },
        { id: 'autumn', title: 'Autumn', category: 'mixed', technique: 'Mixed Media', size: '58x80cm', year: '', image: 'images/Autumn .jpg', description: 'A mixed media artwork depicting the beauty of autumn scenery.' },
        { id: 'untitled', title: 'Untitled', category: 'oil', technique: 'Oil', size: '23x65cm', year: '', image: 'images/Untitled.jpg', description: 'An abstract oil painting inviting personal interpretation.' },
        { id: 'angel', title: 'Angel', category: 'ink', technique: 'Ink', size: '29x21cm', year: '', image: 'images/angel.jpg', description: 'A delicate ink drawing of an angelic figure.' },
        { id: 'dance', title: 'Dance', category: 'ink', technique: 'Ink', size: '21x29cm', year: '', image: 'images/dance.jpg', description: 'A dynamic ink drawing capturing movement and rhythm.' },
        { id: 'summer', title: 'Summer', category: 'ink', technique: 'Ink', size: '15x27cm', year: '', image: 'images/summer.jpg', description: 'An ink drawing depicting summer scenes.' },
        { id: 'masquerade', title: 'Masquerade', category: 'ink', technique: 'Ink', size: '29x39cm', year: '', image: 'images/masquerade.jpg', description: 'A theatrical ink drawing of masquerade figures.' },
        { id: 'grandfathers-cat', title: "Grandfather's cat", category: 'ink', technique: 'Ink', size: '15x20cm', year: '', image: 'images/grandfathers-cat.jpg', description: 'A charming ink drawing of a cat with character.' },
        { id: 'a-walk-with-the-lambs', title: 'A walk with the lambs', category: 'ink', technique: 'Ink', size: '29x38cm', year: '', image: 'images/A walk with the lambs.jpg', description: 'An ink drawing of pastoral scene with lambs.' },
        { id: 'still-life-2011', title: 'Still Life', category: 'oil', technique: 'Oil on Canvas', size: '45x60cm', year: '2011', image: 'images/Still Life.jpg', description: 'A traditional still life oil painting from 2011.' },
        { id: 'sheep', title: 'Sheep', category: 'oil', technique: 'Oil on Canvas', size: '40x60cm', year: '', image: 'images/sheep.jpg', description: 'An oil painting of sheep in a pastoral setting.' },
        { id: 'missing', title: 'Missing', category: 'oil', technique: 'Oil on Canvas', size: '30x45cm', year: '', image: 'images/Missing.jpg', description: 'An evocative oil painting suggesting absence and longing.' },
        { id: 'home', title: 'Home', category: 'ink', technique: 'Ink', size: '20x25cm', year: '2009', image: 'images/home-tbilisi-private-collection.jpg', description: 'An ink drawing depicting home, part of Tbilisi private collection.' },
        { id: 'black-white', title: 'Black & White', category: 'ink', technique: 'Ink', size: '20x54cm', year: '2012', image: 'images/black-white.jpg', description: 'A monochromatic ink drawing from Tbilisi private collection.' },
        { id: 'story', title: 'Story', category: 'ink', technique: 'Ink', size: '20x30cm', year: '2012', image: 'images/Story.jpg', description: 'A narrative ink drawing from Tbilisi private collection.' },
        { id: 'fisherman', title: 'Fisherman', category: 'ink', technique: 'Ink', size: '20x30cm', year: '2012', image: 'images/fisherman.jpg', description: 'An ink drawing of a fisherman at work.' },
        { id: 'free-fall', title: 'Free Fall', category: 'ink', technique: 'Ink', size: '20x30cm', year: '2012', image: 'images/free-fall.jpg', description: 'A dynamic ink drawing from Tbilisi private collection.' },
        { id: 'everything', title: 'Everything', category: 'ink', technique: 'Ink', size: '20x25cm', year: '2012', image: 'images/everything.jpg', description: 'A contemplative ink drawing exploring themes of wholeness.' },
        { id: 'landscape', title: 'Landscape', category: 'ink', technique: 'Ink', size: '20x25cm', year: '2012', image: 'images/landscape.jpg', description: 'A scenic ink drawing of natural landscape.' },
        { id: 'marionette', title: 'Marionette', category: 'ink', technique: 'Ink', size: '20x30cm', year: '2012', image: 'images/marionette.jpg', description: 'An artistic ink drawing of a marionette puppet.' },
        { id: 'zebra', title: 'Zebra', category: 'ink', technique: 'Ink', size: '20x30cm', year: '2008', image: 'images/Zebra.jpg', description: 'A striking ink drawing of a zebra from Tbilisi private collection.' },
        { id: 'walking', title: 'Walking', category: 'ink', technique: 'Ink', size: '20x30cm', year: '2012', image: 'images/walking.jpg', description: 'An ink drawing capturing a walking figure.' },
        { id: 'toyfish', title: 'Toyfish', category: 'ink', technique: 'Ink', size: '20x30cm', year: '2012', image: 'images/Toyfish.jpg', description: 'A whimsical ink drawing of a toy fish.' },
        { id: 'one-two-three-four', title: 'One, two, three, four', category: 'ink', technique: 'Ink', size: '20x60cm', year: '2012', image: 'images/One-two-three-four.jpg', description: 'A sequential ink drawing series.' },
        { id: 'bringing-to-you', title: 'Bringing to you', category: 'ink', technique: 'Ink', size: '30x40cm', year: '2011', image: 'images/Bringing-to-you.jpg', description: 'An expressive ink drawing.' },
        { id: 'still-life-orange', title: 'Still Life – Orange', category: 'pastel', technique: 'Pastel', size: '70x100cm', year: '2010', image: 'images/Still-life-orange.jpg', description: 'A vibrant pastel still life featuring orange tones.' },
        { id: 'town', title: 'Town', category: 'pastel', technique: 'Pastel', size: '70x100cm', year: '2012', image: 'images/Town.jpg', description: 'A pastel painting of an urban scene from Tbilisi private collection.' },
        { id: 'in-city', title: 'In City', category: 'mixed', technique: 'Mixed Media', size: '30x40cm', year: '2011', image: 'images/In-City.jpg', description: 'A mixed media artwork depicting urban life.' },
        { id: 'bottles', title: 'Bottles', category: 'mixed', technique: 'Mixed Media', size: '30x40cm', year: '2011', image: 'images/Bottles.jpg', description: 'A mixed media still life of bottles from Tbilisi private collection.' },
        { id: 'still-life-pastel', title: 'Still Life', category: 'pastel', technique: 'Pastel', size: '70x100cm', year: '2011', image: 'images/still-life-moxatuli-chaidani.jpg', description: 'A classic pastel still life from 2011.' },
        { id: 'sail', title: 'Sail', category: 'pastel', technique: 'Pastel', size: '20x45cm', year: '2009', image: 'images/sail.jpg', description: 'A pastel painting of sailing scene.' },
        { id: 'sparrow', title: 'Sparrow', category: 'pastel', technique: 'Pastel', size: '70x100cm', year: '2012', image: 'images/Sparrow.jpg', description: 'A detailed pastel painting of a sparrow.' },
        { id: 'winter', title: 'Winter', category: 'pastel', technique: 'Pastel', size: '70x100cm', year: '2005', image: 'images/winter.jpg', description: 'An atmospheric pastel painting of winter scene.' },
        { id: 'untitled-strasbourg', title: 'Untitled', category: 'pastel', technique: 'Pastel', size: '90x100cm', year: '2008', image: 'images/untitled_1.jpg', description: 'An abstract pastel work from Strasbourg private collection.' },
        { id: 'with-aquarium', title: 'With Aquarium', category: 'pastel', technique: 'Pastel', size: '70x100cm', year: '2008', image: 'images/With_Aquarium.jpg', description: 'A pastel painting featuring aquarium elements.' },
        { id: 'in-boath', title: 'In Boath', category: 'pastel', technique: 'Pastel', size: '20x30cm', year: '2008', image: 'images/in-boath.jpg', description: 'A pastel painting of boat scene from USA private collection.' },
        { id: 'walk-in-forest', title: 'Walk in Forest', category: 'pastel', technique: 'Pastel', size: '20x30cm', year: '2008', image: 'images/walk-in-forest.jpg', description: 'A pastel painting of forest path.' },
        { id: 'flowers', title: 'Flowers', category: 'oil', technique: 'Oil on Canvas', size: '60x80cm', year: '2003', image: 'images/Flowers.jpg', description: 'A colorful oil painting of flower arrangement from 2003.' },
        { id: 'my-green-space', title: 'My Green Space', category: 'oil', technique: 'Oil on Canvas', size: '60x60cm', year: '2008', image: 'images/My-Green-Space.jpg', description: 'An oil painting of verdant natural space.' },
        { id: 'we', title: 'We', category: 'oil', technique: 'Oil on Canvas', size: '30x30cm', year: '2008', image: 'images/We.jpg', description: 'An intimate oil painting suggesting togetherness.' },
        { id: 'the-bird', title: 'The Bird', category: 'oil', technique: 'Oil on Canvas', size: '50x60cm', year: '2008', image: 'images/the-bird.jpg', description: 'An oil painting featuring a bird.' },
        { id: 'blindly-spring', title: 'Blindly Spring', category: 'oil', technique: 'Oil on Canvas', size: '30x40cm', year: '2008', image: 'images/blindly-spring.jpg', description: 'A spring-themed oil painting from Tbilisi private collection.' },
        { id: 'dream', title: 'Dream', category: 'oil', technique: 'Oil on Canvas', size: '40x50cm', year: '2008', image: 'images/Dream.jpg', description: 'A dreamlike oil painting from 2008.' },
        { id: 'still-life-2008', title: 'Still Life', category: 'oil', technique: 'Oil on Canvas', size: '35x50cm', year: '2008', image: 'images/still-life2.jpg', description: 'A classic still life oil painting from 2008.' },
        { id: 'with-crane', title: 'With Crane', category: 'oil', technique: 'Oil on Canvas', size: '50x60cm', year: '2008', image: 'images/with-crane.jpg', description: 'An oil painting featuring a crane bird.' },
        { id: 'the-flowers', title: 'The Flowers', category: 'oil', technique: 'Oil on Canvas', size: '40x50cm', year: '2008', image: 'images/the-flowers.jpg', description: 'An elegant oil painting of flowers.' },
        { id: 'doll-5', title: 'Doll', category: 'oil', technique: 'Oil on Canvas', size: '20x25cm', year: '2005', image: 'images/doll-5.jpg', description: 'An oil painting of a doll figure.' },
        { id: 'doll-1', title: 'Doll', category: 'oil', technique: 'Oil on Canvas', size: '25x30cm', year: '2005', image: 'images/doll-1.jpg', description: 'An oil painting of a doll from 2005.' },
        { id: 'doll-2', title: 'Doll', category: 'oil', technique: 'Oil on Canvas', size: '25x30cm', year: '2005', image: 'images/doll-2.jpg', description: 'Another doll painting from 2005.' },
        { id: 'doll-4', title: 'Doll', category: 'oil', technique: 'Oil on Canvas', size: '45x67cm', year: '2005', image: 'images/doll-4.jpg', description: 'A larger doll painting from 2005.' },
        { id: 'doll-3', title: 'Doll', category: 'oil', technique: 'Oil on Canvas', size: '45x65cm', year: '2005', image: 'images/doll-3.jpg', description: 'A figurative doll painting from 2005.' },
        { id: 'doll-6', title: 'Doll', category: 'oil', technique: 'Oil on Canvas', size: '45x67cm', year: '2005', image: 'images/doll-6.jpg', description: 'A portrait-oriented doll painting from 2005.' },
        { id: 'folk-instruments', title: 'Folk instruments', category: 'oil', technique: 'Oil on Canvas', size: '20x35cm', year: '2005', image: 'images/folk-instruments.jpg', description: 'An oil painting of traditional Georgian musical instruments.' },
        { id: 'jester', title: 'Jester', category: 'oil', technique: 'Oil on Canvas', size: '40x60cm', year: '2005', image: 'images/Jester.jpg', description: 'A colorful oil painting of a court jester.' },
        { id: 'hedgehog', title: 'Hedgehog', category: 'oil', technique: 'Oil on Canvas', size: '50x70cm', year: '2005', image: 'images/Hedgehog.jpg', description: 'A charming oil painting of a hedgehog from Moscow private collection.' },
        { id: 'cuca', title: 'Cuca', category: 'oil', technique: 'Oil on Canvas', size: '70x100cm', year: '2005', image: 'images/Cuca.jpg', description: 'A large-format oil painting titled Cuca from Moscow private collection.' },
        { id: 'tree', title: 'Tree', category: 'oil', technique: 'Oil on Canvas', size: '40x60cm', year: '2005', image: 'images/Tree.jpg', description: 'An oil painting of a tree from Moscow private collection.' },
        { id: 'tojina', title: 'Doll', category: 'oil', technique: 'Oil on Canvas', size: '90x90cm', year: '2005', image: 'images/tojina.jpg', description: 'A large square-format doll painting from Moscow private collection.' },
        { id: 'thought', title: 'Thought', category: 'oil', technique: 'Oil on Canvas', size: '45x65cm', year: '2005', image: 'images/Thought.jpg', description: 'A contemplative oil painting from Moscow private collection.' },
        { id: 'still-life-moscow', title: 'Still Life', category: 'oil', technique: 'Oil on Canvas', size: '40x60cm', year: '2005', image: 'images/still-life-moscow-private-collection.jpg', description: 'A classic still life oil painting from Moscow private collection.' },
        { id: 'winter-moscow', title: 'Winter', category: 'oil', technique: 'Oil on Canvas', size: '35x55cm', year: '2005', image: 'images/Winter1.jpg', description: 'A winter scene oil painting from Moscow private collection.' },
        { id: 'one-two-three', title: 'One, two, three', category: 'oil', technique: 'Oil on Canvas', size: '35x50cm', year: '2005', image: 'images/One-two-three.jpg', description: 'A sequential composition oil painting from Moscow private collection.' }
    ];

    // State
    let currentArtwork = null;
    let currentIndex = -1;

    // DOM Elements
    let pageLoading = null;
    let imageLoading = null;
    let artworkImage = null;
    let artworkTitle = null;
    let artworkTechnique = null;
    let artworkSize = null;
    let artworkYear = null;
    let artworkCategory = null;
    let artworkDescription = null;
    let breadcrumbName = null;
    let similarWorksGrid = null;
    let navPrev = null;
    let navNext = null;
    let ctaButton = null;

    /**
     * Initialize artwork page
     */
    const initArtworkPage = () => {
        // Cache DOM elements
        cacheElements();

        // Get artwork ID from URL
        const artworkId = getUrlParam('id');

        if (!artworkId) {
            redirectToGallery();
            return;
        }

        // Find artwork in database
        currentIndex = artworkDatabase.findIndex(art => art.id === artworkId);

        if (currentIndex === -1) {
            redirectToGallery();
            return;
        }

        currentArtwork = artworkDatabase[currentIndex];

        // Load artwork details
        loadArtworkDetails();

        // Setup event listeners
        setupEventListeners();

        // Load similar works
        loadSimilarWorks();

        // Hide loading
        hideLoading();
    };

    /**
     * Cache DOM elements
     */
    const cacheElements = () => {
        pageLoading = document.getElementById('page-loading');
        imageLoading = document.getElementById('image-loading');
        artworkImage = document.getElementById('artwork-image');
        artworkTitle = document.getElementById('artwork-title');
        artworkTechnique = document.getElementById('artwork-technique');
        artworkSize = document.getElementById('artwork-size');
        artworkYear = document.getElementById('artwork-year');
        artworkCategory = document.getElementById('artwork-category');
        artworkDescription = document.getElementById('artwork-description');
        breadcrumbName = document.getElementById('breadcrumb-artwork-name');
        similarWorksGrid = document.getElementById('similar-works-grid');
        navPrev = document.getElementById('nav-prev');
        navNext = document.getElementById('nav-next');
        ctaButton = document.getElementById('cta-button');
    };

    /**
     * Load artwork details into the page
     */
    const loadArtworkDetails = () => {
        if (!currentArtwork) return;

        // Update page title
        document.title = `${currentArtwork.title} | Ekaterine Chkuaseli's Art`;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = `${currentArtwork.title} - ${currentArtwork.technique}, ${currentArtwork.size}. ${currentArtwork.description}`;
        }

        // Load image
        if (artworkImage) {
            artworkImage.src = currentArtwork.image;
            artworkImage.alt = currentArtwork.title;
            artworkImage.onload = () => {
                if (imageLoading) imageLoading.style.display = 'none';
            };
        }

        // Update text content
        if (artworkTitle) artworkTitle.textContent = currentArtwork.title;
        if (breadcrumbName) breadcrumbName.textContent = currentArtwork.title;
        if (artworkTechnique) artworkTechnique.textContent = currentArtwork.technique;
        if (artworkSize) artworkSize.textContent = currentArtwork.size;
        if (artworkYear) artworkYear.textContent = currentArtwork.year || 'N/A';
        if (artworkCategory) artworkCategory.textContent = getCategoryName(currentArtwork.category);
        if (artworkDescription) {
            artworkDescription.querySelector('p').textContent = currentArtwork.description;
        }

        // Update CTA button
        if (ctaButton) {
            const subject = encodeURIComponent(`Inquiry about: ${currentArtwork.title}`);
            const body = encodeURIComponent(`Hello Ekaterine,\n\nI am interested in your artwork "${currentArtwork.title}" (${currentArtwork.technique}, ${currentArtwork.size}).\n\nPlease provide more information about availability and pricing.\n\nThank you.`);
            ctaButton.href = `contact.html?subject=${subject}&body=${body}`;
        }

        // Update share buttons
        updateShareButtons();

        // Update navigation visibility
        updateNavigation();
    };

    /**
     * Get category display name
     */
    const getCategoryName = (category) => {
        const names = {
            'oil': 'Oil Painting',
            'ink': 'Ink Drawing',
            'pastel': 'Pastel',
            'mixed': 'Mixed Media'
        };
        return names[category] || category;
    };

    /**
     * Update social share buttons
     */
    const updateShareButtons = () => {
        if (!currentArtwork) return;

        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(`${currentArtwork.title} by Ekaterine Chkuaseli`);
        const description = encodeURIComponent(currentArtwork.description);
        const image = encodeURIComponent(window.location.origin + '/' + currentArtwork.image);

        // Facebook
        const fbBtn = document.getElementById('share-facebook');
        if (fbBtn) {
            fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            fbBtn.target = '_blank';
            fbBtn.rel = 'noopener noreferrer';
        }

        // Twitter
        const twitterBtn = document.getElementById('share-twitter');
        if (twitterBtn) {
            twitterBtn.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            twitterBtn.target = '_blank';
            twitterBtn.rel = 'noopener noreferrer';
        }

        // Pinterest
        const pinterestBtn = document.getElementById('share-pinterest');
        if (pinterestBtn) {
            pinterestBtn.href = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${description}`;
            pinterestBtn.target = '_blank';
            pinterestBtn.rel = 'noopener noreferrer';
        }

        // Email
        const emailBtn = document.getElementById('share-email');
        if (emailBtn) {
            const emailSubject = encodeURIComponent(`Check out this artwork: ${currentArtwork.title}`);
            const emailBody = encodeURIComponent(`I thought you might like this artwork by Ekaterine Chkuaseli:\n\n${currentArtwork.title}\n${currentArtwork.technique}, ${currentArtwork.size}\n\n${window.location.href}`);
            emailBtn.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
        }
    };

    /**
     * Update navigation buttons visibility
     */
    const updateNavigation = () => {
        if (navPrev) {
            navPrev.style.display = currentIndex > 0 ? 'flex' : 'none';
        }
        if (navNext) {
            navNext.style.display = currentIndex < artworkDatabase.length - 1 ? 'flex' : 'none';
        }
    };

    /**
     * Navigate to previous artwork
     */
    const goToPrev = () => {
        if (currentIndex > 0) {
            const prevArtwork = artworkDatabase[currentIndex - 1];
            window.location.href = `artwork.html?id=${prevArtwork.id}`;
        }
    };

    /**
     * Navigate to next artwork
     */
    const goToNext = () => {
        if (currentIndex < artworkDatabase.length - 1) {
            const nextArtwork = artworkDatabase[currentIndex + 1];
            window.location.href = `artwork.html?id=${nextArtwork.id}`;
        }
    };

    /**
     * Load similar works from the same category
     */
    const loadSimilarWorks = () => {
        if (!similarWorksGrid || !currentArtwork) return;

        // Get similar works (same category, excluding current)
        const similar = artworkDatabase
            .filter(art => art.category === currentArtwork.category && art.id !== currentArtwork.id)
            .slice(0, 4);

        if (similar.length === 0) {
            similarWorksGrid.innerHTML = '<p class="no-similar">No similar works found.</p>';
            return;
        }

        similarWorksGrid.innerHTML = similar.map(art => `
            <article class="similar-work-item">
                <a href="artwork.html?id=${art.id}" class="similar-work-link">
                    <div class="similar-work-image">
                        <img src="${art.image}" alt="${art.title}" loading="lazy">
                    </div>
                    <div class="similar-work-info">
                        <h3>${art.title}</h3>
                        <p>${art.technique}, ${art.size}</p>
                    </div>
                </a>
            </article>
        `).join('');
    };

    /**
     * Hide loading overlay
     */
    const hideLoading = () => {
        if (pageLoading) {
            pageLoading.classList.add('hidden');
            setTimeout(() => {
                pageLoading.style.display = 'none';
            }, 300);
        }
    };

    /**
     * Redirect to gallery page
     */
    const redirectToGallery = () => {
        window.location.href = 'gallery.html';
    };

    /**
     * Setup event listeners
     */
    const setupEventListeners = () => {
        // Navigation buttons
        if (navPrev) {
            navPrev.addEventListener('click', goToPrev);
        }
        if (navNext) {
            navNext.addEventListener('click', goToNext);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToPrev();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'Escape') {
                window.location.href = 'gallery.html';
            }
        });

        // Image zoom
        const zoomBtn = document.getElementById('zoom-btn');
        const zoomModal = document.getElementById('image-zoom-modal');
        const zoomClose = document.getElementById('zoom-close');
        const zoomImage = document.getElementById('zoom-image');

        if (zoomBtn && zoomModal) {
            zoomBtn.addEventListener('click', () => {
                if (zoomImage && currentArtwork) {
                    zoomImage.src = currentArtwork.image;
                    zoomImage.alt = currentArtwork.title;
                }
                zoomModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (zoomClose && zoomModal) {
            zoomClose.addEventListener('click', () => {
                zoomModal.classList.remove('active');
                document.body.style.overflow = '';
            });

            zoomModal.addEventListener('click', (e) => {
                if (e.target === zoomModal) {
                    zoomModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    };

    /**
     * Get URL parameter value
     */
    const getUrlParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initArtworkPage);
    } else {
        initArtworkPage();
    }

    // Expose API globally
    window.ArtworkPage = {
        init: initArtworkPage,
        getCurrentArtwork: () => currentArtwork,
        goToPrev,
        goToNext
    };
})();
