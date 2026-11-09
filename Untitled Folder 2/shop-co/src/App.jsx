import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './store'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'

export default function App() {
  const d = useDispatch()
  const { pathname } = useLocation()
  useEffect(() => { d(fetchProducts()) }, [d])
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div className="wrap py-20 text-center">Page not found</div>} />
      </Route>
    </Routes>
  )
}
