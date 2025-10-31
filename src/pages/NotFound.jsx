import { Link } from "react-router-dom";
import DisplayLayout from "../components/DisplayLayout";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <DisplayLayout>
      <section className="w-full min-h-screen flex flex-col items-center justify-center text-center font-mono px-6">
        <div className="bg-white/30 backdrop-blur-sm border border-[#95d5b2] rounded-2xl p-10 shadow-md max-w-md">
          <AlertTriangle className="w-16 h-16 text-[#1b4332] mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-[#1b4332] mb-4">404</h1>
          <p className="text-lg text-[#2d6a4f] mb-8">
            Oops! The page you’re looking for doesn’t exist or was moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#1b4332] text-white rounded-lg hover:bg-[#2d6a4f] transition"
          >
            Go Home
          </Link>
        </div>
      </section>
    </DisplayLayout>
  );
};

export default NotFound;
