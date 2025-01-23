import { useState } from "react";
import {
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Dashboard from "./Dashboard";

function MeHomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = {
    dashboard: <Dashboard />,
    jobs: <div>Jobs Content</div>,
    applications: <div>Applications Content</div>,
    users: <div>Users Content</div>,
    settings: <div>Settings Content</div>,
  };

  const navItems = [
    { icon: BarChart3, label: "Dashboard", id: "dashboard" },
    { icon: Briefcase, label: "Jobs", id: "jobs" },
    { icon: FileText, label: "Applications", id: "applications" },
    { icon: Users, label: "Users", id: "users" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
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
              className={`flex items-center p-4 w-full hover:bg-blue-50 ${
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
      <main className="flex-1 p-4">{tabs[activeTab]}</main>
    </div>
  );
}

export default MeHomePage;
