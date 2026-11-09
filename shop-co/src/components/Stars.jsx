export default function Stars({ r, big }) {
  return (
    <span className={`relative inline-block leading-none tracking-tight ${big ? 'text-2xl' : 'text-lg'}`}>
      <span className="text-gray-300">★★★★★</span>
      <span className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-[#FFC633]" style={{ width: `${(r / 5) * 100}%` }}>★★★★★</span>
    </span>
  )
}
