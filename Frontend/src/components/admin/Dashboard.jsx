import { Users, Briefcase, FileText, BarChart2 } from "lucide-react";
import { useSelector } from "react-redux";
import "../../CSS/Dashboard.css";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useGetAllApplications from "../../hooks/useGetAllApplications";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import useGetAllfeedbacks from "../../hooks/useGetAllFeedBAck";

const Dashboard = () => {
  useGetAllCompanies();
  useGetAllUsers();
  useGetAllApplications();
  useGetAllJobs();
  useGetAllfeedbacks();
  const { allCompanies } = useSelector((store) => store.company);
  const { allUsers } = useSelector((store) => store.auth);
  const { allApplications } = useSelector((store) => store.application);
  const { allJobs } = useSelector((store) => store.job);
  const { feedbacks } = useSelector((store) => store.feedback);

  const mockStats = {
    totalCompanies: allCompanies?.length,
    activeListings: allJobs?.length, // Replace with backend data
    totalApplications: allApplications?.length,
    totalUsers: allUsers?.length,
  };

  const recentActivities = [
    // Replace with data fetched from backend
    { message: "User John Doe registered", time: "2 hours ago" },
    { message: "Company ABC posted a new job", time: "4 hours ago" },
    { message: "Application by Jane Smith received", time: "1 day ago" },
  ];

  return (
    <div className="md:p-8">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          View key metrics and insights for your platform.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="dashres">
        {[
          {
            label: "Total Companies",
            value: mockStats.totalCompanies,
            icon: Briefcase,
          },
          {
            label: "Active Listings",
            value: mockStats.activeListings,
            icon: FileText,
          },
          {
            label: "Total Applications",
            value: mockStats.totalApplications,
            icon: FileText,
          },
          { label: "Total Users", value: mockStats.totalUsers, icon: Users },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <section className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <div className="flex justify-center items-center h-64 text-gray-500">
          {/* Replace this placeholder with a graph component, e.g., Chart.js */}
          <BarChart2 size={48} />
          <p className="ml-4">Graph/Chart Component Coming Soon</p>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex justify-between text-gray-600">
                <span>{activity.message}</span>
                <span className="text-sm">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Dashboard Platform. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
