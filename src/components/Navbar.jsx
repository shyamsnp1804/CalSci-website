import { Link } from "react-router-dom";

const Navbar = () => {
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
            to="/docs"
            className="text-lg font-mono font-medium text-[#d8f3dc] hover:text-[#b7e4c7] transition-colors"
          >
            Docs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
