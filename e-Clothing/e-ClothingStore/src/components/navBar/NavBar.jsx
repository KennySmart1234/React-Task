import logo from '/icons/SHOP.CO.svg'
import SearchBar from './SearchBar'
import cart from '/icons/cart-icon.svg'
import profile from '/icons/user-icon.svg'
import dropdown from '/icons/drop-down-icon.svg'

const NavBar = () => {
  return (
    <div className='relative flex m-10 p-3 items-center justify-between bg-red-200'>
        <img src={logo} alt="SHOP.CO LOGO" />
        
        <ul className='flex items-center gap-6'>
            
            
            <li className='relative group'>
            <button className='flex items-center gap-1 py-2'>
                Shop 
                <img src={dropdown} alt="v" className='w-3 h-3 group-hover:rotate-180 transition-transform' />
            </button>
            
            </li>

            <li><button className='py-2'>On Sale</button></li>
            <li><button className='py-2'>New Arrivals</button></li>
            <li><button className='py-2'>Brands</button></li>
        </ul>

        <SearchBar/>
        
        <div className='flex items-center gap-4'>
            <img src={cart} alt="Cart" className='cursor-pointer' />
            <img src={profile} alt="Profile" className='cursor-pointer' />
        </div>
    </div>
  )
}

export default NavBar