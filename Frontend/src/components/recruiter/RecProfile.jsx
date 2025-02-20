import { useState } from "react";
import { useSelector } from "react-redux";
import { Plus, Pen, Mail, Phone, Building } from "lucide-react";

const RecruiterHome = () => {
  const { authUser } = useSelector((store) => store.auth);
  const company = authUser?.company || {};
  const jobs = company?.jobs || [];
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-100 min-h-screen">
      {/* Recruiter Profile */}
      <div className="p-6 bg-white border border-gray-300 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-300 rounded-full shadow-md"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {authUser?.fullname}
              </h1>
              <p className="text-gray-600">{authUser?.bio}</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="border px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-gray-100"
          >
            <Pen className="text-gray-600" /> Edit
          </button>
        </div>
        <div className="my-5 space-y-2">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-600" />
            <span className="text-gray-800">{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-gray-600" />
            <span className="text-gray-800">{authUser?.phoneNumber}</span>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="p-6 bg-white border border-gray-300 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800">Company Details</h2>
        <div className="flex items-center gap-3 mt-3">
          <Building className="text-gray-600" />
          <span className="font-semibold text-gray-900">
            {company.name || "NA"}
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          {company.description || "No description available."}
        </p>
        <div className="mt-4">
          <h2 className="font-bold text-lg text-gray-800">Industry</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {company.industries?.length > 0 ? (
              company.industries.map((industry, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg shadow-sm"
                >
                  {industry}
                </span>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Posted Jobs Section */}
      <div className="p-6 bg-white border border-gray-300 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Posted Jobs</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700">
            <Plus /> Add Job
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="border p-4 rounded-xl shadow-sm bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-gray-600 text-sm">{job.location}</p>
                <p className="text-gray-500 mt-2">{job.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;
