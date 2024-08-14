import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-4">
        <div className="  items-center flex  justify-evenly">
          <div className=" flex items-center justify-center">
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              <FaInstagram size={20} />
            </a>
          </div>
          <p className="text-sm ">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>

          <div>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
