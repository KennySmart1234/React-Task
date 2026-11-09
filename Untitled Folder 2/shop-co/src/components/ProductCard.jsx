import { Link } from 'react-router-dom'
import Stars from './Stars'
import ProductImg from './ProductImg'
import { disc, price, oldPrice } from '../lib'

export function Price({ p, big }) {
  const o = oldPrice(p)
  return (
    <div className={`flex items-center flex-wrap font-bold leading-none ${big ? 'gap-2.5 text-[24px] md:text-[32px] gap-y-2' : 'gap-x-2.5 gap-y-1 text-xl lg:text-2xl'}`}>
      <span>${price(p)}</span>
      {o > 0 && (
        <>
          <s className="text-black/30">${o}</s>
          <span className={`font-medium text-red bg-red/10 rounded-full ${big ? 'text-sm md:text-base px-3.5 py-1.5 md:py-2' : 'text-xs px-3.5 py-1.5'}`}>-{disc(p)}%</span>
        </>
      )}
    </div>
  )
}
export default function ProductCard({ p }) {
  return (
    <Link to={`/product/${p.id}`} className="block min-w-0 group">
      <div className="bg-soft rounded-[13px] lg:rounded-[20px] aspect-[295/298] flex items-center justify-center p-5 lg:p-8 overflow-hidden">
        <ProductImg p={p} alt={p.title} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
      </div>
      <h3 className="font-bold mt-2.5 lg:mt-4 truncate text-base lg:text-xl leading-snug">{p.title.trim()}</h3>
      <div className="flex items-center gap-2 lg:gap-3 mt-1 mb-1 lg:mt-2 lg:mb-2"><Stars r={p.rating.rate} /><span className="text-xs lg:text-sm leading-none">{p.rating.rate.toFixed(1)}<span className="text-black/60">/5</span></span></div>
      <Price p={p} />
    </Link>
  )
}
