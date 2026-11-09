import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CartIcon, UserIcon, SearchIcon, MenuIcon, MailIcon, CloseIcon } from './Icons'

const cats = ["men's clothing", "women's clothing", 'jewelery', 'electronics']
function Header() {
  const [bar, setBar] = useState(true)
  const [menu, setMenu] = useState(false)
  const [mSearch, setMSearch] = useState(false)
  const nav = useNavigate()
  const count = useSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0))
  const search = e => { e.preventDefault(); const q = new FormData(e.target).get('q'); setMSearch(false); nav(`/shop?q=${encodeURIComponent(q)}`) }
  const links = [['Shop', '/shop'], ['On Sale', '/shop?sale=1'], ['New Arrivals', '/shop?sort=new'], ['Brands', '/#brands']]
  return (
    <>
      {bar && (
        <div className="bg-black text-white text-xs md:text-sm py-2 text-center relative px-8">
          Sign up and get 20% off to your first order. <a href="#news" className="underline font-medium">Sign Up Now</a>
          <button aria-label="Close" onClick={() => setBar(false)} className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 hidden md:block"><CloseIcon className="w-4 h-4" /></button>
        </div>
      )}
      <header className="border-b border-black/10 sticky top-0 bg-white z-30">
        <div className="wrap flex items-center gap-3 md:gap-10 h-[60px] md:h-[76px]">
          <button className="lg:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}><MenuIcon /></button>
          <Link to="/" className="head text-[22px] md:text-[32px] tracking-tight">SHOP.CO</Link>
          <nav className="hidden lg:flex gap-6 text-base">
            <div className="relative group">
              <Link to="/shop" className="flex items-center gap-1">Shop <span className="text-[10px]">▼</span></Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-xl p-3 top-full w-48 z-40">
                {cats.map(c => <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="block py-1.5 capitalize hover:font-bold">{c}</Link>)}
              </div>
            </div>
            {links.slice(1).map(([t, h]) => <Link key={t} to={h}>{t}</Link>)}
          </nav>
          <form onSubmit={search} className="hidden lg:flex pill flex-1 items-center gap-3 px-4 h-12 max-w-[577px]">
            <SearchIcon className="w-5 h-5 text-black/40" />
            <input name="q" placeholder="Search for products..." className="bg-transparent outline-none flex-1" />
          </form>
          <div className="flex items-center gap-3 ml-auto">
            <button className="lg:hidden" aria-label="Search" onClick={() => setMSearch(!mSearch)}><SearchIcon /></button>
            <NavLink to="/cart" className="relative" aria-label="Cart">
              <CartIcon />
              {count > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{count}</span>}
            </NavLink>
            <UserIcon />
          </div>
        </div>
        {mSearch && (
          <form onSubmit={search} className="lg:hidden wrap pb-3"><div className="pill flex items-center gap-3 px-4 h-11"><SearchIcon className="w-5 h-5 text-black/40" /><input name="q" autoFocus placeholder="Search for products..." className="bg-transparent outline-none flex-1" /></div></form>
        )}
        {menu && (
          <nav className="lg:hidden wrap pb-4 flex flex-col gap-3">
            {[...links, ...cats.map(c => [c, `/shop?category=${encodeURIComponent(c)}`])].map(([t, h]) => <Link key={t} to={h} onClick={() => setMenu(false)} className="capitalize">{t}</Link>)}
          </nav>
        )}
      </header>
    </>
  )
}
function Footer() {
  const cols = { Company: ['About', 'Features', 'Works', 'Career'], Help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'], FAQ: ['Account', 'Manage Deliveries', 'Orders', 'Payments'], Resources: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] }
  return (
    <div className="bg-soft mt-[-90px] md:mt-[-108px] pt-[90px] md:pt-[108px]" id="news">
      <div className="wrap relative">
        <div className="bg-black rounded-[20px] md:rounded-[24px] px-6 py-8 md:px-16 md:py-9 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <h2 className="head text-white text-[32px] md:text-[40px] lg:max-w-[551px]">Stay upto date about our latest offers</h2>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3 w-full lg:w-[349px]">
            <label className="bg-white rounded-full flex items-center gap-3 px-4 h-12"><MailIcon className="w-5 h-5 text-black/40" /><input type="email" required placeholder="Enter your email address" className="outline-none flex-1 bg-transparent" /></label>
            <button className="bg-white rounded-full h-12 font-medium">Subscribe to Newsletter</button>
          </form>
        </div>
      </div>
      <footer className="wrap pt-10 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-8">
          <div className="col-span-2 lg:col-span-1 max-w-[248px] lg:max-w-none">
            <div className="head text-[32px]">SHOP.CO</div>
            <p className="text-black/60 text-sm mt-4 max-w-[248px]">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
            <div className="flex gap-3 mt-6">{['t', 'f', 'i', 'g'].map((s, i) => <span key={s} className={`w-7 h-7 rounded-full border border-black/20 flex items-center justify-center text-xs font-bold ${i === 1 ? 'bg-black text-white' : 'bg-white'}`}>{s}</span>)}</div>
          </div>
          {Object.entries(cols).map(([h, ls]) => (
            <div key={h}><h4 className="tracking-[.2em] uppercase font-medium mb-4">{h}</h4>{ls.map(l => <a key={l} href="#" className="block text-black/60 mb-3">{l}</a>)}</div>
          ))}
        </div>
        <div className="border-t border-black/10 mt-8 pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-black/60">
          <span>Shop.co © 2000-2023, All Rights Reserved</span>
          <div className="flex gap-3">{['VISA', 'MC', 'PayPal', 'Pay', 'GPay'].map(p => <span key={p} className="bg-white rounded-md px-2.5 h-7 flex items-center text-[10px] font-bold text-black">{p}</span>)}</div>
        </div>
      </footer>
    </div>
  )
}
export default function Layout() {
  return <><Header /><main className="min-h-[60vh] bg-white relative z-10"><Outlet /></main><Footer /></>
}
