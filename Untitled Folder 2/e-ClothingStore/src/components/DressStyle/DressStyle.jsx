import casualImage from '../../assets/style-casual.jpg'
import formalImage from '../../assets/style-formal.jpg'
import partyImage from '../../assets/style-party.jpg'
import gymImage from '../../assets/style-gym.jpg'

function DressStyle() {
  return (
    <section className="mx-8 my-16 rounded-3xl bg-[#F2F0F1] px-8 py-12 lg:mx-16 lg:px-16">

      <h2 className="mb-10 text-center text-4xl font-black lg:text-5xl">
        BROWSE BY DRESS STYLE
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Casual */}
        <div className="relative h-72 overflow-hidden rounded-2xl bg-white lg:h-80">
          <img
            src={casualImage}
            alt="Casual"
            className="absolute right-[-10px] h-full w-[85%] object-contain object-right"
          />

          <h3 className="absolute left-8 top-8 z-10 text-3xl font-bold text-black">
            Casual
          </h3>
        </div>

        {/* Formal */}
        <div className="relative h-72 overflow-hidden rounded-2xl bg-white lg:h-80">
          <img
            src={formalImage}
            alt="Formal"
            className="absolute right-[-10px] h-full w-[85%] object-contain object-right"
          />

          <h3 className="absolute left-8 top-8 z-10 text-3xl font-bold text-black">
            Formal
          </h3>
        </div>

        {/* Party */}
        <div className="relative h-72 overflow-hidden rounded-2xl bg-white lg:h-80">
          <img
            src={partyImage}
            alt="Party"
            className="absolute right-[-10px] h-full w-[85%] object-contain object-right"
          />

          <h3 className="absolute left-8 top-8 z-10 text-3xl font-bold text-black">
            Party
          </h3>
        </div>

        {/* Gym */}
        <div className="relative h-72 overflow-hidden rounded-2xl bg-white lg:h-80">
          <img
            src={gymImage}
            alt="Gym"
            className="absolute right-[-10px] h-full w-[85%] object-contain object-right"
          />

          <h3 className="absolute left-8 top-8 z-10 text-3xl font-bold text-black">
            Gym
          </h3>
        </div>

      </div>

    </section>
  )
}

export default DressStyle