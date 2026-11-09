import brandsImage from '../../assets/brands.png'

function Brands() {
  return (
    <section className="w-full bg-black py-10">
      <div className="w-full px-10">
        <img
          src={brandsImage}
          alt="Our partner brands"
          className="w-full object-contain"
        />
      </div>
    </section>
  )
}

export default Brands