// Cookie Banner Implementation
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const banner = document.getElementById('cookie-consent-banner');
  const preferencesModal = document.getElementById('cookie-preferences-modal');
  const settingsLink = document.getElementById('cookie-settings-link');
  const languageSelect = document.getElementById('language-select');
  
  const acceptBtn = document.querySelector('.cookie-accept-btn');
  const declineBtn = document.querySelector('.cookie-decline-btn');
  const preferencesBtn = document.querySelector('.cookie-preferences-btn');
  const closeModalBtn = document.querySelector('.cookie-close-btn');
  const savePreferencesBtn = document.querySelector('.cookie-save-preferences-btn');
  
  const analyticsCheckbox = document.getElementById('analytics-cookies');
  const marketingCheckbox = document.getElementById('marketing-cookies');

  // Language translations
  const translations = {
    en: {
      title: "Cookie Consent",
      text: "We use cookies to improve your experience on our website. Some cookies are necessary for the website to function properly. Others help us analyze how the site is used and can be used for marketing purposes. You can choose which cookies you want to allow.",
      accept: "Accept All",
      decline: "Decline Non-Essential",
      preferences: "Edit Preferences",
      preferencesTitle: "Cookie Preferences",
      necessaryTitle: "Necessary Cookies",
      necessaryDescription: "These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
      analyticsTitle: "Analytics Cookies",
      analyticsDescription: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.",
      marketingTitle: "Marketing Cookies",
      marketingDescription: "These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
      save: "Save Preferences",
      settings: "Cookie Settings"
    },
    ru: {
      title: "Согласие на использование файлов cookie",
      text: "Мы используем файлы cookie для улучшения вашего опыта на нашем сайте. Некоторые файлы cookie необходимы для правильного функционирования сайта. Другие помогают нам анализировать, как используется сайт, и могут использоваться в маркетинговых целях. Вы можете выбрать, какие файлы cookie вы хотите разрешить.",
      accept: "Принять все",
      decline: "Отклонить необязательные",
      preferences: "Изменить настройки",
      preferencesTitle: "Настройки файлов cookie",
      necessaryTitle: "Необходимые файлы cookie",
      necessaryDescription: "Эти файлы cookie необходимы для правильного функционирования веб-сайта. Они обеспечивают основные функции, такие как навигация по страницам и доступ к защищенным разделам веб-сайта. Веб-сайт не может функционировать должным образом без этих файлов cookie.",
      analyticsTitle: "Аналитические файлы cookie",
      analyticsDescription: "Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим веб-сайтом, собирая и сообщая информацию анонимно. Это помогает нам улучшить наш веб-сайт и ваш опыт.",
      marketingTitle: "Маркетинговые файлы cookie",
      marketingDescription: "Эти файлы cookie используются для отслеживания посетителей на веб-сайтах. Цель состоит в том, чтобы отображать рекламу, которая актуальна и привлекательна для отдельного пользователя.",
      save: "Сохранить настройки",
      settings: "Настройки cookie"
    },
    de: {
      title: "Cookie-Einwilligung",
      text: "Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Einige Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Andere helfen uns zu analysieren, wie die Website genutzt wird, und können für Marketingzwecke verwendet werden. Sie können wählen, welche Cookies Sie zulassen möchten.",
      accept: "Alle akzeptieren",
      decline: "Nicht-wesentliche ablehnen",
      preferences: "Einstellungen bearbeiten",
      preferencesTitle: "Cookie-Einstellungen",
      necessaryTitle: "Notwendige Cookies",
      necessaryDescription: "Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie ermöglichen grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche der Website. Die Website kann ohne diese Cookies nicht richtig funktionieren.",
      analyticsTitle: "Analyse-Cookies",
      analyticsDescription: "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie anonym Informationen sammeln und melden. Dies hilft uns, unsere Website und Ihre Erfahrung zu verbessern.",
      marketingTitle: "Marketing-Cookies",
      marketingDescription: "Diese Cookies werden verwendet, um Besucher über Websites hinweg zu verfolgen. Die Absicht ist, Anzeigen zu schalten, die für den einzelnen Benutzer relevant und ansprechend sind.",
      save: "Einstellungen speichern",
      settings: "Cookie-Einstellungen"
    },
    es: {
      title: "Consentimiento de cookies",
      text: "Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Algunas cookies son necesarias para que el sitio web funcione correctamente. Otras nos ayudan a analizar cómo se utiliza el sitio y pueden utilizarse con fines de marketing. Puede elegir qué cookies desea permitir.",
      accept: "Aceptar todas",
      decline: "Rechazar no esenciales",
      preferences: "Editar preferencias",
      preferencesTitle: "Preferencias de cookies",
      necessaryTitle: "Cookies necesarias",
      necessaryDescription: "Estas cookies son esenciales para que el sitio web funcione correctamente. Permiten funciones básicas como la navegación de páginas y el acceso a áreas seguras del sitio web. El sitio web no puede funcionar correctamente sin estas cookies.",
      analyticsTitle: "Cookies analíticas",
      analyticsDescription: "Estas cookies nos ayudan a comprender cómo los visitantes interactúan con nuestro sitio web mediante la recopilación y el informe de información de forma anónima. Esto nos ayuda a mejorar nuestro sitio web y su experiencia.",
      marketingTitle: "Cookies de marketing",
      marketingDescription: "Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.",
      save: "Guardar preferencias",
      settings: "Configuración de cookies"
    }
  };

  // Initialize language
  function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    
    if (translations[shortLang]) {
      return shortLang;
    }
    return 'en'; // Default language
  }

  // Set current language based on browser or saved preference
  let currentLang = localStorage.getItem('cookieConsentLanguage') || detectLanguage();
  languageSelect.value = currentLang;

  // Apply translations
  function applyTranslations() {
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang-key');
      if (translations[currentLang] && translations[currentLang][key]) {
        element.textContent = translations[currentLang][key];
      }
    });
  }

  // Check if consent has been given
  function checkConsent() {
    const cookieConsent = getCookie('cookieConsent');
    if (cookieConsent) {
      const consentData = JSON.parse(cookieConsent);
      applyConsent(consentData);
      banner.classList.remove('show');
      settingsLink.classList.add('show');
      
      // Set checkbox states
      analyticsCheckbox.checked = consentData.analytics || false;
      marketingCheckbox.checked = consentData.marketing || false;
    } else {
      // Show banner with a slight delay
      setTimeout(() => {
        banner.classList.add('show');
      }, 1000);
    }
  }

  // Apply consent settings
  function applyConsent(consentData) {
    // Always set necessary cookies
    // setNecessaryCookies();
    
    // Set other cookies only if consent given
    if (consentData.analytics) {
      // setAnalyticsCookies();
      console.log("Analytics cookies enabled");
      // Here you would normally initialize analytics scripts
      // For example: initializeAnalytics();
    }
    
    if (consentData.marketing) {
      // setMarketingCookies();
      console.log("Marketing cookies enabled");
      // Here you would normally initialize marketing scripts
      // For example: initializeMarketingTools();
    }
    
    // Log consent for compliance
    logConsent(consentData);
  }

  // Log consent for compliance purposes
  function logConsent(consentData) {
    const consentLog = {
      timestamp: new Date().toISOString(),
      consentData: consentData,
      userAgent: navigator.userAgent
    };
    
    console.log("Consent logged:", consentLog);
    // In production, you might want to send this to your server
    // fetch('/api/log-consent', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(consentLog)
    // });
  }

  // Cookie utilities
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Event handlers
  acceptBtn.addEventListener('click', function() {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      date: new Date().toISOString()
    };
    
    setCookie('cookieConsent', JSON.stringify(consentData), 365);
    applyConsent(consentData);
    banner.classList.remove('show');
    settingsLink.classList.add('show');
  });

  declineBtn.addEventListener('click', function() {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      date: new Date().toISOString()
    };
    
    setCookie('cookieConsent', JSON.stringify(consentData), 365);
    applyConsent(consentData);
    banner.classList.remove('show');
    settingsLink.classList.add('show');
  });

  preferencesBtn.addEventListener('click', function() {
    preferencesModal.classList.add('show');
  });

  closeModalBtn.addEventListener('click', function() {
    preferencesModal.classList.remove('show');
  });

  settingsLink.addEventListener('click', function() {
    const cookieConsent = getCookie('cookieConsent');
    if (cookieConsent) {
      const consentData = JSON.parse(cookieConsent);
      analyticsCheckbox.checked = consentData.analytics || false;
      marketingCheckbox.checked = consentData.marketing || false;
    }
    preferencesModal.classList.add('show');
  });

  savePreferencesBtn.addEventListener('click', function() {
    const consentData = {
      necessary: true,
      analytics: analyticsCheckbox.checked,
      marketing: marketingCheckbox.checked,
      date: new Date().toISOString()
    };
    
    setCookie('cookieConsent', JSON.stringify(consentData), 365);
    applyConsent(consentData);
    preferencesModal.classList.remove('show');
    banner.classList.remove('show');
    settingsLink.classList.add('show');
  });

  languageSelect.addEventListener('change', function() {
    currentLang = this.value;
    localStorage.setItem('cookieConsentLanguage', currentLang);
    applyTranslations();
  });

  // Close modal when clicking outside
  preferencesModal.addEventListener('click', function(e) {
    if (e.target === preferencesModal) {
      preferencesModal.classList.remove('show');
    }
  });

  // Initialize
  applyTranslations();
  checkConsent();
}); 