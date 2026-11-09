import { Link } from 'react-router'

import shopIcon from '../../assets/Vector.png'
import searchIcon from '../../assets/Vector-1.png'
import cartIcon from '../../assets/Vector-4.png'
import userIcon from '../../assets/Vector-5.png'

function Navbar() {
  return (
    <nav className="flex w-full items-center gap-8 px-16 py-6">

      
      <Link
        to=""
        className="shrink-0 text-4xl font-black tracking-tight"
      >
        SHOP.CO
      </Link>

      
      <div className="flex shrink-0 items-center gap-7 text-base">

       
        <Link
          to=""
          className="flex items-center gap-2"
        >
          <span>Shop</span>

          <img
            src={shopIcon}
            alt=""
            className="h-2.5 w-2.5"
          />
        </Link>

        <Link to="">
          On Sale
        </Link>

        <Link to="">
          New Arrivals
        </Link>

        <Link to="">
          Brands
        </Link>

      </div>

      {/* SEARCH */}
      <div className="ml-auto flex w-[300px] items-center rounded-full bg-[#F2F0F1] px-5 py-3">

        <img
          src={searchIcon}
          alt="Search"
          className="mr-3 h-5 w-5"
        />

        <input
          type="text"
          placeholder="Search for products..."
          className="w-full bg-transparent text-sm outline-none"
        />

      </div>

    
      <div className="flex shrink-0 items-center gap-5">

        <Link to="/cart">
          <img
            src={cartIcon}
            alt="Cart"
            className="h-6 w-6"
          />
        </Link>

        <img
          src={userIcon}
          alt="Account"
          className="h-6 w-6"
        />

      </div>

    </nav>
  )
}

export default Navbar






