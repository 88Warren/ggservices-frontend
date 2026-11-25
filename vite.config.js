import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:8090'

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: 3000,
      proxy: {
        // Forward /images/* to the Go backend so dev matches production
        '/images': {
          target: backendUrl,
          changeOrigin: true,
        },
        // Also proxy the API send endpoint
        '/send': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  }
})
