import search from '/icons/find-icon.svg'

const SearchBar = () => {
  return (
    <div className='  flex items-center border rounded-full  p-2 h-10 w-150'>
        <img src={search} alt="" className='ml-1' />
        <input type="text" placeholder='Search for products...' className=' ml-3 w-full outline-none'  />
    </div>
  )
}

export default SearchBar