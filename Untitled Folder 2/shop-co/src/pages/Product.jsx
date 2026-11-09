import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store'
import Stars from '../components/Stars'
import ProductCard, { Price } from '../components/ProductCard'
import ProductImg from '../components/ProductImg'
import Breadcrumb from '../components/Breadcrumb'
import Status from '../components/Status'
import { MinusIcon, PlusIcon, CheckIcon, ChevronDownIcon, DotsIcon, SlidersIcon, VerifiedIcon, CloseIcon } from '../components/Icons'
import { colorsFor, SIZES } from '../lib'

const CATS = { "men's clothing": 'Men', "women's clothing": 'Women', jewelery: 'Jewelery', electronics: 'Electronics' }
const SEED = [
  ['Samantha D.', 4.5, '2023-08-14', "I absolutely love this! The design is unique and the quality feels so comfortable. I appreciate the attention to detail. It's become my favorite go-to."],
  ['Alex M.', 4, '2023-08-15', "It exceeded my expectations! The finish is top-notch. Being quite picky about aesthetics myself, this definitely gets a thumbs up from me."],
  ['Ethan R.', 3.5, '2023-08-16', "This is a must-have for anyone who appreciates good design. The minimalistic yet stylish look caught my eye, and it works perfectly. I can see the designer's touch in every aspect of it."],
  ['Olivia P.', 4, '2023-08-17', "I value simplicity and functionality. This not only represents those principles but also feels great to use. It's evident that the designer poured their creativity into making it stand out."],
  ['Liam K.', 4, '2023-08-18', "A fusion of comfort and creativity. The materials are solid, and the design speaks volumes about the designer's skill. It's like owning a piece of art that reflects my passion."],
  ['Ava H.', 4.5, '2023-08-19', "I'm not just buying a product; I'm buying a piece of design philosophy. The intricate details and thoughtful layout make this a conversation starter."],
  ['Noah B.', 5, '2023-08-20', 'Great value for the price. Arrived quickly, was packaged well, and looks even better in person than in the photos.'],
  ['Mia T.', 3.5, '2023-08-21', "Nice quality overall. Sizing runs a touch small, so I'd suggest going one size up if you're between sizes."],
  ['Lucas W.', 4, '2023-08-22', 'Solid purchase. Clean finish, feels durable and matches the description exactly. Would buy again.'],
  ['Emma S.', 5, '2023-08-23', "Absolutely worth it. I've received several compliments already and it has held up after weeks of regular use."],
].map(([name, rate, date, text], i) => ({ id: `s${i}`, name, rate, date, text }))
const fmtDate = d => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
const SORTS = { latest: 'Latest', oldest: 'Oldest', high: 'Highest rated', low: 'Lowest rated' }
const FAQS = [['How long is delivery?', 'Orders arrive within 3–7 business days. Express delivery is available at checkout.'], ['Can I return this item?', 'Yes. Unworn items can be returned within 30 days for a full refund.'], ['How do I care for it?', 'Follow the care label. As a rule, wash cold and dry flat.']]
// The API gives a single photo, so the extra thumbnails are close-ups of it.
const VIEWS = [{ s: 1, o: '50% 50%' }, { s: 1.7, o: '50% 30%' }, { s: 2.2, o: '70% 75%' }]

function useDesktop() {
  const q = '(min-width: 1024px)'
  const [v, setV] = useState(() => window.matchMedia(q).matches)
  useEffect(() => { const m = window.matchMedia(q); const f = () => setV(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return v
}
function useOutside(open, close) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const h = e => { if (ref.current && !ref.current.contains(e.target)) close() }
    const k = e => e.key === 'Escape' && close()
    document.addEventListener('mousedown', h); document.addEventListener('keydown', k)
    return () => { document.removeEventListener('mousedown', h); document.removeEventListener('keydown', k) }
  }, [open, close])
  return ref
}

