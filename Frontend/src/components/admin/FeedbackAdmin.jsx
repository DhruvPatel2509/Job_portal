import { useSelector } from "react-redux";

export const FeedbackAdmin = () => {
  const { feedbacks } = useSelector((store) => store.feedback);
  console.log(feedbacks);

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Feedback from Students & Recruiters
      </h2>
      {feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={feedback.user.profile?.profilePhoto}
                  alt={feedback.user.fullname}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-lg text-gray-900">
                    {feedback.user.fullname}
                  </p>
                  <p className="text-sm text-gray-500">{feedback.user.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mt-4">{feedback.feedback}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(feedback.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No feedback available.</p>
      )}
    </div>
  );
};
