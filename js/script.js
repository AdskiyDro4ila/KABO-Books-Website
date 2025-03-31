document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const selectedFlag = document.getElementById('selectedFlag');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langFlags = document.querySelectorAll('.lang-dropdown img');
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu');

    // Comprehensive translations object
    const translations = {
        en: {
            welcome: {
                title: "Find your next great read",
                subtitle: "Ask our AI assistant for personalized book recommendations"
            },
            chat: {
                placeholder: "What book are you looking for?...",
                botGreeting: "Hello! I'm your KABO Books assistant. How can I help you find your next great read today?"
            },
            footer: {
                copyright: "© 2025 KABO Books. All rights reserved."
            }
        },
        de: {
            welcome: {
                title: "Finden Sie Ihr nächstes Lieblingsbuch",
                subtitle: "Lassen Sie sich von unserem KI-Assistenten persönliche Buchempfehlungen geben"
            },
            chat: {
                placeholder: "Nach welchem Buch suchen Sie?...",
                botGreeting: "Hallo! Ich bin Ihr KABO Books Assistent. Wie kann ich Ihnen helfen, Ihr nächstes Lieblingsbuch zu finden?"
            },
            footer: {
                copyright: "© 2025 KABO Books. Alle Rechte vorbehalten."
            }
        },
        es: {
            welcome: {
                title: "Encuentra tu próxima gran lectura",
                subtitle: "Pide recomendaciones personalizadas de libros a nuestro asistente de IA"
            },
            chat: {
                placeholder: "¿Qué libro estás buscando?...",
                botGreeting: "¡Hola! Soy tu asistente de KABO Books. ¿Cómo puedo ayudarte a encontrar tu próxima gran lectura?"
            },
            footer: {
                copyright: "© 2025 KABO Books. Todos los derechos reservados."
            }
        },
        ru: {
            welcome: {
                title: "Найдите свою следующую отличную книгу",
                subtitle: "Получите персонализированные рекомендации книг от нашего ИИ-ассистента"
            },
            chat: {
                placeholder: "Какую книгу вы ищете?...",
                botGreeting: "Привет! Я ваш ассистент KABO Books. Как я могу помочь вам найти следующую отличную книгу?"
            },
            footer: {
                copyright: "© 2025 KABO Books. Все права защищены."
            }
        }
    };

    // Function to update all translations
    function updateTranslations(lang) {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const keys = key.split('.');
            let value = translations[lang];
            
            for (const k of keys) {
                value = value[k];
            }
            
            if (value) {
                element.textContent = value;
            }
        });

        // Update chat placeholder
        userInput.placeholder = translations[lang].chat.placeholder;
    }

    // Language selection
    selectedFlag.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
        menuButton.classList.remove('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        langDropdown.classList.remove('active');
    });

    // Hamburger menu toggle
    menuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        langDropdown.classList.remove('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuButton.contains(e.target)) {
            navMenu.classList.remove('active');
            menuButton.classList.remove('active');
            langDropdown.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            menuButton.classList.remove('active');
            langDropdown.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle language selection
    langFlags.forEach(flag => {
        flag.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.dataset.lang;
            selectedFlag.src = this.src;
            selectedFlag.alt = this.alt;
            langDropdown.classList.remove('active');
            
            // Update all translations
            updateTranslations(lang);
        });
    });

    // Add initial bot message
    addMessage(translations.en.chat.botGreeting, 'bot');

    // Event listeners
    sendButton.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage(message, 'user');
        userInput.value = '';

        setTimeout(() => {
            simulateBotResponse(message);
        }, 1000);
    }

    function addMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateBotResponse(message) {
        const responses = [
            "I understand you're looking for a book. Could you tell me more about your preferences?",
            "That's interesting! What genres do you typically enjoy?",
            "I can help you find the perfect book. What's your favorite author?",
            "Let me help you discover something new. What was the last book you really enjoyed?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'bot');
    }
}); 