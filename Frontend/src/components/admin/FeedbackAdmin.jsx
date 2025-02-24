import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { FEEDBACK_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";
import { useState } from "react";

export const FeedbackAdmin = () => {
  const { feedbacks } = useSelector((store) => store.feedback);
  const { token } = useSelector((store) => store.auth);
  const [updateFeedback, setUpdateFeedback] = useState(feedbacks);
  const dispatch = useDispatch();
  // Handle delete feedback
  const handleDelete = async (id) => {
    try {
      const endpoint = `${FEEDBACK_API_END_POINT}/deleteFeedback/${id}`;
      const res = await apiRequest("DELETE", endpoint, null, token, dispatch);
      if (res.status === 200) {
        setUpdateFeedback((prev) =>
          prev.filter((feedback) => feedback._id !== id)
        );
        toast.success("Feedback deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete feedback");
    } 
  };
console.log(updateFeedback);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Feedback from Students & Recruiters
      </h2>
      {updateFeedback?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {updateFeedback?.map((feedback) => (
            <div
              key={feedback._id}
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="flex items-center space-x-4">
                
                <div>
                  <p className="font-medium text-lg text-gray-900">
                    {feedback.name}
                  </p>
                  <p className="text-sm text-gray-500">{feedback.user.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mt-4">{feedback.feedback}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(feedback.createdAt).toLocaleString()}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(feedback._id)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
              >
                <Trash2 size={20} className="w-4 h-4 inline-block mr-1" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No feedback available.</p>
      )}
    </div>
  );
};
