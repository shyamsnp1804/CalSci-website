import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md text-center border border-blue-200">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AlertCircle className="mx-auto text-red-600" size={48} />
          <h1 className="text-3xl font-bold text-blue-800 mt-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 mt-2">
            The page you're looking for doesn't exist.
          </p>
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              Go to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
