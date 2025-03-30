document.addEventListener('DOMContentLoaded', function() {
    // Cookie consent elements
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieModal = document.getElementById('cookie-settings-modal');
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const acceptNecessaryBtn = document.getElementById('cookie-accept-necessary');
    const cookieSettingsBtn = document.getElementById('cookie-settings');
    const closeModalBtn = document.querySelector('.close-modal');
    const savePreferencesBtn = document.getElementById('save-preferences');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'block';
    }

    // Accept all cookies
    acceptAllBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'all');
        cookieConsent.style.display = 'none';
        // Here you would enable all cookie types
    });

    // Accept only necessary cookies
    acceptNecessaryBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'necessary');
        cookieConsent.style.display = 'none';
        // Here you would enable only necessary cookies
    });

    // Open cookie settings modal
    cookieSettingsBtn.addEventListener('click', function() {
        cookieModal.style.display = 'block';
    });

    // Close modal when clicking the X
    closeModalBtn.addEventListener('click', function() {
        cookieModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cookieModal) {
            cookieModal.style.display = 'none';
        }
    });

    // Save cookie preferences
    savePreferencesBtn.addEventListener('click', function() {
        const analytics = document.getElementById('analytics-cookies').checked;
        const marketing = document.getElementById('marketing-cookies').checked;
        const preferences = document.getElementById('preferences-cookies').checked;

        localStorage.setItem('cookieConsent', 'custom');
        localStorage.setItem('cookiePreferences', JSON.stringify({
            analytics,
            marketing,
            preferences
        }));

        cookieModal.style.display = 'none';
        cookieConsent.style.display = 'none';
    });
}); 