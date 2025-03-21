import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { ADMIN_API_END_POINT, USER_API_END_POINT } from "../../utils/constant";
import apiRequest from "../../utils/axiosUtility";

const UserAdmin = () => {
  const { allUsers: initialUsers } = useSelector((store) => store.auth);
  const [allUsers, setAllUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    role: "",
  });
  const dispatch = useDispatch();

  // Open Edit Form with Selected User Data
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      bio: user.profile?.bio || "",
      skills: user.profile?.skills?.join(", ") || "",
      role: user.role,
    });
  };

  // Detect Changes in Form
  useEffect(() => {
    if (selectedUser) {
      const isModified =
        formData.fullname !== selectedUser.fullname ||
        formData.email !== selectedUser.email ||
        formData.phoneNumber !== (selectedUser.phoneNumber || "") ||
        formData.bio !== (selectedUser.profile?.bio || "") ||
        formData.skills !== (selectedUser.profile?.skills?.join(", ") || "");

      setIsChanged(isModified);
    }
  }, [formData, selectedUser]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Updated User Data
  const handleEditSubmit = async () => {
    if (!isChanged) return;

    try {
      const endpoint  = `${ADMIN_API_END_POINT}/editUser/${selectedUser._id}`;
      const res = await apiRequest("DELETE", endpoint, formData, dispatch);
      console.log(res);

      if (res.status === 200) {
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id ? { ...user, ...formData } : user
          )
        );

        toast.success("User updated successfully!");
      }

      setSelectedUser(null);
    } catch (error) {
      toast.error("Error updating user!");
      console.error("Edit Error:", error);
    }
  };

  // Delete User
  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(
        `${USER_API_END_POINT}/deleteUser/${userId}`
      );
      console.log(res);

      // Remove deleted user from the UI
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user!");
      console.error("Delete Error:", error);
    }
  };

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
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl relative"
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
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit User</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
              />
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
              />
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills (comma-separated)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-blue-500"
              />
            </div>
            <button
              onClick={handleEditSubmit}
              disabled={!isChanged}
              className={`w-full px-4 py-2 rounded-lg mt-4 font-semibold ${
                isChanged
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdmin;
