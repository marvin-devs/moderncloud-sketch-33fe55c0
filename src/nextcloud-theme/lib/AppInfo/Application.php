
<?php
namespace OCA\ThemeModern\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\Util;

class Application extends App implements IBootstrap {
    public const APP_ID = 'theme-modern';

    public function __construct() {
        parent::__construct(self::APP_ID);
    }

    public function register(IRegistrationContext $context): void {
        // Register services, listeners, etc.
    }

    public function boot(IBootContext $context): void {
        // Register CSS and JS when the app is loaded
        Util::addScript(self::APP_ID, 'main');
        Util::addStyle(self::APP_ID, 'style');
        
        // Add performance optimization scripts
        $this->addPerformanceOptimizations();
        
        // Force theme for all apps
        $this->forceThemeForAllApps();
        
        // Setup dark mode
        $this->setupDarkMode();
    }
    
    /**
     * Ensures our theme is used for all apps
     */
    private function forceThemeForAllApps() {
        // This is executed when an app is loaded
        \OCP\Util::addScript(self::APP_ID, 'main', 'core');
        \OCP\Util::addStyle(self::APP_ID, 'style', 'core');
    }
    
    /**
     * Add performance optimizations
     */
    private function addPerformanceOptimizations() {
        // Add preload for critical assets
        \OCP\Util::addHeader('
            <link rel="preload" href="' . \OC::$server->getURLGenerator()->imagePath(self::APP_ID, 'icons/home.svg') . '" as="image">
            <link rel="preload" href="' . \OC::$server->getURLGenerator()->imagePath(self::APP_ID, 'icons/files.svg') . '" as="image">
        ');
        
        // Add lazy loading script
        \OCP\Util::addScript(self::APP_ID, 'lazy-loading');
    }
    
    /**
     * Setup dark mode detection and transitions
     */
    private function setupDarkMode() {
        // Add dark mode script
        \OCP\Util::addScript(self::APP_ID, 'dark-mode');
        
        // Add meta theme-color for mobile browsers
        \OCP\Util::addHeader('
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
            <meta name="theme-color" content="#1c1c1e" media="(prefers-color-scheme: dark)">
        ');
    }
}
