import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Status from '../components/Status'
import Stars from '../components/Stars'
import hero from '../assets/hero.jpg'
import brands from '../assets/brands.png'
import casual from '../assets/style-casual.jpg'
import formal from '../assets/style-formal.jpg'
import party from '../assets/style-party.jpg'
import gym from '../assets/style-gym.jpg'

const reviews = [
  ['Sarah M.', "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."],
  ['Alex K.', "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."],
  ['James L.', "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."],
  ['Mooen M.', 'Shop.co has become my go-to for everyday outfits. The fabrics feel great and delivery is always fast.'],
]
function Row({ title, items }) {
  return (
    <section className="wrap py-10 md:py-[72px]">
      <h2 className="head text-[32px] md:text-5xl text-center mb-8 md:mb-14">{title}</h2>
      <div className="flex gap-4 lg:grid lg:grid-cols-4 lg:gap-5 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        {items.map(p => <div key={p.id} className="w-[198px] md:w-[260px] lg:w-auto shrink-0 lg:shrink"><ProductCard p={p} /></div>)}
      </div>
      <div className="text-center mt-8"><Link to="/shop" className="inline-block border border-black/10 rounded-full px-14 py-3.5 font-medium w-full md:w-auto">View All</Link></div>
    </section>
  )
}
export default function Home() {
  const { items, status, error } = useSelector(s => s.products)
  const arrivals = [...items].sort((a, b) => b.id - a.id).slice(0, 4)
  const top = [...items].sort((a, b) => b.rating.count - a.rating.count).slice(0, 4)
  const scroller = useRef()
  const scroll = n => scroller.current.scrollBy({ left: n * 400, behavior: 'smooth' })
  const styles = [['Casual', casual, 'lg:col-span-2 lg:w-[calc(100%)]'], ['Formal', formal, 'lg:col-span-3'], ['Party', party, 'lg:col-span-3'], ['Gym', gym, 'lg:col-span-2']]
  return (
    <>
      <section className="bg-[#F2F0F1]">
        <div className="wrap grid lg:grid-cols-2 items-end">
          <div className="pt-10 lg:py-20 self-center">
            <h1 className="head text-[36px] md:text-[64px] leading-[1.02]">Find clothes that matches your style</h1>
            <p className="text-black/60 text-sm md:text-base mt-5 md:mt-8 max-w-[545px]">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            <Link to="/shop" className="btn block md:inline-block text-center px-16 py-4 mt-6 md:mt-8">Shop Now</Link>
            <div className="grid grid-cols-2 md:flex gap-y-3 mt-6 md:mt-12 md:divide-x divide-black/10 text-center md:text-left justify-items-center md:justify-items-start">
              {[['200+', 'International Brands'], ['2,000+', 'High-Quality Products'], ['30,000+', 'Happy Customers']].map(([n, l], i) => (
                <div key={n} className={`md:px-8 first:pl-0 ${i === 2 ? 'col-span-2' : ''}`}><div className="text-2xl md:text-[40px] font-bold">{n}</div><div className="text-black/60 text-xs md:text-base">{l}</div></div>
              ))}
            </div>
          </div>
          <img src={hero} alt="Two models in stylish outfits" className="w-full max-w-[600px] justify-self-end mx-auto lg:mx-0 mt-4 lg:mt-0" />
        </div>
      </section>
      <div id="brands" className="bg-black py-6 md:py-10"><img src={brands} alt="Versace, Zara, Gucci, Prada, Calvin Klein" className="wrap w-full object-contain" /></div>
      {items.length === 0 ? <Status status={status} error={error} /> : (
        <>
          <Row title="New Arrivals" items={arrivals} />
          <div className="wrap"><hr className="border-black/10" /></div>
          <Row title="Top Selling" items={top} />
        </>
      )}
      <section className="wrap mb-16">
        <div className="bg-soft rounded-[24px] md:rounded-[40px] px-4 py-10 md:px-16 md:py-[70px]">
          <h2 className="head text-[32px] md:text-5xl text-center mb-8 md:mb-16">Browse by dress style</h2>
          <div className="grid lg:grid-cols-5 gap-4 md:gap-5">
            {styles.map(([n, img, cls]) => (
              <Link key={n} to="/shop" className={`relative bg-white rounded-[20px] overflow-hidden h-[190px] md:h-[289px] block ${cls}`}>
                <span className="absolute top-5 left-6 md:top-8 md:left-9 text-2xl md:text-4xl font-bold z-10">{n}</span>
                <img src={img} alt={n} className="absolute right-0 top-0 h-full w-2/3 lg:w-3/4 object-cover object-top" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mb-20">
        <div className="wrap flex items-end justify-between mb-6 md:mb-10">
          <h2 className="head text-[32px] md:text-5xl">Our happy customers</h2>
          <div className="flex gap-4 text-2xl"><button aria-label="Previous" onClick={() => scroll(-1)}>←</button><button aria-label="Next" onClick={() => scroll(1)}>→</button></div>
        </div>
        <div ref={scroller} className="flex gap-4 md:gap-5 overflow-x-auto snap-x px-4 md:px-8 xl:px-[calc((100vw-1240px)/2)]">
          {reviews.map(([n, t]) => (
            <div key={n} className="snap-start shrink-0 w-[310px] md:w-[400px] border border-black/10 rounded-[20px] p-6 md:p-8">
              <Stars r={5} big />
              <div className="font-bold text-lg md:text-xl mt-3 flex items-center gap-2">{n}<span className="w-5 h-5 rounded-full bg-[#01AB31] text-white text-xs flex items-center justify-center">✓</span></div>
              <p className="text-black/60 mt-2 text-sm md:text-base">"{t}"</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
