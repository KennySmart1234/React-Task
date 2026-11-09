import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CartIcon, UserIcon, SearchIcon, MenuIcon, MailIcon, CloseIcon, ChevronDownIcon, TwitterIcon, FacebookIcon, InstagramIcon, GithubIcon } from './Icons'
import { fetchProducts } from '../store'

const cats = ["men's clothing", "women's clothing", 'jewelery', 'electronics']
function Header() {
  const [bar, setBar] = useState(true)
  const [menu, setMenu] = useState(false)
  const [mSearch, setMSearch] = useState(false)
  const nav = useNavigate()
  const { pathname } = useLocation()
  const count = useSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0))
  const search = e => { e.preventDefault(); const q = new FormData(e.target).get('q'); setMSearch(false); setMenu(false); nav(`/shop?q=${encodeURIComponent(q)}`) }
  const links = [['Shop', '/shop'], ['On Sale', '/shop?sale=1'], ['New Arrivals', '/shop?sort=new'], ['Brands', '/#brands']]
  const line = pathname === '/' ? '' : 'border-b border-black/10'
  return (
    <>
      {bar && (
        <div className="bg-black text-white text-xs md:text-sm h-[34px] md:h-[38px]">
          <div className="wrap relative h-full flex items-center justify-center">
            <p>Sign up and get 20% off to your first order. <a href="#news" className="underline underline-offset-2 font-medium">Sign Up Now</a></p>
            <button aria-label="Close announcement" onClick={() => setBar(false)} className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block p-1"><CloseIcon className="w-5 h-5" /></button>
          </div>
        </div>
      )}
      <header className="sticky top-0 bg-white z-30">
        <div className="wrap">
          <div className={`flex items-center gap-3 lg:gap-10 h-[63px] lg:h-24 ${line}`}>
            <button className="lg:hidden -mr-1" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><MenuIcon /></button>
            <Link to="/" className="head text-[25px] lg:text-[32px] leading-none tracking-tight" aria-label="SHOP.CO home">SHOP.CO</Link>
            <nav className="hidden lg:flex gap-6 text-base whitespace-nowrap" aria-label="Main">
              <div className="relative group">
                <Link to="/shop" className="flex items-center gap-1">Shop <ChevronDownIcon className="w-4 h-4" /></Link>
                <div className="absolute hidden group-hover:block group-focus-within:block bg-white shadow-lg rounded-xl p-3 top-full w-48 z-40">
                  {cats.map(c => <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="block py-1.5 capitalize hover:font-bold">{c}</Link>)}
                </div>
              </div>
              {links.slice(1).map(([t, h]) => <NavLink key={t} to={h}>{t}</NavLink>)}
            </nav>
            <form onSubmit={search} role="search" className="hidden lg:flex pill flex-1 items-center gap-3 px-4 h-12 max-w-[577px]">
              <SearchIcon className="w-6 h-6 text-black/40 shrink-0" />
              <input name="q" aria-label="Search for products" placeholder="Search for products..." className="bg-transparent outline-none flex-1 min-w-0 placeholder:text-black/40" />
            </form>
            <div className="flex items-center gap-3 lg:gap-3.5 ml-auto">
              <button className="lg:hidden" aria-label="Search" onClick={() => setMSearch(!mSearch)}><SearchIcon /></button>
              <NavLink to="/cart" className="relative" aria-label={`Cart, ${count} items`}>
                <CartIcon />
                {count > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">{count}</span>}
              </NavLink>
              <button aria-label="Account"><UserIcon /></button>
            </div>
          </div>
        </div>
        {mSearch && (
          <form onSubmit={search} role="search" className="lg:hidden wrap pb-3"><div className="pill flex items-center gap-3 px-4 h-11"><SearchIcon className="w-5 h-5 text-black/40" /><input name="q" autoFocus aria-label="Search for products" placeholder="Search for products..." className="bg-transparent outline-none flex-1" /></div></form>
        )}
        {menu && (
          <nav className="lg:hidden wrap pb-4 flex flex-col gap-3 bg-white shadow-md" aria-label="Mobile">
            {[...links, ...cats.map(c => [c, `/shop?category=${encodeURIComponent(c)}`])].map(([t, h]) => <Link key={t} to={h} onClick={() => setMenu(false)} className="capitalize">{t}</Link>)}
          </nav>
        )}
      </header>
    </>
  )
}

