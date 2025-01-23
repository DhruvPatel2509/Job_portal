import { Users, Briefcase, FileText } from "lucide-react";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useSelector } from "react-redux";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useGetAllApplications from "../../hooks/useGetAllApplications";

const Dashboard = () => {
  useGetAllCompanies();
  useGetAllUsers();
  useGetAllApplications();

  const { allCompanies } = useSelector((store) => store.company);
  const { allUsers } = useSelector((store) => store.auth);
  const { allApplications } = useSelector((store) => store.application);
  // console.log(allCompanies);
  // console.log(allUsers);
  // console.log(allApplications);

  const mockStats = {
    totalCompanies: allCompanies.length,
    activeListings: 89,
    totalApplications: allApplications.length,
    totalUsers: allUsers.length,
  };

  const mockRecentApplications = [
    {
      id: 1,
      candidate: "John Doe",
      position: "Senior Developer",
      status: "Pending",
      date: "2024-03-10",
    },
    {
      id: 2,
      candidate: "Jane Smith",
      position: "UX Designer",
      status: "Reviewed",
      date: "2024-03-09",
    },
    {
      id: 3,
      candidate: "Mike Johnson",
      position: "Product Manager",
      status: "Interviewed",
      date: "2024-03-08",
    },
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total companies",
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
          <div key={index} className="bg-white rounded-lg shadow p-6">
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

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Candidate</th>
                <th className="pb-4">Position</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentApplications.map((application) => (
                <tr key={application.id} className="border-t">
                  <td className="py-4">{application.candidate}</td>
                  <td className="py-4">{application.position}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        application.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : application.status === "Reviewed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="py-4">{application.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
