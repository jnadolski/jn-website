import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite'; // Keep this for the plugin itself

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          '#000000': 'currentColor',
        }
      }
    }), 
    react(), // react() comes after svgr
    tailwindcss(), // Keep this plugin
  ],
  build: {
    outDir: 'build',
  },
  // Remove the css.postcss section entirely
});