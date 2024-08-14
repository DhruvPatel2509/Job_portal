import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Home } from "./components/pages/Home";
import { Signup } from "./components/auth/Signup";
import Jobs from "./components/pages/Jobs";
import Layout from "./components/Layout";
import Browser from "./components/Browser";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/browser",
        element: <Browser />,
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
