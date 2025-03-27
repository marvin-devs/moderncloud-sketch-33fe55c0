
/**
 * Modern Theme main entry point
 */

// Import styles
import '../css/style.scss';

// Import Vue
import Vue from 'vue';

// Import components
import NavigationMenuModern from './components/NavigationMenuModern.vue';

// Register components globally
Vue.component('navigation-menu-modern', NavigationMenuModern);

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  console.log('Modern Theme initialized');
  
  // Add component overrides and extensions
  applyComponentOverrides();
  
  // Initialize custom behaviors
  initCustomBehaviors();
});

/**
 * Apply component overrides by replacing original components with our modified versions
 */
function applyComponentOverrides() {
  // This is a simplified example. In a real implementation, you'd need to
  // hook into Nextcloud's component system properly
  
  // Example: Override navigation menu if present
  const originalNavigationMenu = document.querySelector('.app-navigation');
  if (originalNavigationMenu) {
    // In a real scenario, you'd need to get the data from the original component
    // and pass it to your Vue component. This is simplified.
    const appName = document.title;
    const navigationItems = [];
    
    // Create a container for our Vue component
    const modernNavContainer = document.createElement('div');
    modernNavContainer.id = 'modern-navigation-container';
    originalNavigationMenu.parentNode.insertBefore(modernNavContainer, originalNavigationMenu);
    
    // Optionally hide the original
    // originalNavigationMenu.style.display = 'none';
    
    // Mount Vue component
    new Vue({
      el: '#modern-navigation-container',
      render: h => h(NavigationMenuModern, {
        props: {
          appName: appName,
          navigationItems: navigationItems
        }
      })
    });
  }
}

/**
 * Initialize custom behaviors and interactions
 */
function initCustomBehaviors() {
  // Add custom classes for styling
  document.querySelectorAll('button, .button').forEach(button => {
    button.classList.add('modern-button');
  });
  
  document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]').forEach(input => {
    input.classList.add('modern-input');
  });
  
  // Add smooth transitions
  document.querySelectorAll('.app-content-list-item').forEach(item => {
    item.classList.add('animate-transition');
  });
  
  // Enhance notifications
  document.querySelectorAll('.notification').forEach(notification => {
    notification.classList.add('animate-notification');
  });
  
  // Observe DOM for dynamic changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        // Apply styles to new elements
        initCustomBehaviors();
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}