function Gallery({ p, img, setImg }) {
  const v = VIEWS[img]
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-3.5 lg:w-[49.2%] lg:shrink-0">
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 lg:gap-3.5 lg:w-[152px] lg:shrink-0 lg:h-[530px]">
        {VIEWS.map((t, i) => (
          <button key={i} onClick={() => setImg(i)} aria-label={`Show view ${i + 1}`} aria-pressed={img === i}
            className={`bg-soft rounded-[16px] lg:rounded-[20px] overflow-hidden border h-[106px] flex-1 lg:h-auto lg:min-h-0 ${img === i ? 'border-black' : 'border-transparent'}`}>
            <span className="block w-full h-full p-3 lg:p-4 overflow-hidden">
              <ProductImg p={p} className="w-full h-full object-contain mix-blend-multiply" style={{ transform: `scale(${t.s})`, transformOrigin: t.o }} />
            </span>
          </button>
        ))}
      </div>
      <div className="order-1 lg:order-2 bg-soft rounded-[20px] overflow-hidden aspect-[358/288] lg:aspect-auto lg:h-[530px] lg:flex-1 lg:min-w-0">
        <div className="w-full h-full p-6 lg:p-10 overflow-hidden">
          <ProductImg p={p} alt={p.title} loading="eager" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500" style={{ transform: `scale(${v.s})`, transformOrigin: v.o }} />
        </div>
      </div>
    </div>
  )
}

