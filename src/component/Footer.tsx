
import {
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import im1 from "../assets/download.webp";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-violet-800 backdrop-blur-md text-white py-6   w-full ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
        <div className="h-20 w-20">
            <img src={im1} alt="Logo" className="h-full w-full rounded-full" />
          </div>
          <p className="mt-2 text-sm text-gray-300">
            Creating intuitive digital experiences with modern design.
          </p>
        </div>

        
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-1">Navigation</h3>
          <Link
              
              to= "/"
    
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
          {["All Books",  "Borrow Summary"].map((link) => (
            <Link
              key={link}
              to={`${link.split(" "). join("-").toLowerCase()}`}
    
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

    
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect with us</h3>
          <div className="flex space-x-4">
            {[Twitter, Linkedin, Github].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-blue-400 transition-colors"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>


      <div className="mt-10 text-center text-sm text-gray-400 border-t border-white/20 pt-4">
        © 2025 MyBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
