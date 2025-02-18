import { useState } from "react";
import { useSelector } from "react-redux";

export default function FeedbackForm() {
  const { authUser } = useSelector((store) => store.auth);
  console.log(authUser.email);

  const [formData, setFormData] = useState({
    name: "",
    email: authUser.email,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className=" py-16 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Feedback <span className="text-[#6A38C2]">Form</span>
      </h2>
      <div className="max-w-md mx-auto bg-white text-gray-800 shadow-lg rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-full focus:ring focus:ring-[#6A38C2]"
            />
          </div>
          <div className="hidden">
            <label className="block text-gray-700">Email(Can not Change)</label>
            <input
              type="email"
              name="email"
              disabled
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-full focus:ring focus:ring-[#6A38C2]"
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              placeholder="Enter your Feedback here ..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#6A38C2]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#6A38C2] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#2a174b] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
