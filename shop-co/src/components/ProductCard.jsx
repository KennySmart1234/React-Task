import { Link } from 'react-router-dom'
import Stars from './Stars'
import { disc, price, oldPrice } from '../lib'

export function Price({ p, big }) {
  const o = oldPrice(p)
  return (
    <div className={`flex items-center gap-2 flex-wrap font-bold ${big ? 'text-3xl' : 'text-xl lg:text-2xl'}`}>
      <span>${price(p)}</span>
      {o > 0 && <><s className="text-black/40">${o}</s><span className="text-xs font-medium text-red bg-red/10 px-3 py-1.5 rounded-full">-{disc(p)}%</span></>}
    </div>
  )
}
export default function ProductCard({ p }) {
  return (
    <Link to={`/product/${p.id}`} className="block min-w-0">
      <div className="bg-soft rounded-[20px] aspect-square flex items-center justify-center p-6 lg:p-8">
        <img src={p.image} alt={p.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
      </div>
      <h3 className="font-bold mt-3 truncate text-base lg:text-xl">{p.title}</h3>
      <div className="flex items-center gap-2 my-1"><Stars r={p.rating.rate} /><span className="text-sm">{p.rating.rate}<span className="text-black/60">/5</span></span></div>
      <Price p={p} />
    </Link>
  )
}
