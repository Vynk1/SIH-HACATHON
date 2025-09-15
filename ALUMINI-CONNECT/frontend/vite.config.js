import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': { target: 'http://localhost:5000', changeOrigin: true },
      '/alumni': { target: 'http://localhost:5000', changeOrigin: true },
      '/admin': { target: 'http://localhost:5000', changeOrigin: true },
      '/events': { target: 'http://localhost:5000', changeOrigin: true },
      '/donations': { target: 'http://localhost:5000', changeOrigin: true },
      '/mentorships': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
})
