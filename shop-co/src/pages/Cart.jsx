import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setQty, remove, setPromo, clear } from '../store'
import { MinusIcon, PlusIcon, TrashIcon, TagIcon, ArrowIcon } from '../components/Icons'
import { PROMOS } from '../lib'

export default function Cart() {
  const d = useDispatch()
  const { items, promo } = useSelector(s => s.cart)
  const [code, setCode] = useState(''), [msg, setMsg] = useState(''), [done, setDone] = useState(false)
  const sub = items.reduce((n, i) => n + i.price * i.qty, 0)
  const discount = Math.round(sub * promo)
  const delivery = items.length ? 15 : 0
  const total = sub - discount + delivery
  const apply = () => {
    const v = PROMOS[code.trim().toUpperCase()]
    if (v) { d(setPromo(v)); setMsg(`Promo applied: -${v * 100}%`) } else { d(setPromo(0)); setMsg('Invalid promo code (try SHOP20)') }
  }
  return (
    <div className="wrap pb-16">
      <div className="py-5 text-black/60 border-t border-black/10 md:border-0"><Link to="/">Home</Link> › <span className="text-black">Cart</span></div>
      <h1 className="head text-[32px] md:text-[40px] mb-5 md:mb-6">Your Cart</h1>
      {done ? (
        <div className="py-16 text-center"><p className="text-2xl font-bold mb-4">Thank you! Your demo order was placed.</p><Link to="/shop" className="btn inline-block px-10 py-3.5">Continue Shopping</Link></div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center"><p className="text-xl mb-4 text-black/60">Your cart is empty.</p><Link to="/shop" className="btn inline-block px-10 py-3.5">Start Shopping</Link></div>
      ) : (
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5 items-start">
          <div className="border border-black/10 rounded-[20px] px-4 md:px-6">
            {items.map(i => (
              <div key={i.key} className="flex gap-3 md:gap-4 py-4 md:py-5 border-b border-black/10 last:border-0">
                <Link to={`/product/${i.id}`} className="bg-soft rounded-[8px] w-[99px] h-[99px] md:w-[124px] md:h-[124px] shrink-0 flex items-center justify-center p-2"><img src={i.image} alt={i.title} className="max-h-full max-w-full object-contain mix-blend-multiply" /></Link>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0"><h3 className="font-bold text-base md:text-xl truncate">{i.title}</h3><p className="text-xs md:text-sm">Size: <span className="text-black/60">{i.size}</span></p><p className="text-xs md:text-sm">Color: <span className="text-black/60">{i.color}</span></p></div>
                    <button aria-label={`Remove ${i.title}`} onClick={() => d(remove(i.key))} className="text-red h-fit"><TrashIcon className="w-5 h-5" /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl md:text-2xl">${i.price * i.qty}</span>
                    <div className="pill flex items-center gap-4 md:gap-6 px-3 md:px-5 h-[34px] md:h-11">
                      <button aria-label="Decrease" onClick={() => d(setQty({ key: i.key, qty: i.qty - 1 }))}><MinusIcon className="w-4 h-4 md:w-5 md:h-5" /></button><span className="text-sm">{i.qty}</span><button aria-label="Increase" onClick={() => d(setQty({ key: i.key, qty: i.qty + 1 }))}><PlusIcon className="w-4 h-4 md:w-5 md:h-5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-black/10 rounded-[20px] p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-5">Order Summary</h2>
            <div className="space-y-4 md:space-y-5 text-lg md:text-xl">
              <div className="flex justify-between"><span className="text-black/60">Subtotal</span><b>${sub}</b></div>
              <div className="flex justify-between"><span className="text-black/60">Discount (-{promo * 100}%)</span><b className="text-red">-${discount}</b></div>
              <div className="flex justify-between"><span className="text-black/60">Delivery Fee</span><b>${delivery}</b></div>
              <div className="flex justify-between border-t border-black/10 pt-4"><span>Total</span><b className="text-xl md:text-2xl">${total}</b></div>
            </div>
            <div className="flex gap-3 mt-5">
              <label className="pill flex items-center gap-3 px-4 h-12 flex-1 min-w-0"><TagIcon className="w-5 h-5 text-black/40 shrink-0" /><input value={code} onChange={e => setCode(e.target.value)} placeholder="Add promo code" className="bg-transparent outline-none w-full min-w-0" /></label>
              <button onClick={apply} className="btn px-8 md:px-12 h-12">Apply</button>
            </div>
            {msg && <p className="text-sm text-black/60 mt-2">{msg}</p>}
            <button onClick={() => { d(clear()); setDone(true) }} className="btn w-full h-[54px] md:h-[60px] mt-5 flex items-center justify-center gap-3">Go to Checkout <ArrowIcon className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
