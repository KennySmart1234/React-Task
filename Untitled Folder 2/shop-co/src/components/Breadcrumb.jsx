import { Link } from 'react-router-dom'
import { ChevronIcon } from './Icons'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="pt-5 pb-5 lg:pt-6 lg:pb-9">
      <ol className="flex flex-nowrap items-center gap-x-2 text-base leading-[22px] text-black/60">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={it.label + i} className={`flex items-center gap-2 ${last ? 'min-w-0 text-black' : 'shrink-0'}`}>
              {it.to && !last ? <Link to={it.to} className="hover:text-black">{it.label}</Link> : <span aria-current={last ? 'page' : undefined} className={last ? 'truncate' : ''}>{it.label}</span>}
              {!last && <ChevronIcon className="w-4 h-4 shrink-0" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
