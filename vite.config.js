import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    // This is the CRITICAL change for GitHub Pages deployment to a subpath
    // It must match your repository name: /<your-repository-name>/
    base: '/catalogue-mj-exports/', 

    // The 'optimizeDeps' configuration from your original file
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
})