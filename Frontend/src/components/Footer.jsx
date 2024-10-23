import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center justify-center mb-4 md:mb-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white mx-3 transition duration-300 ease-in-out"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white mx-3 transition duration-300 ease-in-out"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white mx-3 transition duration-300 ease-in-out"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white mx-3 transition duration-300 ease-in-out"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-sm text-center mb-4 md:mb-0">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold">Your Company Name</span>. All rights
            reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white mx-2 transition duration-300 ease-in-out"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white mx-2 transition duration-300 ease-in-out"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
