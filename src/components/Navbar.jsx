import { Menu, X } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../configSupabase/config";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [devicePath, setDevicePath] = useState("/device/add");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchDevicePath = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data, error } = await supabase
              .from('macaddresses')
              .select('mac_address')
              .eq('user_id', user.id)
              .limit(1);

            if (error) {
              console.error('Navbar: Error fetching devices:', error.message);
              setDevicePath("/device/add");
              return;
            }

            if (data && data.length > 0) {
              setDevicePath(`/device/${data[0].mac_address}`);
            } else {
              setDevicePath("/device/add");
            }
          }
        } catch (err) {
          console.error('Navbar: Fetch error:', err.message);
          setDevicePath("/device/add");
        }
      };
      fetchDevicePath();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-200 shadow-lg" : "bg-blue-150"
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        <div className="flex items-center">
          <Link to="/" className="text-3xl text-blue-600 font-bold">
            CalSci
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium px-4 py-2 rounded transition ${
              location.pathname === "/"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/codeEditor"
            className={`text-sm font-medium px-4 py-2 rounded transition ${
              location.pathname === "/codeEditor"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`}
          >
            Code Editor
          </Link>
            <Link
            to="/display"
            className={`text-sm font-medium px-4 py-2 rounded transition ${
              location.pathname === "/display"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`}
          >
            Display
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to={devicePath}
                className={`text-sm font-medium px-4 py-2 rounded transition ${
                  location.pathname.startsWith("/device")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`}
              >
                Your Device
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 rounded text-gray-700 hover:text-blue-600 hover:bg-blue-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className={`text-sm font-medium px-4 py-2 rounded transition ${
                  location.pathname === "/signin"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`text-sm font-medium px-4 py-2 rounded transition ${
                  location.pathname === "/signup"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-gray-800 hover:text-blue-600"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:hidden bg-blue-50 px-6 pt-4 pb-8 shadow-md space-y-3"
          >
            <Link
              to="/"
              className={`text-base font-medium px-4 py-2 rounded ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-blue-100"
              }`}
            >
              Home
            </Link>
            <Link
              to="/codeEditor"
              className={`text-base font-medium px-4 py-2 rounded ${
                location.pathname === "/codeEditor"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-blue-100"
              }`}
            >
              Code Editor
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={devicePath}
                  className={`text-base font-medium px-4 py-2 rounded ${
                    location.pathname.startsWith("/device")
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-blue-100"
                  }`}
                >
                  Your Device
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-base font-medium px-4 py-2 rounded hover:bg-blue-100 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className={`text-base font-medium px-4 py-2 rounded ${
                    location.pathname === "/signin"
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-blue-100"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={`text-base font-medium px-4 py-2 rounded ${
                    location.pathname === "/signup"
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-blue-100"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
