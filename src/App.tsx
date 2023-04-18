import "./App.css"
import Login from "./pages/Login"
import Hotels from "./pages/Hotels"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/hotels", element: <Hotels /> },
  { path: "*", element: <Navigate to={"/hotels"} /> },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
