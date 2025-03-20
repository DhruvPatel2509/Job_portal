import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/recruiter/ProtectedRoute";
import AuthRedirect from "./components/auth/AuthRedirect";

// Authentication Components
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPass";
import { NewPassword } from "./components/auth/NewPassword";

// General Pages
import { ForAllHomePage } from "./components/pages/ForAllHomePage";
import { Home } from "./components/pages/Home";
import Jobs from "./components/pages/Jobs";
import Browse from "./components/pages/Browse";
import Profile from "./components/pages/Profile";
import JobDetails from "./components/pages/JobDetails";

// Recruiter Components
import HomeRecruiter from "./components/recruiter/RecHome";
import Companies from "./components/recruiter/Companies";
import CreateCompany from "./components/recruiter/CreateCompany";
import CompanySetup from "./components/recruiter/CompanySetup";
import JobsAdmin from "./components/recruiter/JobsRec";
import CreateAdminJob from "./components/recruiter/CreateRecJob";
import JobSetup from "./components/recruiter/JobSetup";
import Applicants from "./components/recruiter/Applicants";

// Admin Components
import AdminHomepage from "./components/admin/AdminHomepage";
import { AdminLogin } from "./components/admin/AdminLogin";
import AdminJobDetails from "./components/admin/AdminJobDetails";
import RecProfile from "./components/recruiter/RecProfile";
import AboutUs from "./components/pages/Aboutus";
import ContactUs from "./components/pages/ContactUs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <AuthRedirect component={<ForAllHomePage />} /> },
      { path: "/about-us", element: <AboutUs /> }, 
      { path: "/contact-us", element: <ContactUs /> }, 

      { path: "/login", element: <AuthRedirect component={<Login />} /> },
      { path: "/signup", element: <AuthRedirect component={<Signup />} /> },
      {
        path: "/forgotPass",
        element: <AuthRedirect component={<ForgotPassword />} />,
      },
      {
        path: "/forgotPass/NewPassword",
        element: <AuthRedirect component={<NewPassword />} />,
      },

      // Admin Routes
      {
        path: "/AdminHomepage",
        element: (
          <ProtectedRoute role="admin">
            <AdminHomepage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobdetails/:id",
        element: (
          <ProtectedRoute role="admin">
            <AdminJobDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adminLogin",
        element: <AuthRedirect component={<AdminLogin />} />,
      },

      // Student Routes
      {
        path: "/studenthome",
        element: (
          <ProtectedRoute role="student">
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute role="student">
            <Jobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs/jobDetails/:id",
        element: (
          <ProtectedRoute role="student">
            <JobDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/browse",
        element: (
          <ProtectedRoute role="student">
            <Browse />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute role="student">
            <Profile />
          </ProtectedRoute>
        ),
      },

      // Recruiter Routes
      {
        path: "/recHome",
        element: (
          <ProtectedRoute role="recruiter">
            <HomeRecruiter />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recProfile",
        element: (
          <ProtectedRoute role="recruiter">
            <RecProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rec/companies",
        element: (
          <ProtectedRoute role="recruiter">
            <Companies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rec/companies/create",
        element: (
          <ProtectedRoute role="recruiter">
            <CreateCompany />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rec/companies/:id",
        element: (
          <ProtectedRoute role="recruiter">
            <CompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rec/jobs",
        element: (
          <ProtectedRoute role="recruiter">
            <JobsAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rec/jobs/create",
        element: (
          <ProtectedRoute role="recruiter">
            <CreateAdminJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rec/jobs/:id",
        element: (
          <ProtectedRoute role="recruiter">
            <JobSetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rec/jobs/:id/applicants",
        element: (
          <ProtectedRoute role="recruiter">
            <Applicants />
          </ProtectedRoute>
        ),
      },

      // Catch-all for 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
