import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Home } from "./components/pages/Home";
import { Signup } from "./components/auth/Signup";
import Jobs from "./components/pages/Jobs";
import Layout from "./components/Layout";
import Browse from "./components/pages/Browse";
import Profile from "./components/pages/Profile";
import JobDetails from "./components/pages/JobDetails";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import JobsAdmin from "./components/admin/JobsAdmin";
import CreateAdminJob from "./components/admin/CreateAdminJob";
import Applicants from "./components/admin/Applicants";
import NotFound from "./components/NotFound";
// import ProtectedRoutes from "./components/admin/Protectedroutes";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/jobs/jobDetails/:id", element: <JobDetails /> },
      { path: "/browse", element: <Browse /> },
      { path: "/profile", element: <Profile /> },
      // Admin routes
      {
        path: "/admin/companies",
        element: <Companies />,
      },
      { path: "/admin/jobs", element: <JobsAdmin /> },
      { path: "/admin/companies/create", element: <CreateCompany /> },
      { path: "/admin/companies/:id", element: <CompanySetup /> },
      { path: "/admin/jobs/create", element: <CreateAdminJob /> },
      { path: "/admin/jobs/:id/applicants", element: <Applicants /> },
      // Catch-all for 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
