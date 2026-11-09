import heroImage from '../../assets/hero.jpg'

function Hero() {
  return (
    <section className="w-full bg-[#F2F0F1] flex">

      
      <div className="w-1/2 p-20 mt-20">

<h1 className="text-6xl text-black leading-none tracking-tight [font-family:'Archivo_Black']">
          FIND CLOTHES<br />
          THAT MATCH YOUR STYLE
        </h1>

        <p className="mt-6 text-gray-500">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>

        <button className="bg-black text-white px-12 py-4 rounded-full mt-10">
          Shop Now
        </button>

        <div className="flex gap-8 mt-20">

          <div>
<h2 className="text-3xl [font-family:'Archivo_Black']">200+</h2>            <p className="text-gray-500">International Brands</p>
          </div>

          <div>
            <h2 className="text-3xl [font-family:'Archivo_Black']">2,000+</h2>
            <p className="text-gray-500">High-Quality Products</p>
          </div>

          <div>
            <h2 className="text-3xl [font-family:'Archivo_Black']">30,000+</h2>
            <p className="text-gray-500">Happy Customers</p>
          </div>

        </div>

      </div>

     
      <div className="w-1/2">

        <img
          src={heroImage}
          alt="Models"
          className="w-full h-full object-cover object-top"
        />

      </div>

    </section>
  )
}

export default Hero