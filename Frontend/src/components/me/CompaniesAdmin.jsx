import { useState } from "react";
import { useSelector } from "react-redux";
import apiRequest from "../../utils/axiosUtility";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";

const CompaniesAdmin = () => {
  const { allCompanies } = useSelector((store) => store.company);
  const { token } = useSelector((store) => store.auth);
  const [expandedCompany, setExpandedCompany] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      const endpoint = `${COMPANY_API_END_POINT}/setCompanyStatus/${id}`;
      const res = await apiRequest("PUT", endpoint, { status: status }, token);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (id) => {
    updateStatus(id, "approved");
    setExpandedCompany(null);
  };

  const handleDecline = (id) => {
    updateStatus(id, "rejected");
    setExpandedCompany(null);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        Companies List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCompanies.map((company) => (
          <div
            key={company._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
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
              <p className="text-sm sm:text-md text-gray-500">
                {company.description}
              </p>

              {/* Company Status */}
              <span
                className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  company.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : company.status === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {company.status}
              </span>

              {/* More Button */}
              <div className="mt-3 w-full flex justify-center space-x-3">
                {expandedCompany === company._id ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={() => handleAccept(company._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                      onClick={() => handleDecline(company._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    onClick={() =>
                      setExpandedCompany(
                        expandedCompany === company._id ? null : company._id
                      )
                    }
                  >
                    More
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => handleDelete(company._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesAdmin;
