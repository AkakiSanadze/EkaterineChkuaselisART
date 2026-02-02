/**
 * Internationalization (i18n) module for Ekaterine Chkuaseli's Art website
 * Provides translations for English, Georgian and Russian languages
 */

(function () {
    'use strict';

    // Translations object
    const translations = {
        en: {
            // Navigation
            nav: {
                home: 'Home',
                gallery: 'Gallery',
                about: 'About',
                contact: 'Contact'
            },

            // Hero Section
            hero: {
                title: 'Thoughts, Colors and Lines',
                subtitle: 'A world of contemporary art reflecting emotions, stories, and human experiences'
            },

            // Gallery Section
            gallery: {
                featuredWorks: 'Featured Works',
                featuredSubtitle: 'A selection of my recent artwork',
                viewGallery: 'View Gallery',
                pageTitle: 'Gallery',
                pageSubtitle: 'A collection of artwork',
                allWorks: 'All Works',
                oilPaintings: 'Oil Paintings',
                inkDrawings: 'Ink Drawings',
                pastel: 'Pastel',
                mixedMedia: 'Mixed Media',
                searchPlaceholder: 'Search by title, technique, or year...',
                sortBy: 'Sort artworks by',
                sortNewest: 'Date: Newest First',
                sortOldest: 'Date: Oldest First',
                sortNameAsc: 'Name: A to Z',
                sortNameDesc: 'Name: Z to A',
                sortSizeDesc: 'Size: Large to Small',
                sortSizeAsc: 'Size: Small to Large',
                activeFilters: 'Active filters:',
                clearAll: 'Clear All',
                loading: 'Loading artworks...',
                noResults: 'No results found',
                noResultsText: 'Try adjusting your search or filters',
                loadMore: 'Load More',
                showing: 'Showing',
                of: 'of',
                artwork: 'artwork',
                artworks: 'artworks',
                breadcrumbHome: 'Home',
                breadcrumbGallery: 'Gallery',
                breadcrumbAllWorks: 'All Works',
                breadcrumbSearch: 'Search'
            },

            // About Section
            about: {
                pageTitle: 'About',
                artistTitle: 'The Artist',
                subtitle: 'An artist from Tbilisi, Georgia.',
                description: "The artist's work is a journey through the world of colors and forms, where each painting reflects emotions, feelings, and life experiences.",
                learnMore: 'Learn More',
                education: 'Education',
                exhibitions: 'Exhibitions',
                educationText: 'Graduated from Tbilisi State Academy of Arts, Faculty of Monumental Painting',
                collections: 'Works are also part of private collections in various countries (Tbilisi, London, Strasbourg, Moscow, Berlin).',
                artistCaption: 'Ekaterine Chkuaseli, Artist'
            },

            // Contact Section
            contact: {
                pageTitle: 'Contact',
                pageSubtitle: 'Get in touch',
                getInTouch: 'Get in Touch',
                contactText: "Interested in the artwork? Have questions or want to discuss a commission?",
                contactButton: 'Contact',
                description: "If you're interested in the artwork, have questions about purchasing, or would like to discuss a commission, please feel free to reach out using the contact information below.",
                email: 'Email',
                location: 'Tbilisi, Georgia',
                sendMessage: 'Send a message'
            },

            // Artwork Detail
            artwork: {
                loading: 'Loading artwork...',
                technique: 'Technique',
                size: 'Size',
                year: 'Year',
                category: 'Category',
                inquire: 'Inquire / Purchase',
                shareTitle: 'Share this artwork',
                similarWorks: 'Similar Works',
                similarSubtitle: 'More artworks from the same category',
                prevArtwork: 'Previous artwork',
                nextArtwork: 'Next artwork',
                backToGallery: 'Back to gallery',
                zoomImage: 'Zoom image',
                closeZoom: 'Close zoom',
                yearNA: 'N/A',
                categories: {
                    oil: 'Oil Painting',
                    ink: 'Ink Drawing',
                    pastel: 'Pastel',
                    mixed: 'Mixed Media'
                }
            },

            // Footer
            footer: {
                navigation: 'Navigation',
                contact: 'Contact',
                artCategories: 'Art Categories',
                copyright: '© 2025 Ekaterine Chkuaseli\'s Art. All rights reserved.'
            },

            // 404 Page
            error404: {
                title: 'Page Not Found',
                message: "Oops! The page you're looking for seems to have vanished like paint on canvas. Don't worry, you can find plenty of beautiful artwork in our gallery.",
                backHome: 'Back to Home',
                viewGallery: 'View Gallery',
                searchTitle: 'Search for artwork',
                searchPlaceholder: 'Search artworks...',
                popularPages: 'Popular Pages'
            },

            // Lightbox
            lightbox: {
                close: 'Close artwork viewer',
                prev: 'View previous artwork',
                next: 'View next artwork',
                share: 'Share:',
                counter: 'of'
            },

            // Accessibility
            accessibility: {
                skipToContent: 'Skip to main content',
                backToTop: 'Back to top',
                mainNavigation: 'Main navigation',
                breadcrumbNav: 'Breadcrumb navigation',
                slideNav: 'Slide navigation',
                carousel: 'Featured artworks',
                galleryRegion: 'Artwork collection'
            }
        },

        ka: {
            // Navigation
            nav: {
                home: 'მთავარი',
                gallery: 'გალერეა',
                about: 'ჩემს შესახებ',
                contact: 'კონტაქტი'
            },

            // Hero Section
            hero: {
                title: 'ფიქრები, ფერები და ხაზები',
                subtitle: 'თანამედროვე ხელოვნების სამყარო, რომელიც ასახავს ემოციებს, ისტორიებსა და ადამიანურ გამოცდილებებს'
            },

            // Gallery Section
            gallery: {
                featuredWorks: 'რჩეული ნამუშევრები',
                featuredSubtitle: 'ჩემი უახლესი ნამუშევრების შერჩევა',
                viewGallery: 'გალერეის ნახვა',
                pageTitle: 'გალერეა',
                pageSubtitle: 'ნამუშევრების კოლექცია',
                allWorks: 'ყველა ნამუშევარი',
                oilPaintings: 'ზეთის სურათები',
                inkDrawings: 'მელნის ნახატები',
                pastel: 'პასტელი',
                mixedMedia: 'შერეული ტექნიკა',
                searchPlaceholder: 'ძიება სახელით, ტექნიკით ან წლით...',
                sortBy: 'დალაგება',
                sortNewest: 'თარიღი: უახლესი ჯერ',
                sortOldest: 'თარიღი: ძველი ჯერ',
                sortNameAsc: 'სახელი: ა-დან ჰ-მდე',
                sortNameDesc: 'სახელი: ჰ-დან ა-მდე',
                sortSizeDesc: 'ზომა: დიდიდან პატარამდე',
                sortSizeAsc: 'ზომა: პატარადან დიდამდე',
                activeFilters: 'აქტიური ფილტრები:',
                clearAll: 'ფილტრების გასუფთავება',
                loading: 'ნამუშევრების ჩატვირთვა...',
                noResults: 'შედეგები ვერ მოიძებნა',
                noResultsText: 'სცადეთ ძიების ან ფილტრების შეცვლა',
                loadMore: 'მეტის ჩატვირთვა',
                showing: 'ნაჩვენებია',
                of: 'სულ',
                artwork: 'ნამუშევარი',
                artworks: 'ნამუშევარი',
                breadcrumbHome: 'მთავარი',
                breadcrumbGallery: 'გალერეა',
                breadcrumbAllWorks: 'ყველა ნამუშევარი',
                breadcrumbSearch: 'ძიება'
            },

            // About Section
            about: {
                pageTitle: 'ჩემს შესახებ',
                artistTitle: 'მხატვარი',
                subtitle: 'მხატვარი თბილისიდან, საქართველო.',
                description: 'მხატვრის ნამუშევრები მოგზაურობაა ფერებისა და ფორმების სამყაროში, სადაც თითოეული ნახატი ასახავს ემოციებს, გრძნობებსა და ცხოვრებისეულ გამოცდილებებს.',
                learnMore: 'მეტის ნახვა',
                education: 'განათლება',
                exhibitions: 'გამოფენები',
                educationText: 'დამთავრებული აქვს თბილისის სახელმწიფო სამხატვრო აკადემია, მონუმენტური მხატვრობის ფაკულტეტი',
                collections: 'ნამუშევრები ასევე ინახება კერძო კოლექციებში სხვადასხვა ქვეყანაში (თბილისი, ლონდონი, სტრასბურგი, მოსკოვი, ბერლინი).',
                artistCaption: 'ეკატერინე ჭყუასელი, მხატვარი'
            },

            // Contact Section
            contact: {
                pageTitle: 'კონტაქტი',
                pageSubtitle: 'დაგვიკავშირდით',
                getInTouch: 'დაგვიკავშირდით',
                contactText: 'ინტერესდებით ნამუშევრებით? გაქვთ კითხვები ან გსურთ შეკვეთის განხილვა?',
                contactButton: 'დაკავშირება',
                description: 'თუ ინტერესდებით ნამუშევრებით, გაქვთ კითხვები შეძენის შესახებ ან გსურთ შეკვეთის განხილვა, გთხოვთ, დაგვიკავშირდეთ ქვემოთ მოცემული საკონტაქტო ინფორმაციის გამოყენებით.',
                email: 'ელფოსტა',
                location: 'თბილისი, საქართველო',
                sendMessage: 'შეტყობინების გაგზავნა'
            },

            // Artwork Detail
            artwork: {
                loading: 'ნამუშევრის ჩატვირთვა...',
                technique: 'ტექნიკა',
                size: 'ზომა',
                year: 'წელი',
                category: 'კატეგორია',
                inquire: 'შეკვეთა / შეძენა',
                shareTitle: 'ნამუშევრის გაზიარება',
                similarWorks: 'მსგავსი ნამუშევრები',
                similarSubtitle: 'მეტი ნამუშევარი იგივე კატეგორიიდან',
                prevArtwork: 'წინა ნამუშევარი',
                nextArtwork: 'შემდეგი ნამუშევარი',
                backToGallery: 'გალერეაში დაბრუნება',
                zoomImage: 'გადიდება',
                closeZoom: 'დახურვა',
                yearNA: 'არ არის მითითებული',
                categories: {
                    oil: 'ზეთის სურათი',
                    ink: 'მელნის ნახატი',
                    pastel: 'პასტელი',
                    mixed: 'შერეული ტექნიკა'
                }
            },

            // Footer
            footer: {
                navigation: 'ნავიგაცია',
                contact: 'კონტაქტი',
                artCategories: 'ხელოვნების კატეგორიები',
                copyright: '© 2025 ეკატერინე ჭყუასელის ხელოვნება. ყველა უფლება დაცულია.'
            },

            // 404 Page
            error404: {
                title: 'გვერდი ვერ მოიძებნა',
                message: 'უპს! გვერდი, რომელსაც ეძებთ, ფერწერასავით გაქრა. არ ინერვიულოთ, ჩვენს გალერეაში ბევრი მშვენიერი ნამუშევარია.',
                backHome: 'მთავარზე დაბრუნება',
                viewGallery: 'გალერეის ნახვა',
                searchTitle: 'ნამუშევრის ძიება',
                searchPlaceholder: 'ნამუშევრების ძიება...',
                popularPages: 'პოპულარული გვერდები'
            },

            // Lightbox
            lightbox: {
                close: 'ნახატის დამთვალიერებლის დახურვა',
                prev: 'წინა ნამუშევრის ნახვა',
                next: 'შემდეგი ნამუშევრის ნახვა',
                share: 'გაზიარება:',
                counter: 'სულ'
            },

            // Accessibility
            accessibility: {
                skipToContent: 'ძირითად შინაარსზე გადასვლა',
                backToTop: 'ზემოთ დაბრუნება',
                mainNavigation: 'მთავარი ნავიგაცია',
                breadcrumbNav: 'ნავიგაციის ბმულები',
                slideNav: 'სლაიდების ნავიგაცია',
                carousel: 'რჩეული ნამუშევრები',
                galleryRegion: 'ნამუშევრების კოლექცია'
            }
        },

        ru: {
            // Navigation
            nav: {
                home: 'Главная',
                gallery: 'Галерея',
                about: 'О художнике',
                contact: 'Контакты'
            },

            // Hero Section
            hero: {
                title: 'Мысли, Цвета и Линии',
                subtitle: 'Мир современного искусства, отражающий эмоции, истории и человеческий опыт'
            },

            // Gallery Section
            gallery: {
                featuredWorks: 'Избранные работы',
                featuredSubtitle: 'Подборка моих недавних произведений',
                viewGallery: 'Смотреть галерею',
                pageTitle: 'Галерея',
                pageSubtitle: 'Коллекция произведений',
                allWorks: 'Все работы',
                oilPaintings: 'Картины маслом',
                inkDrawings: 'Рисунки тушью',
                pastel: 'Пастель',
                mixedMedia: 'Смешанная техника',
                searchPlaceholder: 'Поиск по названию, технике или году...',
                sortBy: 'Сортировка',
                sortNewest: 'Дата: сначала новые',
                sortOldest: 'Дата: сначала старые',
                sortNameAsc: 'Название: А до Я',
                sortNameDesc: 'Название: Я до А',
                sortSizeDesc: 'Размер: от большого к малому',
                sortSizeAsc: 'Размер: от малого к большому',
                activeFilters: 'Активные фильтры:',
                clearAll: 'Сбросить фильтры',
                loading: 'Загрузка произведений...',
                noResults: 'Результаты не найдены',
                noResultsText: 'Попробуйте изменить параметры поиска или фильтры',
                loadMore: 'Загрузить еще',
                showing: 'Показано',
                of: 'из',
                artwork: 'произведение',
                artworks: 'произведений',
                breadcrumbHome: 'Главная',
                breadcrumbGallery: 'Галерея',
                breadcrumbAllWorks: 'Все работы',
                breadcrumbSearch: 'Поиск'
            },

            // About Section
            about: {
                pageTitle: 'О художнике',
                artistTitle: 'Художник',
                subtitle: 'Художник из Тбилиси, Грузия.',
                description: 'Работы художника — это путешествие в мир цветов и форм, где каждая картина отражает эмоции, чувства и жизненный опыт.',
                learnMore: 'Подробнее',
                education: 'Образование',
                exhibitions: 'Выставки',
                educationText: 'Окончила Тбилисскую государственную академию искусств, факультет монументальной живописи',
                collections: 'Работы также находятся в частных коллекциях в различных странах (Тбилиси, Лондон, Страсбург, Москва, Берлин).',
                artistCaption: 'Екатерина Чкуасели, Художник'
            },

            // Contact Section
            contact: {
                pageTitle: 'Контакты',
                pageSubtitle: 'Связаться',
                getInTouch: 'Связаться',
                contactText: 'Интересуют произведения? Есть вопросы или хотите обсудить заказ?',
                contactButton: 'Связаться',
                description: 'Если вас интересуют произведения, у вас есть вопросы о покупке или вы хотите обсудить заказ, пожалуйста, свяжитесь со мной, используя контактную информацию ниже.',
                email: 'Эл. почта',
                location: 'Тбилиси, Грузия',
                sendMessage: 'Отправить сообщение'
            },

            // Artwork Detail
            artwork: {
                loading: 'Загрузка произведения...',
                technique: 'Техника',
                size: 'Размер',
                year: 'Год',
                category: 'Категория',
                inquire: 'Заказать / Купить',
                shareTitle: 'Поделиться произведением',
                similarWorks: 'Похожие работы',
                similarSubtitle: 'Больше произведений из той же категории',
                prevArtwork: 'Предыдущее произведение',
                nextArtwork: 'Следующее произведение',
                backToGallery: 'Вернуться в галерею',
                zoomImage: 'Увеличить',
                closeZoom: 'Закрыть',
                yearNA: 'Н/Д',
                categories: {
                    oil: 'Масляная живопись',
                    ink: 'Рисунок тушью',
                    pastel: 'Пастель',
                    mixed: 'Смешанная техника'
                }
            },

            // Footer
            footer: {
                navigation: 'Навигация',
                contact: 'Контакты',
                artCategories: 'Категории искусства',
                copyright: '© 2025 Искусство Екатерины Чкуасели. Все права защищены.'
            },

            // 404 Page
            error404: {
                title: 'Страница не найдена',
                message: 'Упс! Страница, которую вы ищете, исчезла, как краски на холсте. Не волнуйтесь, в нашей галерее много прекрасных произведений.',
                backHome: 'На главную',
                viewGallery: 'Смотреть галерею',
                searchTitle: 'Поиск произведений',
                searchPlaceholder: 'Поиск произведений...',
                popularPages: 'Популярные страницы'
            },

            // Lightbox
            lightbox: {
                close: 'Закрыть просмотр',
                prev: 'Предыдущее произведение',
                next: 'Следующее произведение',
                share: 'Поделиться:',
                counter: 'из'
            },

            // Accessibility
            accessibility: {
                skipToContent: 'Перейти к основному содержанию',
                backToTop: 'Наверх',
                mainNavigation: 'Главная навигация',
                breadcrumbNav: 'Хлебные крошки',
                slideNav: 'Навигация по слайдам',
                carousel: 'Избранные произведения',
                galleryRegion: 'Коллекция произведений'
            }
        }
    };

    // Current language
    let currentLang = document.documentElement.lang || 'en';

    /**
     * Get current language
     * @returns {string} - Current language code ('en', 'ka' or 'ru')
     */
    const getCurrentLang = () => currentLang;

    /**
     * Set current language
     * @param {string} lang - Language code ('en', 'ka' or 'ru')
     */
    const setLanguage = (lang) => {
        if (translations[lang]) {
            currentLang = lang;
            localStorage.setItem('siteLanguage', lang);
            document.documentElement.lang = lang;
            return true;
        }
        return false;
    };

    /**
     * Get translation by key path
     * @param {string} keyPath - Dot-separated key path (e.g., 'nav.home')
     * @param {string} lang - Language code (optional, defaults to current)
     * @returns {string} - Translated text or key path if not found
     */
    const t = (keyPath, lang = currentLang) => {
        const keys = keyPath.split('.');
        let value = translations[lang];

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                // Fallback to English if translation not found
                if (lang !== 'en') {
                    return t(keyPath, 'en');
                }
                return keyPath;
            }
        }

        return value;
    };

    /**
     * Get all translations for a specific section
     * @param {string} section - Section name (e.g., 'nav', 'gallery')
     * @param {string} lang - Language code (optional)
     * @returns {object} - Object containing translations for the section
     */
    const getSection = (section, lang = currentLang) => {
        return translations[lang]?.[section] || translations['en']?.[section] || {};
    };

    /**
     * Initialize language switcher UI
     */
    const initLanguageSwitcher = () => {
        const switcher = document.querySelector('.language-switcher');
        if (!switcher) return;

        const enBtn = switcher.querySelector('[data-lang="en"]');
        const kaBtn = switcher.querySelector('[data-lang="ka"]');
        const ruBtn = switcher.querySelector('[data-lang="ru"]');

        // Set initial active state
        updateSwitcherUI();

        // Add click handlers
        if (enBtn) {
            enBtn.addEventListener('click', (e) => {
                e.preventDefault();
                switchLanguage('en');
            });
        }

        if (kaBtn) {
            kaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                switchLanguage('ka');
            });
        }

        if (ruBtn) {
            ruBtn.addEventListener('click', (e) => {
                e.preventDefault();
                switchLanguage('ru');
            });
        }
    };

    /**
     * Update language switcher UI
     */
    const updateSwitcherUI = () => {
        const switcher = document.querySelector('.language-switcher');
        if (!switcher) return;

        const buttons = switcher.querySelectorAll('button, a');
        buttons.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === currentLang) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'true');
            } else {
                btn.classList.remove('active');
                btn.removeAttribute('aria-current');
            }
        });
    };

    /**
     * Switch language and redirect to appropriate page
     * @param {string} lang - Target language code
     */
    const switchLanguage = (lang) => {
        if (lang === currentLang) return;

        setLanguage(lang);
        updateSwitcherUI();

        // Get current page filename
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';

        // Determine target page
        let targetFile;

        // Extract base name without language suffix
        let baseName = currentFile;
        if (currentFile.endsWith('-ka.html')) {
            baseName = currentFile.replace('-ka.html', '.html');
        } else if (currentFile.endsWith('-ru.html')) {
            baseName = currentFile.replace('-ru.html', '.html');
        }

        if (lang === 'ka') {
            // Switch to Georgian version
            if (baseName === 'index.html') {
                targetFile = 'index-ka.html';
            } else if (baseName.endsWith('.html')) {
                targetFile = baseName.replace('.html', '-ka.html');
            } else {
                targetFile = baseName + '-ka.html';
            }
        } else if (lang === 'ru') {
            // Switch to Russian version
            if (baseName === 'index.html') {
                targetFile = 'index-ru.html';
            } else if (baseName.endsWith('.html')) {
                targetFile = baseName.replace('.html', '-ru.html');
            } else {
                targetFile = baseName + '-ru.html';
            }
        } else {
            // Switch to English version
            targetFile = baseName;
        }

        // Preserve query parameters
        const queryString = window.location.search;
        const targetUrl = targetFile + queryString;

        // Navigate to target page
        window.location.href = targetUrl;
    };

    /**
     * Auto-detect and set language on page load
     */
    const autoDetectLanguage = () => {
        // Source of truth is the HTML lang attribute set in the static file
        const htmlLang = document.documentElement.lang;

        if (htmlLang && translations[htmlLang]) {
            currentLang = htmlLang;
        } else {
            // Fallback if not set or invalid
            currentLang = 'en';
        }

        // Update localStorage to match current page
        localStorage.setItem('siteLanguage', currentLang);
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            autoDetectLanguage();
            initLanguageSwitcher();
        });
    } else {
        autoDetectLanguage();
        initLanguageSwitcher();
    }

    // Expose API globally
    window.i18n = {
        t: t,
        get: t,
        getSection: getSection,
        setLanguage: setLanguage,
        getCurrentLang: getCurrentLang,
        switchLanguage: switchLanguage,
        translations: translations
    };

})();
