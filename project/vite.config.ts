import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': {},
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'mock-aws-s3': fileURLToPath(new URL('./empty.js', import.meta.url)),
        'aws-sdk': fileURLToPath(new URL('./empty.js', import.meta.url)),
        'nock': fileURLToPath(new URL('./empty.js', import.meta.url)),
        '@mapbox/node-pre-gyp': fileURLToPath(new URL('./empty.js', import.meta.url)),
        'node-pre-gyp': fileURLToPath(new URL('./empty.js', import.meta.url)),
    },
    
    },
    build: {
        rollupOptions: {
            input: [
                fileURLToPath(new URL('./index.html', import.meta.url)), // Explicitly include your main HTML file
            ],
            output: {
                // Keep this for consistency
                assetFileNames: '[name].[ext]',
            },
        },
    },
});
