
<?php
// Register scripts and styles for the theme
\OCP\Util::addScript('theme-modern', 'main');
\OCP\Util::addStyle('theme-modern', 'style');

// Add lazy loading for images and icons
$lazyLoadScript = '
<script>
document.addEventListener("DOMContentLoaded", function() {
    // Lazy load images
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
</script>
';

// Inject lazy loading script
\OCP\Util::addHeader($lazyLoadScript);

// Register dark mode detection and handling
\OCP\Util::addScript('theme-modern', 'dark-mode');

// For older Nextcloud versions that don't use App Bootstrap yet
// In newer versions, this is handled in the Application.php class
