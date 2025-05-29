import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
function Navbar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Logo
          </Link>
        </div>

        {/* desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium px-4 py-2 rounded transition ${
              location.pathname === "/"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className={`text-sm font-medium px-4 py-2 rounded transition ${
              location.pathname === "/signin"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className={`text-sm font-medium px-4 py-2 rounded transition ${
              location.pathname === "/signup"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            Sign Up
          </Link>
        </nav>

        {/* mobile Navigation Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-gray-800 hover:text-blue-600"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:hidden bg-white px-6 pt-4 pb-8 shadow-md space-y-3"
          >
            <Link
              to="/"
              className={`text-base font-medium px-4 py-2 rounded ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              to="/signin"
              className={`text-base font-medium px-4 py-2 rounded ${
                location.pathname === "/signin"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={`text-base font-medium px-4 py-2 rounded ${
                location.pathname === "/signup"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
