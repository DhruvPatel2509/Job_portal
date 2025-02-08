const JobCardForAdmin = ({ job, onDetails, onDelete }) => {
  console.log("Job Data:", job); // ✅ Check what data is coming in

  if (!job || typeof job !== "object") {
    return <p>No job data available</p>; // Handle undefined/null jobs
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2"></h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Company:</span>
        {job?.title}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Location:</span>
        {job?.location}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Salary:</span>
        {job?.salary + " " + "LPA"}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Experience:</span>
        {job?.experience + " " + "years"}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Job Type:</span>
        {job?.jobType}
      </p>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={onDetails}
        >
          Details
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCardForAdmin;
