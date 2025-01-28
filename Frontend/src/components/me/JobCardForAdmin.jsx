const JobCardForAdmin = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Software Engineer
      </h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Company:</span> TechCorp
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Location:</span> New York, USA
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Salary:</span> $120,000
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Experience:</span> 3 years
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Job Type:</span> Full-time
      </p>
      <div className="flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Details
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCardForAdmin;
