import { useGetAllProductsQuery } from '../api/dummyDataApi'

function ProductsPage() {
  const { data, isLoading, isError } = useGetAllProductsQuery()

  if (isLoading) {
    return <p className="p-10">Loading products...</p>
  }

  if (isError) {
    return <p className="p-10">Something went wrong.</p>
  }

  return (
    <section className="px-10 py-16">

      <h1 className="mb-10 text-center text-5xl font-black">
        ALL PRODUCTS
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {data.products.map((product) => (
          <div key={product.id}>

            <img
              src={product.images[0]}
              alt={product.title}
              className="h-80 w-full rounded-2xl object-cover"
            />

            <h2 className="mt-4 text-xl font-bold">
              {product.title}
            </h2>

            <p className="mt-2 text-sm">
              ⭐ {product.rating}
            </p>

            <p className="mt-2 text-2xl font-black">
              ${product.price}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default ProductsPage