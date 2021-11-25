import { VitePWA } from 'vite-plugin-pwa'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5000,
    },
    
    plugins: [
        VitePWA({
            mode: "production",
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.js',
            includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
            manifest: {
              name: 'My Routify app',
              short_name: 'Description coming soon...',
              description: 'Description coming soon...',
              theme_color: '#ffffff',
              icons: [
                {
                  src: 'android-chrome-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: 'android-chrome-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                },
                {
                  src: 'android-chrome-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable',
                }
              ]
            }
          }),
        svelte()
    ],
});
