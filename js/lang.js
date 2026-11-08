let translations = {};

function getLanguage() {
  let currentLanguage = localStorage.getItem('language');
  if (!currentLanguage) {
    const browserLanguage = navigator.language || navigator.userLanguage || 'en';
    if (browserLanguage.startsWith('pt')) {
      currentLanguage = 'pt';
    } else {
      currentLanguage = 'en';
    }
    localStorage.setItem('language', currentLanguage);
  }
  return currentLanguage;
}

async function loadTranslations(lang) {
  try {
    const response = await fetch(`../langs/${lang}.json`);
    translations = await response.json();
    applyLanguage(lang);
  } catch (error) {
    console.error("Erro ao carregar as traduções:", error);
  }
}

function applyLanguage() {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });  
}

function setLanguage(lang) {
  loadTranslations(lang)
  localStorage.setItem('language', lang);
}
document.addEventListener('DOMContentLoaded', () => {
  loadTranslations(getLanguage());
});