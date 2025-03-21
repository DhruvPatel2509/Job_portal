import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../utils/axiosUtility";
import {
  ADMIN_API_END_POINT,
  COMPANY_API_END_POINT,
} from "../../utils/constant";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";

const CompaniesAdmin = () => {
  const { allCompanies } = useSelector((store) => store.company);
  const { token } = useSelector((store) => store.auth);
  const [companies, setCompanies] = useState(allCompanies);
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});
  console.log(token);

  const dispatch = useDispatch();

  const updateStatus = async (id, status) => {
    try {
      const endpoint = `${ADMIN_API_END_POINT}/changeCompanyStatus/${id}`;
      const res = await apiRequest(
        "PUT",
        endpoint,
        { status },
        token,
        dispatch
      );
      toast.success(res.data.message);
      setCompanies((prev) =>
        prev.map((company) =>
          company._id === id ? { ...company, status } : company
        )
      );
      setExpandedCompany(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  const handleAccept = (id) => updateStatus(id, "approved");
  const handleDecline = (id) => updateStatus(id, "rejected");
  const handleDelete = async (id) => {
    try {
      const endpoint = `${COMPANY_API_END_POINT}/deleteCompany/${id}`;
      const res = await apiRequest("DELETE", endpoint, {}, token, dispatch);
      if (res.status === 200) {
        toast.success("Company Deleted Successfully");
        setCompanies((prev) => prev.filter((company) => company._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDescription = (id) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        Companies List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies?.map((company) => (
          <div
            key={company._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl relative"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={company.logo || "/default-logo.png"}
                alt={company.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-500 shadow-lg mb-3"
              />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {company.name}
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                {company.location}
              </p>

              {/* Created At */}
              <p className="text-sm text-gray-500">
                Created At: {new Date(company.createdAt).toLocaleDateString()}
              </p>

              {/* Website */}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm sm:text-md"
                >
                  {company.website}
                </a>
              )}

              {/* Description with Show More */}
              <p className="text-sm sm:text-md text-gray-500 mt-2">
                {showFullDescription[company._id]
                  ? company.description
                  : `${company.description.slice(0, 100)}...`}
              </p>
              {company.description.length > 100 && (
                <button
                  onClick={() => toggleDescription(company._id)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  {showFullDescription[company._id] ? "Show less" : "Show more"}
                </button>
              )}

              <div className="flex items-center gap-4 mt-4">
                <span
                  className={`px-5 py-2 rounded-md text-lg capitalize font-semibold transition-all ${
                    company.status === "approved"
                      ? "bg-green-200 text-green-700"
                      : company.status === "rejected"
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {company.status}
                </span>

                {/* More Options Button */}
                <button
                  onClick={() =>
                    setExpandedCompany(
                      expandedCompany === company._id ? null : company._id
                    )
                  }
                  className="p-2 rounded-full hover:bg-gray-200 transition-all"
                >
                  <MoreHorizontal className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Action Buttons */}
              {expandedCompany === company._id && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                    onClick={() => handleAccept(company._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all"
                    onClick={() => handleDecline(company._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                    onClick={() => handleDelete(company._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesAdmin;