function OfflineNotice() {
  const offline = useSelector(s => s.products.offline)
  const d = useDispatch()
  if (!offline) return null
  return (
    <div role="status" className="bg-amber-50 text-amber-900 text-xs md:text-sm text-center px-4 py-2">
      The live product API is unreachable, so you’re seeing the built-in catalog. <button onClick={() => d(fetchProducts())} className="underline font-medium">Retry</button>
    </div>
  )
}

const pay = 'bg-white rounded-md w-[38px] h-[26px] lg:w-[46px] lg:h-[30px] flex items-center justify-center shadow-[0_0_0_1px_rgba(0,0,0,.04)]'
function Footer() {
  const cols = { Company: ['About', 'Features', 'Works', 'Career'], Help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'], FAQ: ['Account', 'Manage Deliveries', 'Orders', 'Payments'], Resources: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] }
  const social = [[TwitterIcon, 'Twitter'], [FacebookIcon, 'Facebook'], [InstagramIcon, 'Instagram'], [GithubIcon, 'GitHub']]
  return (
    <div id="news" className="mt-16 lg:mt-20">
      {/* white top half / grey bottom half, split exactly through the middle of the black card */}
      <div className="bg-gradient-to-b from-white from-50% to-soft to-50%">
        <div className="wrap">
          <div className="bg-black rounded-[20px] px-6 py-8 lg:px-16 lg:py-[35px] flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 justify-between">
            <h2 className="head text-white text-[32px] leading-[36px] lg:text-[40px] lg:leading-[45px] lg:max-w-[560px]">Stay upto date about our latest offers</h2>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3.5 w-full lg:w-[349px] shrink-0">
              <label className="bg-white rounded-full flex items-center gap-3 px-4 h-12"><MailIcon className="w-6 h-6 text-black/40 shrink-0" /><input type="email" required aria-label="Email address" placeholder="Enter your email address" className="outline-none flex-1 min-w-0 bg-transparent placeholder:text-black/40" /></label>
              <button className="bg-white rounded-full h-12 font-medium hover:bg-white/90">Subscribe to Newsletter</button>
            </form>
          </div>
        </div>
      </div>
      <footer className="bg-soft">
        <div className="wrap pt-8 lg:pt-12 pb-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:flex lg:justify-between lg:gap-0">
            <div className="col-span-2 lg:col-span-1 lg:w-[248px]">
              <div className="head text-[29px] lg:text-[33px] leading-none tracking-tight">SHOP.CO</div>
              <p className="text-black/60 text-sm leading-[22px] mt-4 lg:mt-6 max-w-[248px]">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
              <div className="flex gap-3 mt-5 lg:mt-8">
                {social.map(([Ic, n]) => <a key={n} href="#" aria-label={n} className={`w-7 h-7 rounded-full border flex items-center justify-center ${n === 'Facebook' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/20'}`}><Ic /></a>)}
              </div>
            </div>
            {Object.entries(cols).map(([h, ls]) => (
              <div key={h}>
                <h4 className="tracking-[.2em] uppercase text-sm lg:text-base mb-4 lg:mb-6">{h}</h4>
                <ul className="space-y-3 lg:space-y-[19px]">{ls.map(l => <li key={l}><a href="#" className="text-black/60 text-sm lg:text-base hover:text-black">{l}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="border-t border-black/10 mt-10 lg:mt-12 pt-5 flex flex-col-reverse lg:flex-row items-center justify-between gap-4 text-sm text-black/60">
            <span>Shop.co © 2000-2023, All Rights Reserved</span>
            <ul className="flex gap-3" aria-label="Accepted payments">
              <li className={pay}><span className="text-[11px] lg:text-[13px] font-black italic text-[#1434CB] tracking-tight">VISA</span></li>
              <li className={pay}><svg width="26" height="16" viewBox="0 0 26 16" aria-label="Mastercard"><circle cx="9" cy="8" r="7" fill="#EB001B" /><circle cx="17" cy="8" r="7" fill="#F79E1B" fillOpacity=".92" /></svg></li>
              <li className={pay}><span className="text-[9px] lg:text-[10.5px] font-bold italic text-[#253B80]">Pay<span className="text-[#179BD7]">Pal</span></span></li>
              <li className={`${pay} gap-0.5 text-black`}><svg viewBox="0 0 24 24" className="w-3 h-3 lg:w-3.5 lg:h-3.5" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg><span className="text-[10px] lg:text-[11px] font-semibold">Pay</span></li>
              <li className={pay}><span className="text-[10px] lg:text-[11px] font-medium text-black/70"><b className="text-[#4285F4]">G</b> Pay</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default function Layout() {
  return <><Header /><OfflineNotice /><main className="min-h-[60vh] bg-white relative z-10"><Outlet /></main><Footer /></>
}
