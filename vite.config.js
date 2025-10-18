import { defineConfig } from 'vite'
import react from '@viteJs/plugin-react'

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
    // Remove cssCodeSplit: false.
    // Vite's default CSS handling is usually correct when CSS is imported via JS.
    // If you explicitly want CSS in separate files, you can set cssCodeSplit: true.
    // Leaving it out will use Vite's default (which is true for production builds).

    // Remove rollupOptions. Vite usually handles entry points and output chunks automatically
    // for standard React projects, especially if you're not doing advanced chunking.
  },
  // Critical for GitHub Pages - use relative paths
  base: './',
  // Optimize dependencies to prevent transformation issues (this is usually fine to keep)
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})