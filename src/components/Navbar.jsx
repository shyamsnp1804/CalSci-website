import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) return null;

  const username = user?.user_metadata?.userName || user?.email?.split("@")[0];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm">
      <div className="flex items-center justify-center py-3">
        <div className="flex items-center justify-center bg-[#1b4332]/90 text-[#d8f3dc] rounded-full px-10 py-2 shadow-lg backdrop-blur-xl space-x-8">
          <Link
            to="/"
            className="text-xl font-mono font-bold text-[#b7e4c7] hover:text-[#95d5b2] transition-colors"
          >
            CalSci
          </Link>
          <Link
            to="/software/native"
            className="text-xl font-mono font-bold text-[#b7e4c7] hover:text-[#95d5b2]"
          >
            Docs
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/calsciuser"
              className="text-xl font-mono font-bold text-[#b7e4c7] hover:text-[#95d5b2]"
            >
              BeUser
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-xl font-mono font-bold text-[#95d5b2] hover:text-[#b7e4c7]"
              >
                {username}'s Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
