import { createBrowserRouter } from "react-router";
import HomePage from "../components/HomePage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },


])

export default router