import SignUp from "./signupBar/SignUp"
import NavBar from "./navBar/NavBar"
import Hero from "./hero/Hero"
import Brands from "./brands/Brands"
import Products from "./clothes/Products"
import BrowseDressStyle from "./browseDressStyle/BrowseDressStyle"
import Testimonial from "./testimonial/Testimonial"

const HomePage = () => {
  return (
    <>
        <SignUp/>
        <NavBar/>
        <Hero/>
        <Brands/>
        <Products/>
        <BrowseDressStyle/>
        <Testimonial/>
    </>
  )
}

export default HomePage