import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import RootLayout from "../layouts/RootLayout";
import CartPage from "../pages/Cart";

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />
      },
      {
        path: 'products/:id',
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <CartPage />
      }
    ]
  }
])

const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter;
