import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.scss";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/admin/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./components/admin/DashBoard";
import AdminRequireAuth from "./components/admin/AdminRequireAuth";
import ShowCategories from "./components/admin/Category/Show";
import CreateCategory from "./components/admin/Category/create";
import EditCategory from "./components/admin/Category/Edit";
import ShowBrands from "./components/admin/Brand/Show";
import CreateBrand from "./components/admin/Brand/Create";
import EditBrand from "./components/admin/Brand/Edit";
import ShowProducts from "./components/admin/Product/Show";
import CreateProduct from "./components/admin/Product/Create";
import EditProduct from "./components/admin/Product/Edit";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <AdminRequireAuth>
            {" "}
            <DashBoard />
          </AdminRequireAuth>
        ),
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: (
              <AdminRequireAuth>
                <ShowCategories />
              </AdminRequireAuth>
            ),
          },
          {
            path: "create",
            element: (
              <AdminRequireAuth>
                <CreateCategory />
              </AdminRequireAuth>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <AdminRequireAuth>
                <EditCategory />
              </AdminRequireAuth>
            ),
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: (
              <AdminRequireAuth>
                <ShowProducts />
              </AdminRequireAuth>
            ),
          },
          {
            path: "create",
            element: (
              <AdminRequireAuth>
                <CreateProduct />
              </AdminRequireAuth>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <AdminRequireAuth>
                <EditProduct />
              </AdminRequireAuth>
            ),
          },
        ],
      },
      {
        path: "Brands",
        children: [
          {
            index: true,
            element: (
              <AdminRequireAuth>
                <ShowBrands />
              </AdminRequireAuth>
            ),
          },
          {
            path: "create",
            element: (
              <AdminRequireAuth>
                <CreateBrand />
              </AdminRequireAuth>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <AdminRequireAuth>
                <EditBrand />
              </AdminRequireAuth>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
