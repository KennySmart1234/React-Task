import bgImage from '/bgImg/Home-Screen-bg.jpg'
import bigStar from '/icons/big-diamond.svg'
import smallStar from '/icons/small-diamond.svg'
import line from '/icons/Line.svg'
import twoH from '/icons/200PLUS.svg'
import twoK from '/icons/2000PLUS.svg'
import tatiK from '/icons/30000PLUS.svg'

const Hero = () => {
  return (
    <div className='w-full bg-[#F2F0F1] flex'>
        
        <div className='w-1/2 p-20 mt-20'>
            <h1 className='text-6xl font-black text-black leading-none'>
                FIND CLOTHES<br />
                THAT MATCHES<br />
                YOUR STYLE
            </h1>

            <p className='mt-6 text-gray-500'>
                Browse through our diverse range of meticulously crafted garments, designed 
                to bring out your individuality and cater to your sense of style.
            </p>

            <button className='bg-black text-white px-12 py-4 rounded-full mt-10 w-55'>
                Shop Now
            </button>

            <div className='flex items-center gap-6 mt-20'>
                <img src={twoH} alt="200+" />
                <img src={line} alt="" />
                <img src={twoK} alt="2000+" />
                <img src={line} alt="" />
                <img src={tatiK} alt="30000+" />
            </div>
        </div>

        <div className='relative w-1/2'>
            <img 
              src={bgImage} 
              alt="Models" 
              className='w-full h-200 object-cover object-top' 
            />

            <img src={smallStar} alt="small star" className='absolute left-10 top-1/2' />
            <img src={bigStar} alt="big star" className='absolute right-10 top-10' />
        </div>

    </div>
  )
}

export default Hero
