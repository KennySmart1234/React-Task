import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Status from '../components/Status'
import { ChevronIcon, CloseIcon } from '../components/Icons'
import { COLORS, SIZES, colorsFor, disc } from '../lib'

const PER = 12
const cats = ["men's clothing", "women's clothing", 'jewelery', 'electronics']
const sorts = { pop: 'Most Popular', low: 'Price: Low to High', high: 'Price: High to Low', rate: 'Top Rated', new: 'Newest' }

function Filters({ f, setF, apply, close }) {
  const toggle = (k, v) => setF({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] })
  const H = ({ t }) => <h4 className="text-xl font-bold mb-4">{t}</h4>
  return (
    <div className="border border-black/10 rounded-[20px] p-5 bg-white">
      <div className="flex justify-between items-center text-xl font-bold pb-4 border-b border-black/10">Filters{close && <button onClick={close} aria-label="Close"><CloseIcon /></button>}</div>
      <div className="py-4 border-b border-black/10 space-y-4">
        <Link to="/shop" className="flex justify-between text-black/60">All products <ChevronIcon className="w-4 h-4" /></Link>
        {cats.map(c => <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="flex justify-between text-black/60 capitalize">{c}<ChevronIcon className="w-4 h-4" /></Link>)}
      </div>
      <div className="py-5 border-b border-black/10">
        <H t="Price" />
        <input type="range" min="0" max="1000" step="10" value={f.max} onChange={e => setF({ ...f, max: +e.target.value })} className="w-full accent-black" />
        <div className="flex justify-between text-sm font-medium"><span>$0</span><span>${f.max}</span></div>
      </div>
      <div className="py-5 border-b border-black/10">
        <H t="Colors" />
        <div className="flex flex-wrap gap-3">
          {COLORS.map(c => (
            <button key={c.name} aria-label={c.name} onClick={() => toggle('colors', c.name)} style={{ background: c.hex }} className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-white">
              {f.colors.includes(c.name) && <span className={c.name === 'White' ? 'text-black' : ''}>✓</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="py-5 border-b border-black/10">
        <H t="Size" />
        <div className="flex flex-wrap gap-2">
          {SIZES.map(s => <button key={s} onClick={() => toggle('sizes', s)} className={`rounded-full px-5 py-2.5 text-sm ${f.sizes.includes(s) ? 'bg-black text-white' : 'bg-soft text-black/60'}`}>{s}</button>)}
        </div>
      </div>
      <button onClick={apply} className="btn w-full py-3.5 mt-5">Apply Filter</button>
    </div>
  )
}
export default function Shop() {
  const [sp] = useSearchParams()
  const { items, status, error } = useSelector(s => s.products)
  const category = sp.get('category'), q = (sp.get('q') || '').toLowerCase(), sale = sp.get('sale')
  const [sort, setSort] = useState(sp.get('sort') || 'pop')
  const [page, setPage] = useState(1)
  const [draft, setDraft] = useState({ max: 1000, colors: [], sizes: [] })
  const [f, setF] = useState(draft)
  const [drawer, setDrawer] = useState(false)
  useEffect(() => setPage(1), [category, q, sale, sort, f])
  useEffect(() => { if (sp.get('sort')) setSort(sp.get('sort')) }, [sp])

  const list = useMemo(() => {
    let l = items.filter(p => (!category || p.category === category) && (!q || p.title.toLowerCase().includes(q)) && (!sale || disc(p) > 0)
      && p.price <= f.max && (!f.colors.length || colorsFor(p).some(c => f.colors.includes(c.name))))
    const s = { pop: (a, b) => b.rating.count - a.rating.count, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rate: (a, b) => b.rating.rate - a.rating.rate, new: (a, b) => b.id - a.id }[sort]
    return l.sort(s)
  }, [items, category, q, sale, f, sort])
  const pages = Math.max(1, Math.ceil(list.length / PER))
  const shown = list.slice((page - 1) * PER, page * PER)
  const apply = () => { setF(draft); setDrawer(false) }
  const title = category ? category.replace(/^./, c => c.toUpperCase()) : q ? `Results for "${q}"` : 'All Products'

  return (
    <div className="wrap pb-16">
      <div className="py-5 text-black/60 border-t border-black/10 md:border-0"><Link to="/">Home</Link> <span className="mx-1">›</span> <span className="text-black capitalize">{category || 'Shop'}</span></div>
      <div className="flex gap-5">
        <aside className="hidden lg:block w-[295px] shrink-0"><Filters f={draft} setF={setDraft} apply={apply} /></aside>
        {drawer && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setDrawer(false)}>
            <div className="w-full max-h-[90vh] overflow-y-auto rounded-t-[24px] bg-white" onClick={e => e.stopPropagation()}><Filters f={draft} setF={setDraft} apply={apply} close={() => setDrawer(false)} /></div>
          </div>
        )}
        <section className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h1 className="text-2xl md:text-[32px] font-bold capitalize">{title} <span className="lg:hidden text-sm font-normal text-black/60 ml-1">Showing {list.length ? (page - 1) * PER + 1 : 0}-{Math.min(page * PER, list.length)} of {list.length}</span></h1>
            <div className="flex items-center gap-4 text-black/60">
              <span className="hidden lg:inline">Showing {list.length ? (page - 1) * PER + 1 : 0}-{Math.min(page * PER, list.length)} of {list.length} Products</span>
              <label className="hidden lg:inline">Sort by: <select value={sort} onChange={e => setSort(e.target.value)} className="font-medium text-black bg-transparent outline-none">{Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
              <button className="lg:hidden pill w-10 h-10 text-black" aria-label="Filters" onClick={() => setDrawer(true)}>⚙</button>
            </div>
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="lg:hidden pill px-4 py-2 mb-4 text-sm">{Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>Sort: {v}</option>)}</select>
          {items.length === 0 ? <Status status={status} error={error} /> : shown.length === 0 ? <p className="py-16 text-center text-black/60">No products match your filters.</p> : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-5 lg:gap-y-9">{shown.map(p => <ProductCard key={p.id} p={p} />)}</div>
          )}
          <div className="flex items-center justify-between border-t border-black/10 mt-8 pt-5 text-sm">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="border border-black/10 rounded-lg px-3.5 py-2 disabled:opacity-40">← Previous</button>
            <div className="flex gap-1">{Array.from({ length: pages }, (_, i) => i + 1).map(n => <button key={n} onClick={() => setPage(n)} className={`w-10 h-10 rounded-lg ${n === page ? 'bg-soft font-medium' : 'text-black/50'}`}>{n}</button>)}</div>
            <button disabled={page === pages} onClick={() => setPage(page + 1)} className="border border-black/10 rounded-lg px-3.5 py-2 disabled:opacity-40">Next →</button>
          </div>
        </section>
      </div>
    </div>
  )
}
