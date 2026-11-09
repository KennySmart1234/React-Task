import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import fallbackProducts from './data/products.json'

// Order of attempts: Vite proxy (/fakestore, avoids CORS) -> direct URL -> bundled offline catalog.
// fakestoreapi.com is a free public service that is sometimes down (Cloudflare 52x errors). When that happens the
// browser also reports a misleading "CORS" error, because Cloudflare's error page has no CORS headers.
// For a deployed build set VITE_API_BASE (or add a host rewrite /fakestore/* -> https://fakestoreapi.com/*).
const BASES = [import.meta.env.VITE_API_BASE || '/fakestore', 'https://fakestoreapi.com']
const withTimeout = async (url, ms = 7000) => {
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), ms)
  try { return await fetch(url, { signal: ctl.signal }) } finally { clearTimeout(t) }
}
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  for (const base of BASES) {
    try {
      const r = await withTimeout(`${base}/products`)
      if (!r.ok) continue
      const data = await r.json()
      if (Array.isArray(data) && data.length) return { items: data, offline: false }
    } catch { /* try next source */ }
  }
  console.info('[shop] FakeStoreAPI unreachable - using the bundled offline catalog.')
  return { items: fallbackProducts, offline: true }
})
const products = createSlice({
  name: 'products', initialState: { items: [], status: 'idle', error: null, offline: false }, reducers: {},
  extraReducers: b => b
    .addCase(fetchProducts.pending, s => { s.status = 'loading' })
    .addCase(fetchProducts.fulfilled, (s, a) => { s.status = 'done'; s.items = a.payload.items; s.offline = a.payload.offline })
    .addCase(fetchProducts.rejected, (s, a) => { s.status = 'error'; s.error = a.error.message }),
})
const load = () => { try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] } }
const cart = createSlice({
  name: 'cart', initialState: { items: load(), promo: 0 },
  reducers: {
    add(s, { payload: p }) {
      const key = `${p.id}-${p.size}-${p.color}`
      const i = s.items.find(x => x.key === key)
      if (i) i.qty += p.qty; else s.items.push({ ...p, key })
    },
    setQty(s, { payload: { key, qty } }) { const i = s.items.find(x => x.key === key); if (i) i.qty = Math.max(1, qty) },
    remove(s, { payload }) { s.items = s.items.filter(x => x.key !== payload) },
    setPromo(s, { payload }) { s.promo = payload },
    clear(s) { s.items = []; s.promo = 0 },
  },
})
export const { add, setQty, remove, setPromo, clear } = cart.actions
const store = configureStore({ reducer: { products: products.reducer, cart: cart.reducer } })
store.subscribe(() => { try { localStorage.setItem('cart', JSON.stringify(store.getState().cart.items)) } catch {} })
export default store
