import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Modal from "react-modal";
import apiRequest from "../../utils/axiosUtility";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { setApiLoading } from "../../redux/authSlice";

function Applicantstable() {
  const shortListingStatus = ["accepted", "rejected"];
  const { applicants } = useSelector((store) => store.application);
  const { token } = useSelector((store) => store.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [localApplicants, setLocalApplicants] = useState(applicants);
  const [setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalApplicants(applicants);
  }, [applicants]);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusHandler = async (status, id) => {
    try {
      const endpoint = `${APPLICATION_API_END_POINT}/updateStatus/${id}`;
      const res = await apiRequest(
        "PUT",
        endpoint,
        { status },
        token,
        dispatch
      );
      toast.success(`${res.data.message} to ${status}`);
      setLocalApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === id ? { ...applicant, status } : applicant
        )
      );
    } catch (error) {
      toast.error(error.message);
    } 
  };

  const deleteApplicant = async () => {
    if (!selectedApplicant) return;
    setLoading(true);
    try {
      const endpoint = `${APPLICATION_API_END_POINT}/deleteApplicant/${selectedApplicant}`;
      const res = await apiRequest("DELETE", endpoint, {}, token, dispatch);
      if (res.status === 200) {
        toast.success("Applicant Deleted Successfully");
        setLocalApplicants(
          localApplicants.filter((a) => a._id !== selectedApplicant)
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {localApplicants?.length ? (
        localApplicants.map((a) => (
          <div
            key={a._id}
            className="bg-white shadow-md p-6 rounded-lg flex flex-col gap-3 relative"
          >
            {/* Status Label */}
            <span
              className={`absolute top-4 right-4 px-4 py-1 rounded-md text-white font-medium ${
                a.status === "accepted"
                  ? "bg-green-600"
                  : a.status === "pending"
                  ? "bg-gray-500"
                  : "bg-red-600"
              }`}
            >
              {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
            </span>

            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={a.applicant.profile.profilePhoto}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">{a.applicant.fullname}</h3>
                <p className="text-sm text-gray-500">{a.applicant.email}</p>
                <p className="text-sm text-gray-500">
                  {a.applicant.phoneNumber}
                </p>
                <p className="text-sm text-gray-500">
                  Applied on: {formatDate(a.createdAt)}
                </p>
              </div>
            </div>

            {/* Resume */}
            <div className="mt-3">
              <p className="text-sm font-semibold text-gray-500">Resume</p>
              {a.applicant.profile.resumeOrignalName ? (
                <a
                  className="text-blue-600 underline break-words"
                  href={a.applicant.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.applicant.profile.resumeOrignalName}
                </a>
              ) : (
                <p className="text-gray-500">No Resume</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {shortListingStatus.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => statusHandler(s, a._id)}
                    className="border capitalize border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition duration-200 w-full sm:w-auto"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition duration-200 w-full sm:w-auto"
                onClick={() => {
                  setSelectedApplicant(a._id);
                  setIsDeleteModalOpen(true);
                }}
              >
                DELETE
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No applicants yet.
        </p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Confirm Delete"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2 className="text-lg font-bold mb-4">
          Are you sure you want to delete this applicant?
        </h2>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={deleteApplicant}
            className="bg-red-600 text-white hover:bg-red-700 transition duration-200"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Applicantstable;
