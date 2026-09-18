import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/signUp";
import Products from "../components/products/products"; 


const router = createBrowserRouter([
    {
        path : "/",
        element: <Login/>
    },

    {
        path: "/signup",
        element:<Signup/>
    },

    {
        path:"/products",
        element: <Products/>

    }
])

export default router;