function Testimonials() {
  const reviews = [
    {
      name: 'Sarah M.',
      review:
        'I absolutely love the clothes I bought from SHOP.CO. The quality is amazing and everything fits perfectly.',
    },
    {
      name: 'Alex K.',
      review:
        'The shopping experience was great. The clothes look exactly like the pictures and arrived quickly.',
    },
    {
      name: 'James L.',
      review:
        'SHOP.CO has become one of my favourite clothing stores. Great styles, great quality and great prices.',
    },
  ]

  return (
    <section className="my-16 px-8 lg:px-16">

      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-4xl [font-family:'Archivo_Black'] lg:text-5xl">
          OUR HAPPY CUSTOMERS
        </h2>

        <div className="flex gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
            ←
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 p-6"
          >

            <div className="mb-4 text-xl">
              ⭐⭐⭐⭐⭐
            </div>

            <h3 className="mb-3 text-xl font-bold">
              {review.name}
            </h3>

            <p className="leading-7 text-gray-500">
              "{review.review}"
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Testimonials