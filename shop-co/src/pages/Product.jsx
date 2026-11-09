import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../store'
import Stars from '../components/Stars'
import ProductCard, { Price } from '../components/ProductCard'
import Status from '../components/Status'
import { MinusIcon, PlusIcon } from '../components/Icons'
import { colorsFor, SIZES } from '../lib'

const people = ['Samantha D.', 'Alex M.', 'Ethan R.', 'Olivia P.', 'Liam K.', 'Ava H.', 'Noah B.', 'Mia T.']
const texts = [
  "I absolutely love this! The quality is unique and the finish feels so comfortable. It has become my favorite go-to.",
  "It exceeded my expectations. The look is top-notch and it definitely gets a thumbs up from me.",
  "A must-have for anyone who appreciates good design. The minimalist yet stylish look caught my eye and the fit is perfect.",
  "I value simplicity and functionality. This product represents those principles and feels great to use.",
  "The materials are soft and the design speaks volumes. Like owning a piece of art that reflects my passion.",
  "Every detail feels thoughtful. It has honestly become a conversation starter.",
  "Great value for the price and it arrived quickly. Would happily buy again.",
  "Exactly as described. Solid build and very comfortable to use every day.",
]
const thumbStyle = ['', 'scale-150 origin-top-left', 'scale-150 origin-bottom-right']

