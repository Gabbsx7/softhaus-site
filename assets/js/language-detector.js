// Language detection based on user location
function detectUserLanguage() {
  // Check if user has already made a choice
  const userChoice = localStorage.getItem('userLanguage');
  if (userChoice) {
    return userChoice;
  }

  // Get user's timezone to detect location
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Brazilian timezones
  const brazilianTimezones = [
    'America/Sao_Paulo',
    'America/Manaus',
    'America/Belem',
    'America/Fortaleza',
    'America/Recife',
    'America/Maceio',
    'America/Aracaju',
    'America/Salvador',
    'America/Bahia',
    'America/Campo_Grande',
    'America/Cuiaba',
    'America/Porto_Velho',
    'America/Boa_Vista',
    'America/Rio_Branco',
    'America/Noronha'
  ];

  // Check if user is in Brazil
  if (brazilianTimezones.includes(timezone)) {
    return 'pt';
  }

  // Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('pt')) {
    return 'pt';
  }

  // Default to English for other countries
  return 'en';
}

// Redirect to appropriate language version
function redirectToLanguage() {
  const currentPath = window.location.pathname;
  const language = detectUserLanguage();
  
  // If already on correct language path, don't redirect
  if (currentPath.startsWith('/' + language + '/') || 
      (language === 'pt' && !currentPath.startsWith('/en/')) ||
      (language === 'en' && currentPath.startsWith('/en/'))) {
    return;
  }

  // Redirect to appropriate language version
  if (language === 'pt') {
    // Remove /en/ prefix if present
    const newPath = currentPath.replace('/en/', '/');
    if (newPath !== currentPath) {
      window.location.href = newPath;
    }
  } else {
    // Add /en/ prefix if not present
    if (!currentPath.startsWith('/en/')) {
      const newPath = '/en' + currentPath;
      window.location.href = newPath;
    }
  }
}

// Language switcher functions
function switchToPortuguese() {
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace('/en/', '/');
  localStorage.setItem('userLanguage', 'pt');
  window.location.href = newPath;
}

function switchToEnglish() {
  const currentPath = window.location.pathname;
  const newPath = '/en' + currentPath;
  localStorage.setItem('userLanguage', 'en');
  window.location.href = newPath;
}

// Initialize language detection
document.addEventListener('DOMContentLoaded', function() {
  redirectToLanguage();
});

// Export functions for use in HTML
window.languageDetector = {
  detectUserLanguage,
  redirectToLanguage,
  switchToPortuguese,
  switchToEnglish
}; 