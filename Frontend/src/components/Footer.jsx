import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Social Icons Section */}
        <div className="flex justify-center space-x-6 md:space-x-8">
          <a
            href="#"
            className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-pink-500 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaInstagram size={28} />
          </a>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Your Company Name</span>. All rights
          reserved.
        </p>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition duration-300 ease-in-out transform hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition duration-300 ease-in-out transform hover:underline"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
