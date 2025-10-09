import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MainSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4475523/pexels-photo-4475523.jpeg"
          alt="Industrial Automation Background"
          className="w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight">
            Industrial Automation, Simplified.
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            The CalSci platform provides a robust, plug-and-play solution to
            monitor and control your factory machinery, bringing real-time data
            from the factory floor to the cloud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all"
              >
                Request a Demo
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white text-blue-700 border-2 border-transparent px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MainSection;
