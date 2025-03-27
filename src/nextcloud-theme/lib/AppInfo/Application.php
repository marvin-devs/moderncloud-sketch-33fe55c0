
<?php
namespace OCA\ThemeModern\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;

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
        \OCP\Util::addScript(self::APP_ID, 'script');
        \OCP\Util::addStyle(self::APP_ID, 'style');
    }
}
