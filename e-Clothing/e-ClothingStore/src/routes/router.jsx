import { createBrowserRouter } from "react-router";
import HomePage from "../components/HomePage";
import AllProducts from "../components/clothes/DisplayAllProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/fake-products",
        element: <AllProducts/>
    }

])

export default router