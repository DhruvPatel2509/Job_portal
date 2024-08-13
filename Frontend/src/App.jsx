import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Home } from "./components/pages/Home";
import { Signup } from "./components/auth/Signup";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
export default function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
