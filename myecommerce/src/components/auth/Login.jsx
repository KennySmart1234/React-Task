
import { use, useState } from "react";
// import {React} from "react";
import { useLoginMutation } from "./../../api/dummyDataApi";
import { Link, useNavigate } from "react-router-dom";
// import {Link, useNavigate} from "react-router";
 

const Login = () => { 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [login, {isLoading}] = useLoginMutation();
  // const []

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try { 

      const response = await login(
        {  password : password, username : username }
      ).unwrap();
      localStorage.setItem("token", response.accessToken);
      navigate("/products");

      console.log(response);
      // Handle successful login (e.g., redirect, store token, etc.)

    } catch (error) {
      console.error(error);
      // Handle login error (e.g., show error message)
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back  
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled = {isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                       font-semibold hover:bg-blue-700
                       focus:ring-4 focus:ring-blue-200
                       transition duration-200"
          >
            {isLoading ? "Laoding..." : "Login"}
            {/* Login */}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}

        <Link to="/signup">
          <button className="front-medium text-blue-600 hover:text-blue-700 hover:underline">
            Sign Up
          </button>
        </Link>

        </p>

      </div>
    </div>
  );
};

export default Login;

