document.addEventListener('DOMContentLoaded', function() {
    // Menu functionality
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu');
    
    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuButton.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
    
    // Language selector functionality
    const languageFlag = document.getElementById('languageFlag');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Translations object
    const translations = {
        en: {
            searchPlaceholder: "What book are you looking for?",
            home: "Home",
            categories: "Categories",
            newArrivals: "New Arrivals",
            bestSellers: "Best Sellers",
            aboutUs: "About Us",
            contact: "Contact"
        },
        de: {
            searchPlaceholder: "Nach welchem Buch suchen Sie?",
            home: "Startseite",
            categories: "Kategorien",
            newArrivals: "Neuerscheinungen",
            bestSellers: "Bestseller",
            aboutUs: "Über uns",
            contact: "Kontakt"
        },
        es: {
            searchPlaceholder: "¿Qué libro estás buscando?",
            home: "Inicio",
            categories: "Categorías",
            newArrivals: "Novedades",
            bestSellers: "Más vendidos",
            aboutUs: "Sobre nosotros",
            contact: "Contacto"
        },
        ru: {
            searchPlaceholder: "Какую книгу вы ищете?",
            home: "Главная",
            categories: "Категории",
            newArrivals: "Новинки",
            bestSellers: "Бестселлеры",
            aboutUs: "О нас",
            contact: "Контакты"
        }
    };
    
    // Toggle language dropdown
    languageFlag.addEventListener('click', function(event) {
        event.stopPropagation();
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!languageDropdown.contains(event.target) && !languageFlag.contains(event.target)) {
            languageDropdown.classList.remove('active');
        }
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            const selectedFlag = this.querySelector('img').src;
            
            // Update flag and close dropdown
            languageFlag.src = selectedFlag;
            languageDropdown.classList.remove('active');
            
            // Update translations
            updateTranslations(selectedLang);
        });
    });
    
    // Function to update translations
    function updateTranslations(lang) {
        // Update search placeholder
        const searchInput = document.querySelector('.search-input');
        searchInput.placeholder = translations[lang].searchPlaceholder;
        
        // Update navigation menu items
        const navItems = document.querySelectorAll('.nav-menu a');
        navItems[0].textContent = translations[lang].home;
        navItems[1].textContent = translations[lang].categories;
        navItems[2].textContent = translations[lang].newArrivals;
        navItems[3].textContent = translations[lang].bestSellers;
        navItems[4].textContent = translations[lang].aboutUs;
        navItems[5].textContent = translations[lang].contact;
    }
    
    // Search functionality
    const searchForm = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-input');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Here you would typically make an API call to search for books
            console.log('Searching for:', searchTerm);
            // For now, we'll just show an alert
            alert('Search functionality will be implemented here. You searched for: ' + searchTerm);
        }
    });

    // Cookie Consent Management
    if (!localStorage.getItem('cookieConsent')) {
        showCookieConsent();
    } else {
        initializeCookies();
    }

    initializeCookieSettings();
});

function showCookieConsent() {
    const cookieBanner = document.getElementById('cookie-consent');
    if (cookieBanner) {
        cookieBanner.style.display = 'block';
    }
}

function initializeCookieSettings() {
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const acceptNecessaryBtn = document.getElementById('cookie-accept-necessary');
    const settingsBtn = document.getElementById('cookie-settings');
    const modal = document.getElementById('cookie-settings-modal');
    const closeBtn = document.querySelector('.close-modal');

    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', () => {
            acceptAllCookies();
            hideCookieConsent();
        });
    }

    if (acceptNecessaryBtn) {
        acceptNecessaryBtn.addEventListener('click', () => {
            acceptNecessaryCookies();
            hideCookieConsent();
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showCookieSettings();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideCookieSettings();
        });
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideCookieSettings();
            }
        });
    }
}

function acceptAllCookies() {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('analyticsCookies', 'true');
    localStorage.setItem('marketingCookies', 'true');
    localStorage.setItem('functionalCookies', 'true');
    initializeCookies();
}

function acceptNecessaryCookies() {
    localStorage.setItem('cookieConsent', 'necessary');
    localStorage.setItem('analyticsCookies', 'false');
    localStorage.setItem('marketingCookies', 'false');
    localStorage.setItem('functionalCookies', 'false');
    initializeCookies();
}

function showCookieSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function hideCookieSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function hideCookieConsent() {
    const cookieBanner = document.getElementById('cookie-consent');
    if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }
}

function initializeCookies() {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'all') {
        // Initialize all cookies
        initializeAnalytics();
        initializeMarketing();
        initializeFunctional();
    } else if (consent === 'necessary') {
        // Initialize only necessary cookies
        initializeNecessary();
    } else if (consent === 'custom') {
        if (localStorage.getItem('analyticsCookies') === 'true') {
            initializeAnalytics();
        }
        if (localStorage.getItem('marketingCookies') === 'true') {
            initializeMarketing();
        }
        if (localStorage.getItem('functionalCookies') === 'true') {
            initializeFunctional();
        }
    }
}

function initializeNecessary() {
    // Initialize only essential cookies required for website functionality
    console.log('Initializing necessary cookies');
}

function initializeAnalytics() {
    // Initialize analytics cookies (e.g., Google Analytics)
    console.log('Initializing analytics cookies');
}

function initializeMarketing() {
    // Initialize marketing cookies
    console.log('Initializing marketing cookies');
}

function initializeFunctional() {
    // Initialize functional cookies
    console.log('Initializing functional cookies');
}

// Newsletter Subscription with GDPR Compliance
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                subscribeToNewsletter(email);
            }
        });
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function subscribeToNewsletter(email) {
    // Here you would typically send this to your backend
    // For now, we'll just show a success message
    const form = document.querySelector('.newsletter-form');
    const successMessage = document.createElement('p');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for subscribing! You will receive a confirmation email shortly.';
    form.appendChild(successMessage);
    
    // Clear the form
    form.reset();
    
    // Remove the success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Language Selection
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageSelector && languageDropdown) {
        languageSelector.addEventListener('click', function() {
            languageDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageSelector.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });

        // Handle language selection
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                changeLanguage(selectedLang);
            });
        });
    }
});

function changeLanguage(lang) {
    // Here you would implement language switching logic
    console.log('Changing language to:', lang);
    // Update the flag
    const flag = document.getElementById('languageFlag');
    if (flag) {
        flag.src = `https://flagcdn.com/w80/${getFlagCode(lang)}.png`;
    }
}

function getFlagCode(lang) {
    const flagCodes = {
        'en': 'gb',
        'de': 'de',
        'es': 'es',
        'ru': 'ru'
    };
    return flagCodes[lang] || 'gb';
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});

// Hamburger menu functionality
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', function() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
});

// Filter chips functionality
const chips = document.querySelectorAll('.chip');

chips.forEach(chip => {
    chip.addEventListener('click', function() {
        // Remove active class from all chips
        chips.forEach(c => c.classList.remove('active'));
        // Add active class to clicked chip
        this.classList.add('active');
    });
});

// Accept all cookies
document.getElementById('cookie-accept-all').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'all');
    hideCookieConsent();
    initializeCookies();
});

// Accept only necessary cookies
document.getElementById('cookie-accept-necessary').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'necessary');
    hideCookieConsent();
    initializeCookies();
});

// Show cookie settings modal
document.getElementById('cookie-settings').addEventListener('click', function() {
    const modal = document.getElementById('cookie-settings-modal');
    modal.style.display = 'block';
});

// Close cookie settings modal
document.querySelector('.close-modal').addEventListener('click', function() {
    const modal = document.getElementById('cookie-settings-modal');
    modal.style.display = 'none';
});

// Save cookie settings
document.getElementById('save-cookie-settings').addEventListener('click', function() {
    const analytics = document.getElementById('analytics-cookies').checked;
    const marketing = document.getElementById('marketing-cookies').checked;
    const functional = document.getElementById('functional-cookies').checked;
    
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('analyticsCookies', analytics);
    localStorage.setItem('marketingCookies', marketing);
    localStorage.setItem('functionalCookies', functional);
    
    const modal = document.getElementById('cookie-settings-modal');
    modal.style.display = 'none';
    hideCookieConsent();
    initializeCookies();
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Implement search functionality here
            console.log('Searching for:', searchTerm);
        }
    }
}); 