
import { Menu, X } from "lucide-react";
import { useState } from "react";
import im1 from "../assets/download.webp";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-violet-800 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 ">
          <div className="h-20 w-20">
            <img src={im1} alt="Logo" className="h-full w-full rounded-full" />
          </div>
          

         
          <div className="hidden md:flex space-x-6">
          <Link  to="/"  className="text-white hover:text-blue-400 transition-colors font-medium">
                Home
              </Link>
            {["All Books",  "Borrow Summary"].map((item) => (
             
              <Link key={item} to={`${item.split(" "). join("-").toLowerCase()}`}  className="text-white hover:text-blue-400 transition-colors font-medium">
                {item}
              </Link>
            ))}
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-400 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm absolute top-16 left-0 w-full">
          <div className="flex flex-col items-center space-y-6 py-6">

          <Link  to="/"  className="text-white hover:text-blue-400 transition-colors font-medium">
                Home
              </Link>
            {["All Books","Borrow Summary"].map((item) => (
              <a
                key={item}
                href={`${item.split(" ").join("-").toLowerCase()}`}
                className="text-white text-lg hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