export default function Product() {
  const { id } = useParams()
  const d = useDispatch()
  const { items, status, error } = useSelector(s => s.products)
  const p = items.find(x => x.id === +id)
  const [img, setImg] = useState(0), [ci, setCi] = useState(0), [size, setSize] = useState('Large'), [qty, setQty] = useState(1)
  const [tab, setTab] = useState('reviews'), [more, setMore] = useState(false), [added, setAdded] = useState(false)
  if (!p) return items.length === 0 ? <Status status={status} error={error} /> : <div className="wrap py-20 text-center">Product not found. <Link to="/shop" className="underline">Back to shop</Link></div>
  const colors = colorsFor(p)
  const related = [...items.filter(x => x.category === p.category && x.id !== p.id), ...items.filter(x => x.category !== p.category)].slice(0, 4)
  const addToCart = () => {
    d(add({ id: p.id, title: p.title, image: p.image, price: Math.round(p.price), size, color: colors[ci].name, qty }))
    setAdded(true); setTimeout(() => setAdded(false), 1500)
  }
  const shownReviews = people.slice(0, more ? 8 : 6)
  return (
    <div className="wrap pb-16">
      <div className="py-5 text-black/60 border-t border-black/10 md:border-0 capitalize"><Link to="/">Home</Link> › <Link to="/shop">Shop</Link> › <Link to={`/shop?category=${encodeURIComponent(p.category)}`}>{p.category}</Link> › <span className="text-black">{p.title.slice(0, 24)}</span></div>
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-10">
        <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-3.5 lg:w-1/2">
          <div className="flex lg:flex-col gap-3 lg:gap-3.5 lg:w-[152px]">
            {thumbStyle.map((c, i) => (
              <button key={i} onClick={() => setImg(i)} className={`flex-1 lg:flex-none bg-soft rounded-[16px] aspect-square overflow-hidden border ${img === i ? 'border-black' : 'border-transparent'}`}>
                <img src={p.image} alt="" className={`w-full h-full object-contain p-3 mix-blend-multiply ${c}`} />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-soft rounded-[20px] aspect-square lg:aspect-auto lg:min-h-[530px] overflow-hidden flex items-center justify-center">
            <img src={p.image} alt={p.title} className={`max-h-full max-w-full object-contain p-8 mix-blend-multiply transition-transform ${thumbStyle[img] || ''}`} />
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="head text-[26px] md:text-[40px] leading-[1.1]">{p.title}</h1>
          <div className="flex items-center gap-3 my-3"><Stars r={p.rating.rate} big /><span>{p.rating.rate}<span className="text-black/60">/5</span></span></div>
          <Price p={p} big />
          <p className="text-black/60 mt-4 pb-5 border-b border-black/10">{p.description}</p>
          <div className="py-5 border-b border-black/10">
            <div className="text-black/60 mb-3">Select Colors</div>
            <div className="flex gap-4">{colors.map((c, i) => <button key={c.name} aria-label={c.name} onClick={() => setCi(i)} style={{ background: c.hex }} className="w-9 h-9 rounded-full border border-black/20 text-white flex items-center justify-center">{ci === i && <span className={c.name === 'White' ? 'text-black' : ''}>✓</span>}</button>)}</div>
          </div>
          <div className="py-5 border-b border-black/10">
            <div className="text-black/60 mb-3">Choose Size</div>
            <div className="flex flex-wrap gap-3">{SIZES.map(s => <button key={s} onClick={() => setSize(s)} className={`rounded-full px-6 py-3 text-sm md:text-base ${size === s ? 'bg-black text-white' : 'bg-soft text-black/60'}`}>{s}</button>)}</div>
          </div>
          <div className="flex gap-3 pt-5">
            <div className="pill flex items-center justify-between w-[110px] md:w-[170px] px-4 md:px-5 h-12 md:h-[52px]">
              <button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))}><MinusIcon className="w-5 h-5" /></button><span>{qty}</span><button aria-label="Increase" onClick={() => setQty(qty + 1)}><PlusIcon className="w-5 h-5" /></button>
            </div>
            <button onClick={addToCart} className="btn flex-1 h-12 md:h-[52px]">{added ? 'Added ✓' : 'Add to Cart'}</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 text-center mt-12 border-b border-black/10 text-black/60 md:text-xl">
        {[['details', 'Product Details'], ['reviews', 'Rating & Reviews'], ['faqs', 'FAQs']].map(([k, t]) => <button key={k} onClick={() => setTab(k)} className={`py-4 -mb-px border-b-2 ${tab === k ? 'border-black text-black font-medium' : 'border-transparent'}`}>{t}</button>)}
      </div>
      {tab === 'details' && <div className="py-8 text-black/70 max-w-3xl"><p>{p.description}</p><p className="mt-3 capitalize">Category: {p.category}</p></div>}
      {tab === 'faqs' && <div className="py-8 max-w-3xl space-y-5">{[['How long is delivery?', 'Orders arrive within 3–7 business days.'], ['Can I return this item?', 'Yes, within 30 days in original condition.'], ['How do I care for it?', 'Follow the care label; wash cold, dry flat.']].map(([q, a]) => <div key={q}><b>{q}</b><p className="text-black/60">{a}</p></div>)}</div>}
      {tab === 'reviews' && (
        <div className="py-6 md:py-8">
          <div className="flex items-center justify-between mb-5"><h2 className="text-xl md:text-2xl font-bold">All Reviews <span className="text-sm font-normal text-black/60">({p.rating.count})</span></h2><button className="btn px-5 md:px-6 py-3 text-sm md:text-base">Write a Review</button></div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {shownReviews.map((n, i) => (
              <div key={n} className={`border border-black/10 rounded-[20px] p-5 md:p-7 ${i > 2 ? 'hidden md:block' : ''}`}>
                <Stars r={[4.5, 4, 3.5, 4, 4, 4.5, 5, 4][i]} big />
                <div className="font-bold text-lg md:text-xl mt-3 flex items-center gap-2">{n}<span className="w-5 h-5 rounded-full bg-[#01AB31] text-white text-xs flex items-center justify-center">✓</span></div>
                <p className="text-black/60 mt-2 text-sm md:text-base">"{texts[i]}"</p>
                <p className="text-black/60 mt-4 text-sm font-medium">Posted on August {14 + i}, 2023</p>
              </div>
            ))}
          </div>
          {!more && <div className="text-center mt-6"><button onClick={() => setMore(true)} className="border border-black/10 rounded-full px-10 py-3.5 font-medium w-full md:w-auto">Load More Reviews</button></div>}
        </div>
      )}
      <h2 className="head text-[32px] md:text-5xl text-center mt-14 mb-8 md:mb-14">You might also like</h2>
      <div className="flex gap-4 lg:grid lg:grid-cols-4 lg:gap-5 overflow-x-auto pb-2">
        {related.map(r => <div key={r.id} className="w-[198px] md:w-[260px] lg:w-auto shrink-0 lg:shrink"><ProductCard p={r} /></div>)}
      </div>
    </div>
  )
}
