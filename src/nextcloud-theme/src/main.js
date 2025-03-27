
/**
 * Apple-inspiriertes Theme für Nextcloud
 * Haupteinstiegspunkt für JS-Anpassungen
 */

// Import styles
import '../css/style.scss';

// Import Vue
import Vue from 'vue';

// Import Komponenten
import NavigationMenuModern from './components/NavigationMenuModern.vue';
import AppHeaderModern from './components/AppHeaderModern.vue';
import DialogModern from './components/DialogModern.vue';

// Komponenten global registrieren
Vue.component('navigation-menu-modern', NavigationMenuModern);
Vue.component('app-header-modern', AppHeaderModern);
Vue.component('dialog-modern', DialogModern);

// Theme initialisieren
document.addEventListener('DOMContentLoaded', () => {
  console.log('Apple-inspiriertes Theme initialisiert');
  
  // Anwendung der Komponenten-Overrides
  applyComponentOverrides();
  
  // Initialisierung der benutzerdefinierten Verhaltensweisen
  initCustomBehaviors();
  
  // Anwendung des Dark Mode
  applyDarkModeDetection();
});

/**
 * Ersetzt originale Komponenten durch moderne Versionen
 */
function applyComponentOverrides() {
  // Navigation-Overrides
  const originalNavigationMenu = document.querySelector('.app-navigation');
  if (originalNavigationMenu) {
    // Container für unsere Vue-Komponente erstellen
    const modernNavContainer = document.createElement('div');
    modernNavContainer.id = 'modern-navigation-container';
    
    // Extrahieren der Navigation-Items aus dem Original
    const navItems = Array.from(originalNavigationMenu.querySelectorAll('.app-navigation-entry')).map(item => {
      return {
        id: item.getAttribute('data-id') || Math.random().toString(36),
        label: item.querySelector('.app-navigation-entry-link').textContent.trim(),
        icon: item.querySelector('img, svg') ? item.querySelector('img, svg').outerHTML : null,
        active: item.classList.contains('active'),
        href: item.querySelector('a') ? item.querySelector('a').getAttribute('href') : '#'
      };
    });
    
    // Originalnavigation ersetzen
    originalNavigationMenu.parentNode.insertBefore(modernNavContainer, originalNavigationMenu);
    originalNavigationMenu.style.display = 'none';
    
    // Vue-Komponente mounten
    new Vue({
      el: '#modern-navigation-container',
      render: h => h(NavigationMenuModern, {
        props: {
          navItems: navItems,
          appName: document.title.split(' - ')[1] || document.title
        }
      })
    });
  }
  
  // Header-Overrides
  const originalHeader = document.querySelector('#header');
  if (originalHeader) {
    const modernHeaderContainer = document.createElement('div');
    modernHeaderContainer.id = 'modern-header-container';
    
    // Header-Informationen extrahieren
    const userDisplayName = document.querySelector('#settings .user-displayname') 
      ? document.querySelector('#settings .user-displayname').textContent.trim()
      : 'User';
    
    const userAvatar = document.querySelector('#header .avatardiv, #header .avatar')
      ? document.querySelector('#header .avatardiv, #header .avatar').outerHTML 
      : null;
      
    // Header einfügen (ohne das Original zu verstecken, da dies wichtige Funktionen enthalten könnte)
    document.body.insertBefore(modernHeaderContainer, document.body.firstChild);
    
    // Vue-Komponente mounten
    new Vue({
      el: '#modern-header-container',
      render: h => h(AppHeaderModern, {
        props: {
          userDisplayName: userDisplayName,
          userAvatar: userAvatar,
          appName: document.title.split(' - ')[1] || document.title
        }
      })
    });
  }
}

/**
 * Initialisiert benutzerdefinierte Verhaltensweisen und Interaktionen
 */
function initCustomBehaviors() {
  // Hinzufügen der Glass-Effekte
  document.querySelectorAll('.app-navigation').forEach(nav => {
    nav.classList.add('with-glass');
  });
  
  // Anpassen der Standard-Buttons und Inputs
  document.querySelectorAll('button, .button').forEach(button => {
    button.classList.add('animate-transition');
  });
  
  document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]').forEach(input => {
    input.classList.add('animate-transition');
  });
  
  // Smooth Scrolling aktivieren
  document.querySelectorAll('.app-content').forEach(content => {
    content.classList.add('smooth-scroll');
    content.style.scrollBehavior = 'smooth';
  });
  
  // Hover-Effekte für Listenelemente
  document.querySelectorAll('.app-content-list-item').forEach(item => {
    item.classList.add('animate-transition');
  });
  
  // Benachrichtigungen mit Animation
  document.querySelectorAll('.notification, .toastify').forEach(notification => {
    notification.classList.add('animate-notification');
  });
  
  // Login-Seite verschönern
  if (document.getElementById('body-login')) {
    const loginForm = document.querySelector('form');
    if (loginForm) {
      loginForm.parentElement.classList.add('login-container');
    }
    
    // Hintergrund-Animation
    const background = document.createElement('div');
    background.className = 'login-background';
    document.body.prepend(background);
  }
  
  // DOM auf dynamische Änderungen beobachten
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        // Neue Dialoge mit Glass-Effekt versehen
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            if (node.classList && (node.classList.contains('modal') || node.classList.contains('oc-dialog'))) {
              node.classList.add('glass-panel');
            }
            
            // Auch bei neu hinzugefügten Elementen Stile anwenden
            node.querySelectorAll && node.querySelectorAll('button, .button').forEach(button => {
              button.classList.add('animate-transition');
            });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Dynamische Erkennung des Dark Mode und Anwendung entsprechender Styles
 */
function applyDarkModeDetection() {
  // Sofort den aktuellen Dark Mode-Status anwenden
  applyCurrentColorScheme();
  
  // Auch auf Änderungen reagieren
  const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  colorSchemeMediaQuery.addEventListener('change', applyCurrentColorScheme);
  
  // Manuellen Dark Mode Toggle hinzufügen
  addDarkModeToggle();
}

/**
 * Aktuelle Farbvoreinstellung des Betriebssystems anwenden
 */
function applyCurrentColorScheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const userPreference = localStorage.getItem('theme-mode');
  
  // Benutzereinstellung hat Vorrang vor Systemeinstellung
  if (userPreference === 'dark' || (userPreference !== 'light' && isDarkMode)) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Fügt einen Toggle für den Dark Mode hinzu
 */
function addDarkModeToggle() {
  const settingsMenu = document.querySelector('#settings');
  if (settingsMenu) {
    const darkModeToggle = document.createElement('div');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.className = 'settings-item';
    darkModeToggle.innerHTML = `
      <input type="checkbox" id="dark-mode-checkbox" class="checkbox" ${document.documentElement.classList.contains('dark') ? 'checked' : ''}>
      <label for="dark-mode-checkbox">Dark Mode</label>
    `;
    
    // Nach den persönlichen Einstellungen einfügen
    const insertAfter = settingsMenu.querySelector('.user-displayname');
    if (insertAfter && insertAfter.parentNode) {
      insertAfter.parentNode.insertBefore(darkModeToggle, insertAfter.nextSibling);
    } else {
      settingsMenu.appendChild(darkModeToggle);
    }
    
    // Event-Listener für den Toggle
    document.getElementById('dark-mode-checkbox').addEventListener('change', e => {
      if (e.target.checked) {
        localStorage.setItem('theme-mode', 'dark');
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        localStorage.setItem('theme-mode', 'light');
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    });
  }
}
