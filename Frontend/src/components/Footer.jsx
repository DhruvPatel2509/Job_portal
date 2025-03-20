import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-[#4a3a67] to-[#431692] text-white shadow-md py-8 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Empowering careers and opportunities. Let’s build the future
              together.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex justify-center md:justify-center space-x-8">
            <Link to="/about-us">
              <span
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out transform hover:underline cursor-pointer"
                role="link"
              >
                About Us
              </span>
            </Link>
            <Link to="/contact-us">
              <span
                className="text-gray-300 hover:text-white transition duration-300 ease-in-out transform hover:underline cursor-pointer"
               
                role="link"
              >
                Contact Us
              </span>
            </Link>
          </div>

          {/* Social Icons Section */}
          <div className="flex justify-center md:justify-end space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter size={28} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram size={28} />
            </a>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-8 w-full h-[2px] bg-gray-600 rounded-full"></div>

        {/* Closing Section */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-yellow-400">Job Portal</span>.
            All rights reserved.
          </p>
          <p className="text-center md:text-right mt-4 md:mt-0">
            Designed by{" "}
            <span className="font-bold text-white">Dhruv Patel</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
