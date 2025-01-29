import { useSelector, useDispatch } from "react-redux";

const CompaniesAdmin = () => {
  const { allCompanies } = useSelector((store) => store.company);
  console.log(allCompanies);

  const dispatch = useDispatch();

  const handleAccept = (id) => {
    // Dispatch accept action
  };

  const handleDecline = (id) => {
    // Dispatch decline action
  };

  const handleDelete = (id) => {
    // Dispatch delete action
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
              <div className="mt-3 w-full flex justify-center space-x-3">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  onClick={() => handleAccept(company._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  onClick={() => handleDecline(company._id)}
                >
                  Decline
                </button>
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
