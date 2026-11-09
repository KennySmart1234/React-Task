import { useState } from 'react'
import { useParams } from 'react-router'
import { useGetAllProductsQuery } from '../api/dummyDataApi'

function ProductDetails() {
  const { id } = useParams()

  const { data, isLoading, isError } = useGetAllProductsQuery()

  const [selectedColor, setSelectedColor] = useState('black')
  const [selectedSize, setSelectedSize] = useState('Medium')
  const [quantity, setQuantity] = useState(1)

  if (isLoading) {
    return <p className="p-10">Loading product...</p>
  }

  if (isError) {
    return <p className="p-10">Something went wrong.</p>
  }

  const product = data.products.find(
    (product) => product.id === Number(id)
  )

  if (!product) {
    return <p className="p-10">Product not found.</p>
  }

  // const discount = product.discountPercentage


  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <section className="px-6 py-10 md:px-10 lg:px-16 lg:py-16">

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

        <div className="flex min-h-[500px] items-center justify-center rounded-3xl bg-[#F2F2F2] p-8 lg:min-h-[650px]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="max-h-[600px] max-w-full object-contain mix-blend-multiply"
          />
        </div>

        
        <div className="flex flex-col justify-center">

         
          <h1 className="text-4xl font-black uppercase leading-tight lg:text-5xl">
            {product.title}
          </h1>

          
          <div className="mt-5 flex items-center gap-3">

            <div className="text-xl">
              ⭐⭐⭐⭐⭐
            </div>

            <span className="text-sm">
              {product.rating}
              <span className="text-black/50">/5</span>
            </span>

          </div>

          

          
          <p className="mt-6 max-w-xl leading-7 text-gray-500">
            {product.description}
          </p>

          
          <div className="my-6 border-t border-gray-200" />

          
          <div>

            <p className="mb-4 text-sm text-gray-500">
              Select Colors
            </p>

            <div className="flex items-center gap-3">

              <button
                onClick={() => setSelectedColor('green')}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-green-600 ${
                  selectedColor === 'green'
                    ? 'ring-2 ring-black ring-offset-2'
                    : ''
                }`}
              >
                {selectedColor === 'green' && ''}
              </button>

              <button
                onClick={() => setSelectedColor('red')}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-red-500 ${
                  selectedColor === 'red'
                    ? 'ring-2 ring-black ring-offset-2'
                    : ''
                }`}
              >
                {selectedColor === 'red' && ''}
              </button>

              <button
                onClick={() => setSelectedColor('blue')}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 ${
                  selectedColor === 'blue'
                    ? 'ring-2 ring-black ring-offset-2'
                    : ''
                }`}
              >
                {selectedColor === 'blue' && ''}
              </button>

              <button
                onClick={() => setSelectedColor('black')}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-black ${
                  selectedColor === 'black'
                    ? 'ring-2 ring-black ring-offset-2'
                    : ''
                }`}
              >
                {selectedColor === 'black' && ''}
              </button>

            </div>

          </div>

          
          <div className="my-6 border-t border-gray-200" />

         
          <div>

            <p className="mb-4 text-sm text-gray-500">
              Choose Size
            </p>

            <div className="flex flex-wrap gap-3">

              {['Small', 'Medium', 'Large', 'X-Large'].map(
                (size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full px-6 py-3 text-sm ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-[#F2F2F2] text-black'
                    }`}
                  >
                    {size}
                  </button>
                )
              )}

            </div>

          </div>

         
          <div className="my-6 border-t border-gray-200" />

        
          <div className="flex items-center gap-4">

            
            <div className="flex items-center rounded-full bg-[#F2F2F2]">

              <button
                onClick={decreaseQuantity}
                className="flex h-14 w-14 items-center justify-center text-2xl"
              >
                −
              </button>

              <span className="w-8 text-center font-medium">
               
              </span>

              <button
                onClick={increaseQuantity}
                className="flex h-14 w-14 items-center justify-center text-2xl"
              >
                +
              </button>

            </div>

            
            <button className="h-14 flex-1 rounded-full bg-black px-8 font-medium text-white">
              Add to Cart
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default ProductDetails


