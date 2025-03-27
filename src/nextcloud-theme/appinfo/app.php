
<?php
// Register scripts and styles
\OCP\Util::addScript('theme-modern', 'main');
\OCP\Util::addStyle('theme-modern', 'style');

// Für ältere Nextcloud-Versionen, die noch nicht das App-Bootstrap verwenden
// In neueren Versionen wird dies in der Application.php-Klasse gehandhabt
