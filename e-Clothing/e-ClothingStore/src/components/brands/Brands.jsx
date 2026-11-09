import ck from '/icons/calvin-klein.svg'
import versace from '/icons/versace.svg'
import zara from '/icons/zara-logo-1 1.svg'
import gucci from '/icons/gucci-logo-1 1.svg'
import prada from '/icons/prada-logo-1 1.svg'


const Brands = () => {
  return (
    <div className='flex items-center justify-between  bg-black p-10'>
        
        <img src={versace} alt="VERSACE logo" />
        <img src={zara} alt="ZARA logo" />
        <img src={gucci} alt="GUCCI logo" />
        <img src={prada} alt="PRADA logo" />
        <img src={ck} alt="Calvin Klein logo" />
    </div>
  )
}

export default Brands