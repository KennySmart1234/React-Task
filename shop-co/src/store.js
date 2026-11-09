import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Uses the Vite proxy (/fakestore) to avoid CORS. For a deployed build, set VITE_API_BASE
// (e.g. to a serverless/proxy URL) or configure a rewrite from /fakestore to https://fakestoreapi.com on your host.
const BASES = [import.meta.env.VITE_API_BASE || '/fakestore', 'https://fakestoreapi.com']
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  for (const base of BASES) {
    try {
      const r = await fetch(`${base}/products`)
      if (!r.ok) continue
      const data = await r.json()
      if (Array.isArray(data)) return data
    } catch { /* try next base */ }
  }
  throw new Error('Could not load products. Please check your connection and retry.')
})
const products = createSlice({
  name: 'products', initialState: { items: [], status: 'idle', error: null }, reducers: {},
  extraReducers: b => b
    .addCase(fetchProducts.pending, s => { s.status = 'loading' })
    .addCase(fetchProducts.fulfilled, (s, a) => { s.status = 'done'; s.items = a.payload })
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
