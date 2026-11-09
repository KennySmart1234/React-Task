import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // gutenberg.org blocks direct browser downloads (CORS). During `npm run dev`
    // the PDF button fetches book text through this proxy instead.
    proxy: {
      '/gutenberg': {
        target: 'https://www.gutenberg.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gutenberg/, ''),
        configure: (proxy) => {
          // If gutenberg.org answers with a redirect, keep the browser on our
          // proxy so the follow-up request is not blocked by CORS.
          proxy.on('proxyRes', (res) => {
            const loc = res.headers.location
            if (loc) res.headers.location = loc.replace(/^https?:\/\/[^/]+/, '/gutenberg')
          })
        },
      },
    },
  },
})