function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useOutside(open, () => setOpen(false))
  return (
    <div ref={ref} className="relative hidden lg:block">
      <button onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open} className="pill h-12 pl-6 pr-5 flex items-center gap-4 font-medium">{SORTS[value]}<ChevronDownIcon className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} /></button>
      {open && (
        <ul role="listbox" className="absolute right-0 z-20 mt-2 w-44 bg-white rounded-2xl border border-black/10 shadow-lg py-1">
          {Object.entries(SORTS).map(([k, t]) => <li key={k} role="option" aria-selected={k === value}><button onClick={() => { onChange(k); setOpen(false) }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-panel ${k === value ? 'font-bold' : 'text-black/70'}`}>{t}</button></li>)}
        </ul>
      )}
    </div>
  )
}

function ReviewCard({ r }) {
  const [menu, setMenu] = useState(false), [reported, setReported] = useState(false)
  const ref = useOutside(menu, () => setMenu(false))
  return (
    <li className="border border-black/10 rounded-[20px] px-6 py-6 lg:px-8 lg:py-7 relative">
      <div className="flex items-start justify-between">
        <Stars r={r.rate} big />
        <div ref={ref} className="relative -mr-1 -mt-1">
          <button onClick={() => setMenu(!menu)} aria-label="More options" aria-haspopup="menu" aria-expanded={menu} className="p-1 text-black/40 hover:text-black"><DotsIcon className="w-6 h-6" /></button>
          {menu && <div role="menu" className="absolute right-0 z-10 mt-1 bg-white rounded-xl border border-black/10 shadow-lg py-1 w-40"><button role="menuitem" onClick={() => { setReported(true); setMenu(false) }} className="w-full text-left px-4 py-2 text-sm hover:bg-panel">Report review</button></div>}
        </div>
      </div>
      <p className="font-bold text-lg lg:text-xl leading-[27px] mt-3 lg:mt-3.5 flex items-center gap-1.5">{r.name}<VerifiedIcon /></p>
      <p className="text-black/60 text-sm lg:text-base leading-5 lg:leading-[22px] mt-2 lg:mt-2.5">"{r.text}"</p>
      <p className="text-black/60 text-sm lg:text-base font-medium mt-5 lg:mt-6">{reported ? 'Reported — thanks, we’ll take a look.' : `Posted on ${fmtDate(r.date)}`}</p>
    </li>
  )
}

function ReviewModal({ onClose, onSubmit }) {
  const [name, setName] = useState(''), [rate, setRate] = useState(5), [text, setText] = useState('')
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k) }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="rv-t">
      <button aria-label="Close" className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={e => { e.preventDefault(); onSubmit({ name: name.trim(), rate, text: text.trim() }) }} className="relative bg-white w-full max-w-lg rounded-t-[20px] sm:rounded-[20px] p-6 lg:p-8">
        <div className="flex items-center justify-between"><h2 id="rv-t" className="text-2xl font-bold">Write a Review</h2><button type="button" aria-label="Close" onClick={onClose}><CloseIcon /></button></div>
        <div className="mt-5 text-sm text-black/60">Your rating</div>
        <div className="flex gap-1 mt-2">{[1, 2, 3, 4, 5].map(n => <button type="button" key={n} onClick={() => setRate(n)} aria-label={`${n} stars`} aria-pressed={rate === n} className={n <= rate ? '' : 'opacity-25 grayscale'}><svg viewBox="0 0 24 24" className="w-8 h-8"><path d="M12 1.6l3.1 7.1 7.7.7-5.8 5.1 1.7 7.5L12 18l-6.7 3.9 1.7-7.5L1.2 9.4l7.7-.7z" fill="#FFC633" /></svg></button>)}</div>
        <label className="block mt-5 text-sm text-black/60">Your name<input required maxLength={30} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jamie R." className="pill mt-2 w-full h-12 px-5 text-base text-black outline-none" /></label>
        <label className="block mt-4 text-sm text-black/60">Your review<textarea required maxLength={400} rows={4} value={text} onChange={e => setText(e.target.value)} placeholder="What did you like or dislike?" className="bg-panel rounded-[20px] mt-2 w-full px-5 py-3 text-base text-black outline-none resize-none" /></label>
        <button className="btn w-full h-12 mt-6">Post review</button>
      </form>
    </div>
  )
}

function Reviews({ p }) {
  const desktop = useDesktop()
  const [list, setList] = useState(SEED), [sort, setSort] = useState('latest'), [min, setMin] = useState(0)
  const [extra, setExtra] = useState(0), [filters, setFilters] = useState(false), [modal, setModal] = useState(false)
  const shown = (desktop ? 6 : 3) + extra
  const rows = useMemo(() => {
    const a = list.filter(r => r.rate >= min)
    if (sort === 'oldest') return a.reverse()
    if (sort === 'high') return a.sort((x, y) => y.rate - x.rate)
    if (sort === 'low') return a.sort((x, y) => x.rate - y.rate)
    return a
  }, [list, sort, min])
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mt-5 lg:mt-[26px]">
        <h2 className="text-2xl font-bold leading-8">All Reviews <span className="text-base font-normal text-black/60">({p.rating.count + list.length - SEED.length})</span></h2>
        <div className="flex items-center gap-2.5 lg:gap-2.5 shrink-0">
          <button onClick={() => setFilters(!filters)} aria-label="Filter reviews" aria-expanded={filters} className={`pill w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center ${min ? 'ring-2 ring-black' : ''}`}><SlidersIcon className="w-5 h-5 lg:w-6 lg:h-6" /></button>
          <SortMenu value={sort} onChange={setSort} />
          <button onClick={() => setModal(true)} className="btn h-10 lg:h-12 px-5 lg:px-6 text-sm lg:text-base whitespace-nowrap">Write a Review</button>
        </div>
      </div>
      {filters && (
        <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
          <span className="text-black/60 mr-1">Show:</span>
          {[[0, 'All ratings'], [4, '4★ & up'], [3, '3★ & up']].map(([v, t]) => <button key={v} onClick={() => setMin(v)} aria-pressed={min === v} className={`rounded-full px-4 py-2 ${min === v ? 'bg-black text-white' : 'bg-panel text-black/60'}`}>{t}</button>)}
          <select aria-label="Sort reviews" value={sort} onChange={e => setSort(e.target.value)} className="lg:hidden pill px-4 py-2 outline-none">{Object.entries(SORTS).map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select>
        </div>
      )}
      <ul className="grid lg:grid-cols-2 gap-4 lg:gap-5 mt-5 lg:mt-6">{rows.slice(0, shown).map(r => <ReviewCard key={r.id} r={r} />)}</ul>
      {rows.length === 0 && <p className="text-center text-black/60 mt-8">No reviews match this filter.</p>}
      {shown < rows.length && <div className="text-center mt-6 lg:mt-9"><button onClick={() => setExtra(extra + (desktop ? 4 : 3))} className="border border-black/10 rounded-full h-[46px] lg:h-[52px] px-8 lg:px-0 lg:w-[230px] font-medium hover:bg-black hover:text-white transition-colors">Load More Reviews</button></div>}
      {modal && <ReviewModal onClose={() => setModal(false)} onSubmit={({ name, rate, text }) => { setList(l => [{ id: `u${Date.now()}`, name, rate, text, date: new Date().toISOString().slice(0, 10) }, ...l]); setModal(false); setSort('latest'); setMin(0) }} />}
    </div>
  )
}

export default function Product() {
  const { id } = useParams()
  const d = useDispatch()
  const { items, status, error } = useSelector(s => s.products)
  const p = items.find(x => x.id === +id)
  const [img, setImg] = useState(0), [ci, setCi] = useState(0), [size, setSize] = useState('Large'), [qty, setQty] = useState(1)
  const [tab, setTab] = useState('reviews'), [added, setAdded] = useState(false), [faq, setFaq] = useState(0), [full, setFull] = useState(false)
  useEffect(() => { setImg(0); setCi(0); setSize('Large'); setQty(1); setTab('reviews'); setAdded(false); setFull(false) }, [id])
  if (!p) return items.length === 0 ? <Status status={status} error={error} /> : <div className="wrap py-20 text-center">Product not found. <Link to="/shop" className="underline">Back to shop</Link></div>
  const title = p.title.trim()
  const colors = colorsFor(p)
  const related = [...items.filter(x => x.category === p.category && x.id !== p.id), ...items.filter(x => x.category !== p.category)].slice(0, 4)
  const addToCart = () => {
    d(add({ id: p.id, title, image: p.image, price: Math.round(p.price), size, color: colors[ci].name, qty }))
    setAdded(true); setTimeout(() => setAdded(false), 1800)
  }
  // long API titles would overflow at the design's 40px, so scale the heading with its length
  const tSize = title.length <= 28 ? 'text-[25px] md:text-[40px] leading-[27px] md:leading-[44px]' : title.length <= 50 ? 'text-[22px] md:text-[32px] leading-[26px] md:leading-[38px]' : 'text-[19px] md:text-[26px] leading-[23px] md:leading-[32px]'
  const divider = 'border-t border-black/10'
  const label = 'text-base leading-[22px] text-black/60 mb-2.5 lg:mb-3'
  const tabs = [['details', 'Product Details'], ['reviews', 'Rating & Reviews'], ['faqs', 'FAQs']]
  return (
    <div className="wrap pb-16">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: CATS[p.category] || p.category, to: `/shop?category=${encodeURIComponent(p.category)}` }, { label: title }]} />
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
        <Gallery p={p} img={img} setImg={setImg} />
        <div className="lg:flex-1 min-w-0">
          <h1 className={`head break-words lg:mt-[7px] ${tSize}`}>{title}</h1>
          <div className="flex items-center gap-3 mt-1.5 lg:mt-3"><Stars r={p.rating.rate} big /><span className="text-sm lg:text-base leading-none">{p.rating.rate.toFixed(1)}<span className="text-black/60">/5</span></span></div>
          <div className="mt-3 lg:mt-5"><Price p={p} big /></div>
          <div className="mt-4 lg:mt-[18px] pb-5 lg:pb-[18px]">
            <p className={`text-black/60 text-sm lg:text-base leading-5 lg:leading-[22px] ${full ? '' : 'line-clamp-3'}`}>{p.description}</p>
            {p.description.length > 170 && <button onClick={() => setFull(!full)} aria-expanded={full} className="text-sm font-medium underline underline-offset-2 mt-1.5">{full ? 'Show less' : 'Read more'}</button>}
          </div>
          <div className={`${divider} pt-5 pb-5 lg:pb-6`}>
            <div className={label} id="colors-l">Select Colors</div>
            <div className="flex gap-3.5 lg:gap-4" role="radiogroup" aria-labelledby="colors-l">
              {colors.map((c, i) => (
                <button key={c.name} role="radio" aria-checked={ci === i} aria-label={c.name} onClick={() => setCi(i)} style={{ background: c.hex }}
                  className={`w-[37px] h-[37px] rounded-full flex items-center justify-center border ${c.name === 'White' ? 'border-black/20' : 'border-black/10'}`}>
                  {ci === i && <CheckIcon className={`w-4 h-4 ${c.name === 'White' ? 'text-black' : 'text-white'}`} />}
                </button>
              ))}
            </div>
          </div>
          <div className={`${divider} pt-5 pb-5 lg:pb-6`}>
            <div className={label} id="size-l">Choose Size</div>
            <div className="flex flex-wrap gap-2 lg:gap-3" role="radiogroup" aria-labelledby="size-l">
              {SIZES.map(s => <button key={s} role="radio" aria-checked={size === s} onClick={() => setSize(s)} className={`rounded-full h-10 lg:h-[46px] px-5 lg:px-6 text-sm lg:text-base transition-colors ${size === s ? 'bg-black text-white' : 'bg-panel text-black/60 hover:bg-black/10'}`}>{s}</button>)}
            </div>
          </div>
          <div className={`${divider} pt-5 lg:pt-6 flex gap-3 lg:gap-5`}>
            <div className="pill flex items-center justify-between w-[110px] lg:w-[170px] px-4 lg:px-5 h-11 lg:h-[52px] shrink-0">
              <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-0.5"><MinusIcon className="w-5 h-5 lg:w-6 lg:h-6" /></button>
              <span className="text-sm lg:text-base font-medium" aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="p-0.5"><PlusIcon className="w-5 h-5 lg:w-6 lg:h-6" /></button>
            </div>
            <button onClick={addToCart} className="btn flex-1 h-11 lg:h-[52px] text-sm lg:text-base hover:bg-black/85 active:scale-[.99] transition">{added ? 'Added ✓' : 'Add to Cart'}</button>
          </div>
          {added && <p role="status" className="text-sm text-black/60 mt-3">Added to your cart. <Link to="/cart" className="text-black font-medium underline">View cart</Link></p>}
        </div>
      </div>

      <div role="tablist" aria-label="Product information" className="flex justify-between lg:justify-stretch border-b border-black/10 mt-7 lg:mt-[54px]">
        {tabs.map(([k, t]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className="lg:flex-1 -mb-px text-base lg:text-xl leading-[22px] lg:leading-[27px] whitespace-nowrap">
            <span className={`block border-b-2 py-4 lg:py-5 px-3 -mx-3 lg:mx-0 lg:px-0 ${tab === k ? 'border-black text-black font-medium' : 'border-transparent text-black/60 hover:text-black'}`}>{t}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'reviews' && <Reviews key={p.id} p={p} />}
        {tab === 'details' && (
          <div className="pt-6 lg:pt-8 max-w-3xl">
            <p className="text-black/60 leading-[22px]">{p.description}</p>
            <dl className="mt-6 border border-black/10 rounded-[20px] divide-y divide-black/10 px-6">
              {[['Category', CATS[p.category] || p.category], ['Rating', `${p.rating.rate.toFixed(1)} / 5 from ${p.rating.count} reviews`], ['Available sizes', SIZES.join(', ')], ['Available colors', colors.map(c => c.name).join(', ')], ['Item number', `#${String(p.id).padStart(5, '0')}`]].map(([k, v]) => <div key={k} className="flex justify-between gap-6 py-4"><dt className="text-black/60">{k}</dt><dd className="font-medium text-right">{v}</dd></div>)}
            </dl>
          </div>
        )}
        {tab === 'faqs' && (
          <ul className="mt-6 lg:mt-8 max-w-3xl border border-black/10 rounded-[20px] divide-y divide-black/10 px-6">
            {FAQS.map(([q, a], i) => (
              <li key={q}>
                <button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i} className="w-full flex items-center justify-between gap-4 py-5 text-left text-lg font-bold">{q}<ChevronDownIcon className={`w-5 h-5 shrink-0 transition-transform ${faq === i ? 'rotate-180' : ''}`} /></button>
                {faq === i && <p className="pb-5 text-black/60 leading-[22px]">{a}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2 className="head text-[32px] leading-[36px] lg:text-5xl lg:leading-[58px] text-center text-balance mt-12 lg:mt-[70px] mb-6 lg:mb-[50px]">You might also like</h2>
      <div className="no-scrollbar flex gap-4 lg:grid lg:grid-cols-4 lg:gap-5 overflow-x-auto -mx-4 px-4 md:-mx-8 md:px-8 lg:mx-0 lg:px-0 lg:overflow-visible">
        {related.map(r => <div key={r.id} className="w-[198px] md:w-[260px] lg:w-auto shrink-0 lg:shrink"><ProductCard p={r} /></div>)}
      </div>
    </div>
  )
}
