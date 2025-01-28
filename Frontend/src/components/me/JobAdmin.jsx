import JobCardForAdmin from "./JobCardForAdmin";

const JobAdmin = () => {
  // Demo job data
  const jobs = [
    {
      _id: "1",
      title: "Software Engineer",
      companyName: "TechCorp",
      location: "New York, USA",
      salary: 120000,
      experience: 3,
      jobType: "Full-time",
    },
    {
      _id: "2",
      title: "Frontend Developer",
      companyName: "Designly",
      location: "San Francisco, USA",
      salary: 100000,
      experience: 2,
      jobType: "Part-time",
    },
    {
      _id: "3",
      title: "Backend Developer",
      companyName: "CodeBase",
      location: "Austin, USA",
      salary: 110000,
      experience: 4,
      jobType: "Full-time",
    },
  ];

  const handleDetails = (id) => {
    alert(`View details for job ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete job ID: ${id}`);
  };

  return (
    <div className="p-0 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Job Administration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCardForAdmin
            key={job._id}
            job={job}
            onDetails={handleDetails}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default JobAdmin;
