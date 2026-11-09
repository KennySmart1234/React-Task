
import close from '/icons/close-icon.svg'

const SignUp = () => {
  return (
    <div className="relative bg-black flex justify-center p-4">
        <p className="text-white text-center">Sign up and get 20% off to your first order. <u className=" cursor-pointer">Sign Up Now</u></p>
        <img src={close} alt="close" className="absolute right-10 w-6 h-6 cursor-pointer " />
    </div>
  )
}

export default SignUp