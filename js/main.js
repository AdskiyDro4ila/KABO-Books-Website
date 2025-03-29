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
}); 