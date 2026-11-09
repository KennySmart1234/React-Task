import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// fakestoreapi.com does not send CORS headers, so browser calls from localhost are blocked.
// Requests to /fakestore/* are proxied server-side to https://fakestoreapi.com/* (works for `npm run dev` and `npm run preview`).
const proxy = {
  '/fakestore': {
    target: 'https://fakestoreapi.com',
    changeOrigin: true,
    secure: true,
    rewrite: (p) => p.replace(/^\/fakestore/, ''),
  },
}
export default defineConfig({ plugins: [react()], server: { proxy }, preview: { proxy } })
