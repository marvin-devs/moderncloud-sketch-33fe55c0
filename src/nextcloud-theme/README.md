
# Modern Theme for Nextcloud

A modern, minimalist theme for Nextcloud that enhances the user interface while maintaining all functionality.

## Features

- Modern UI with clean, minimalist design
- Custom styling for all Nextcloud components
- Improved typography and spacing
- Enhanced animations and transitions
- Vue.js component overrides for deeper customization
- Update-safe implementation via app structure

## Installation

1. Download or clone this repository into the `apps` directory of your Nextcloud installation:
   ```
   cd /path/to/nextcloud/apps/
   git clone https://your-repo-url/theme-modern.git
   ```

2. Build the assets:
   ```
   cd theme-modern
   npm install
   npm run build
   ```

3. Enable the app in Nextcloud:
   - Navigate to Settings > Apps
   - Click on "Customization" category
   - Find "Modern Theme" and click "Enable"

## Development

For development, you can use the watch mode to automatically rebuild assets when files change:

```
npm run dev
```

### Structure

- `appinfo/`: Contains app metadata and initialization code
- `css/`: Contains SCSS and CSS files
- `js/`: Contains compiled JavaScript
- `src/`: Contains source JavaScript and Vue.js components
- `lib/`: Contains PHP classes

## Customization

### CSS Variables

This theme utilizes CSS variables extensively. You can customize colors, fonts, and other visual elements by modifying the variables in `css/style.css` or `css/style.scss`.

### Vue Components

For deeper customization, you can modify or create new Vue components in the `src/components/` directory. Components can override existing Nextcloud components or add new functionality.

## License

AGPL-3.0
