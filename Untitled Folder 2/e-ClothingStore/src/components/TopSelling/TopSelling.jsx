import { useRef, useState } from 'react'
import { useGetAllProductsQuery } from '../../api/dummyDataApi'
import { Link } from 'react-router'

function TopSelling() {
  const { data, isLoading, isError } = useGetAllProductsQuery()

  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef(null)

  if (isLoading) {
    return <p>Loading products...</p>
  }

  if (isError) {
    return <p>Something went wrong.</p>
  }

  const productsToShow = showAll
    ? data.products
    : data.products.slice(4, 8)

  const handleViewClick = () => {
    if (showAll) {
      setShowAll(false)

      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 0)
    } else {
      setShowAll(true)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="px-10 py-16"
    >

      <h2 className="mb-16 text-center text-5xl font-black">
        TOP SELLING
      </h2>

      <div className="grid grid-cols-4 gap-10">

        {productsToShow.map((product) => (
          <Link
            key={product.id}
            className="overflow-hidden rounded-2xl bg-[#F2F2F2] p-4 cursor pointer"
            onClick={() => window.location.href = `/product/${product.id}`}
          >

            <img
              src={product.images[0]}
              alt={product.title}
              className="h-80 w-full rounded-xl object-cover"
            />

            <h3 className="mt-4 text-xl font-bold">
              {product.title}
            </h3>

            <p className="mt-2 text-sm">
              ⭐ {product.rating}
            </p>

            <p className="mt-2 text-2xl font-black">
              ${product.price}
            </p>

          </Link>
        ))}

      </div>

      <div className="mt-12 flex justify-center">

        <button
          onClick={handleViewClick}
          className="rounded-full border border-gray-300 px-12 py-4"
        >
          {showAll ? 'View Less' : 'View All'}
        </button>

      </div>

    </section>
  )
}

export default TopSelling