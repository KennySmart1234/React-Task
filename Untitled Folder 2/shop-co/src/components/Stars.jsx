// Gold SVG stars (no empty stars - matches the design). Half stars are drawn with a gradient.
const STAR = 'M12 1.6l3.1 7.1 7.7.7-5.8 5.1 1.7 7.5L12 18l-6.7 3.9 1.7-7.5L1.2 9.4l7.7-.7z'
const Star = ({ cls, half }) => (
  <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
    {half && <defs><linearGradient id="halfstar" x1="0" x2="1" y1="0" y2="0"><stop offset="50%" stopColor="#FFC633" /><stop offset="50%" stopColor="#FFC633" stopOpacity="0" /></linearGradient></defs>}
    <path d={STAR} fill={half ? 'url(#halfstar)' : '#FFC633'} strokeLinejoin="round" />
  </svg>
)
// `big` = 24px stars (product page / reviews); default = 17px on mobile, 20px on desktop (cards)
export default function Stars({ r, big }) {
  const v = Math.round(r * 2) / 2
  const cls = big ? 'w-[19px] h-[19px] md:w-6 md:h-6' : 'w-[17px] h-[17px] lg:w-5 lg:h-5'
  return (
    <span className={`inline-flex items-center ${big ? 'gap-[4px] md:gap-[5px]' : 'gap-[3px] lg:gap-1'}`} role="img" aria-label={`${v} out of 5 stars`}>
      {Array.from({ length: Math.floor(v) }, (_, i) => <Star key={i} cls={cls} />)}
      {v % 1 !== 0 && <Star cls={cls} half />}
    </span>
  )
}
