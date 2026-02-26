import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Required for React Router BrowserRouter — serve index.html for all routes
    historyApiFallback: true,
  },
})
