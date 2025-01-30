import { useSelector } from "react-redux";

const Applicationadmin = () => {
  const { allApplications } = useSelector((store) => store.application);

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Application Management
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allApplications.length === 0 ? (
          <p className="text-center text-lg font-medium col-span-full">
            No Application Yet..
          </p>
        ) : (
          allApplications.map((application) => (
            <div
              key={application._id}
              className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-600">
                Job: {application.job?.title || "N/A"}
              </h2>
              <p className="mb-1">
                <strong>Applicant:</strong> {application.applicant?.fullname} (
                {application.applicant?.email})
              </p>
              <p
                className={`mb-1 font-medium capitalize ${getStatusClass(
                  application.status
                )}`}
              >
                <strong>Status:</strong> {application.status}
              </p>
              <p className="text-sm text-gray-600">
                Applied on:{" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Function to apply conditional styling based on status
const getStatusClass = (status) => {
  switch (status) {
    case "accepted":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "pending":
      return "text-yellow-500";
    default:
      return "text-gray-600";
  }
};

export default Applicationadmin;
