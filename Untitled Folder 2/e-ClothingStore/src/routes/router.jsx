import { createBrowserRouter } from 'react-router'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetails from '../pages/ProductDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },


    {
    path: '/products',
    element: <ProductsPage />,
  },
  
  {
    path: '/product/:id',
    element: <ProductDetails />,
  }

])

export default router