
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
  
  // Mobile-Optimierungen initialisieren
  initMobileOptimizations();
  
  // Performance-Optimierungen anwenden
  applyPerformanceOptimizations();
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
        label: item.querySelector('.app-navigation-entry-link')?.textContent.trim() || 'Unknown',
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
      
      // Login Form verbessern
      const inputs = loginForm.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="submit"]');
      inputs.forEach(input => {
        input.classList.add('animate-transition');
        
        if (input.type === 'submit') {
          input.classList.add('login-submit');
        }
      });
      
      // Animation-Verzögerung für sequentielles Erscheinen
      const formElements = loginForm.querySelectorAll('p, input, label, button');
      formElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 50 + 100}ms`;
        el.classList.add('animate-fade');
      });
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
            
            // Auch bei neu hinzugefügten Elementen Animationen hinzufügen
            node.querySelectorAll && node.querySelectorAll('.notification, .toastify').forEach(notification => {
              notification.classList.add('animate-notification');
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
    
    // Meta theme-color für Browser anpassen
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#1c1c1e');
    }
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    
    // Meta theme-color für Browser anpassen
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#ffffff');
    }
  }
  
  // Animiere den Übergang
  document.body.classList.add('color-scheme-transition');
  setTimeout(() => {
    document.body.classList.remove('color-scheme-transition');
  }, 500);
}

/**
 * Fügt einen Toggle für den Dark Mode hinzu
 */
function addDarkModeToggle() {
  const settingsMenu = document.querySelector('#settings');
  if (settingsMenu) {
    // Prüfen, ob der Toggle bereits existiert
    if (document.getElementById('dark-mode-toggle')) {
      return;
    }
    
    const darkModeToggle = document.createElement('div');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.className = 'settings-item';
    
    // Moderneren Switch für den Dark Mode erstellen
    darkModeToggle.innerHTML = `
      <div class="apple-toggle-wrapper">
        <span>Dark Mode</span>
        <div class="switch">
          <input type="checkbox" id="dark-mode-checkbox" ${document.documentElement.classList.contains('dark') ? 'checked' : ''}>
          <span class="slider"></span>
        </div>
      </div>
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
      
      // Wende die neue Farbpalette an (einschließlich Meta-Tag updates)
      applyCurrentColorScheme();
    });
  }
}

/**
 * Mobile-Optimierungen anwenden
 */
function initMobileOptimizations() {
  // Responsive Meta-Tag hinzufügen wenn nicht vorhanden
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
  }
  
  // Mobile Klasse zum Body hinzufügen
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    document.body.classList.add('is-mobile');
  }
  
  // Event Listener für Resize-Events
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      document.body.classList.add('is-mobile');
    } else {
      document.body.classList.remove('is-mobile');
    }
  });
  
  // Touchfreundliche UI-Anpassungen für mobile Geräte
  if (isMobile) {
    // Größere Touch-Targets für mobile Geräte
    document.querySelectorAll('button, .button, a.action, .action-item').forEach(element => {
      element.classList.add('touch-target');
    });
    
    // Bottom Navigation für Mobile
    const appNav = document.querySelector('.app-navigation');
    if (appNav) {
      appNav.classList.add('mobile-navigation');
    }
    
    // Content-Padding anpassen
    const appContent = document.querySelector('.app-content');
    if (appContent) {
      appContent.classList.add('mobile-content');
    }
  }
}

/**
 * Performance-Optimierungen anwenden
 */
function applyPerformanceOptimizations() {
  // Lazy Loading für Bilder
  document.querySelectorAll('img').forEach(img => {
    // Nur anwenden, wenn das Bild noch nicht lazy loading hat
    if (!img.hasAttribute('loading') && !img.classList.contains('lazy')) {
      img.setAttribute('loading', 'lazy');
      img.classList.add('optimize-performance');
    }
  });
  
  // Debounce für häufige Events
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  // Scroll-Events optimieren
  const scrollEvents = document.querySelectorAll('.scroll-container');
  scrollEvents.forEach(container => {
    container.addEventListener('scroll', debounce(() => {
      // Scroll-Handler mit Debounce
    }, 100));
  });
  
  // Hardware-Acceleration für Animationen
  document.querySelectorAll('.animate-transition, .animate-notification, .animate-fade, .animate-scale').forEach(element => {
    element.classList.add('optimize-performance');
  });
  
  // Aktive Animationen reduzieren, wenn die Seite nicht sichtbar ist
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.body.classList.add('reduce-animations');
    } else {
      document.body.classList.remove('reduce-animations');
    }
  });
}
