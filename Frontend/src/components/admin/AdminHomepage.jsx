import { useState } from "react";
import {
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Menu,
  X,
  Factory,
} from "lucide-react";
import Dashboard from "./Dashboard";
import JobAdmin from "./JobAdmin";
import Applicationadmin from "./Applicationadmin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UserAdmin from "./UserAdmin";
import Cookies from "js-cookie";

import CompaniesAdmin from "./CompaniesAdmin";
import { logOutHandler } from "../../utils/logoutHandler.js";
function AdminHomepage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);

    if (!token) {
      try {
        console.log("hh");
        logOutHandler(dispatch, navigate, token);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  }, [dispatch, navigate]);
  const tabs = {
    dashboard: <Dashboard />,
    jobs: <JobAdmin />,
    applications: <Applicationadmin />,
    users: <UserAdmin />,
    company: <CompaniesAdmin />,
  };

  const navItems = [
    { icon: BarChart3, label: "Dashboard", id: "dashboard" },
    { icon: Briefcase, label: "Jobs", id: "jobs" },
    { icon: FileText, label: "Applications", id: "applications" },
    { icon: Users, label: "Users", id: "users" },
    { icon: Factory, label: "Companies", id: "company" },
  ];

  return (
    <div className="flex w-[100%] bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-[15]" : ""
        } bg-white shadow h-screen transition-all`}
      >
        <div className="p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center py-4 pl-2 pr-2 w-full hover:bg-blue-50 ${
                activeTab === item.id ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-4 w-full">{tabs[activeTab]}</main>
    </div>
  );
}

export default AdminHomepage;
