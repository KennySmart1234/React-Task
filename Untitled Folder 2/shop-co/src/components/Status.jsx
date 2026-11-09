import { useDispatch } from 'react-redux'
import { fetchProducts } from '../store'
export default function Status({ status, error }) {
  const d = useDispatch()
  if (status === 'error') return <div className="py-16 text-center"><p className="mb-4">{error}</p><button className="btn px-6 py-3" onClick={() => d(fetchProducts())}>Retry</button></div>
  return <div className="py-16 text-center text-black/60">Loading products…</div>
}
