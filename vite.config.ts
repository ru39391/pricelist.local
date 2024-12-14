import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: 'assets/app/pricelist/[name].js',
        chunkFileNames: 'assets/app/pricelist/[name].js',
        assetFileNames: 'assets/app/pricelist/[name].[ext]'
      }
    },
  }
})
