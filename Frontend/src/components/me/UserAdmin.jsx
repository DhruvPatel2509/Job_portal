import { useSelector } from "react-redux";

const UserAdmin = () => {
  const { allUsers } = useSelector((store) => store.auth);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        User List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUsers
          .filter((user) => user.role !== "admin")
          .map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={user.profile.profilePhoto || "/default-avatar.png"}
                  alt={user.fullname}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-500 shadow-lg mb-3"
                />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {user.fullname}
                </h3>
                <p className="text-base sm:text-lg text-gray-600">
                  {user.email}
                </p>
                <div className="mt-3 w-full">
                  <p className="text-sm sm:text-lg font-medium text-gray-700">
                    <span className="text-gray-900 font-semibold">Role:</span>{" "}
                    {user.role}
                  </p>
                  {user.role === "recruiter" &&
                    user.profile.company &&
                    typeof user.profile.company === "object" && (
                      <p className="text-sm sm:text-lg font-medium text-gray-700">
                        <span className="text-gray-900 font-semibold">
                          Company:
                        </span>{" "}
                        {user.profile.company.name}
                      </p>
                    )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserAdmin;
