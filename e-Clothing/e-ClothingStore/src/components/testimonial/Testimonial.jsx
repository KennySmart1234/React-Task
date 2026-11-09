import leftArrow from "/icons/arrow-left-bold.svg"
import rightArrow from '/icons/arrow-right-bold.svg'

const Testimonial = () => {
  return (
    <div>
        <h1>OUR HAPPY CUSTOMERS</h1>

        <div>
            <button><img src={leftArrow} alt="Left Arrow" /></button>
            <img src={rightArrow} alt="Right Arrow" />

        </div>
    </div>
  )
}

export default Testimonial