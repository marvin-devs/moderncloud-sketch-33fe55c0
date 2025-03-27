
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
        // Registrierung von Services, Listenern, etc.
    }

    public function boot(IBootContext $context): void {
        // Registrierung von CSS und JS wenn die App geladen wird
        Util::addScript(self::APP_ID, 'main');
        Util::addStyle(self::APP_ID, 'style');
        
        // Optional: Theme für alle Apps erzwingen
        $this->forceThemeForAllApps();
    }
    
    /**
     * Sorgt dafür, dass unser Theme für alle Apps verwendet wird
     */
    private function forceThemeForAllApps() {
        // Hier können wir zusätzliche JS und CSS für alle Apps erzwingen
        // Dies wird ausgeführt, wenn eine App geladen wird
        
        \OCP\Util::addScript(self::APP_ID, 'main', 'core');
        \OCP\Util::addStyle(self::APP_ID, 'style', 'core');
    }
}
