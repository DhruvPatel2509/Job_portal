import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";
import { useState } from "react";
import { toast } from "sonner";

const ApplicationAdmin = () => {
  const { allApplications } = useSelector((store) => store.application);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [updatedApplications, setUpdatedApplications] =
    useState(allApplications);

  const handleDelete = async (id) => {
    try {
      const endpoint = `${APPLICATION_API_END_POINT}/deleteApplicant/${id}`;
      const res = await apiRequest("DELETE", endpoint, {}, token, dispatch);

      if (res.status === 200) {
        setUpdatedApplications((prev) =>
          prev.filter((allApplications) => allApplications._id !== id)
        );
        toast.success("Application deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Application Management
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {updatedApplications.length === 0 ? (
          <p className="text-center text-lg font-medium col-span-full">
            No Applications Yet..
          </p>
        ) : (
          updatedApplications.map((application) => (
            <div
              key={application._id}
              className="border rounded-lg p-5 shadow-md bg-white hover:shadow-lg transition-shadow relative"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-600">
                Job: {application.job?.title || "N/A"}
              </h2>
              <p className="mb-1">
                <strong>Applicant:</strong> {application.applicant?.fullname} ({" "}
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
              <button
                onClick={() => handleDelete(application._id)}
                className="absolute top-3 right-3 p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

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

export default ApplicationAdmin;
