import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <section className="pt-20 pb-10 md:pt-28 md:pb-14 lg:pt-32 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Left Text Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center max-w-sm md:max-w-md lg:max-w-lg text-center md:text-left h-full"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                "Tailor your calculations like{" "}
                <span className="text-blue-600">never before</span> with{" "}
                <span className="text-blue-600">CalSci</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                Design apps that match your style and needs"
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link to="/learn-more">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-blue-600 text-blue-600 px-5 py-2.5 rounded-lg text-base font-medium hover:bg-blue-50 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center items-center relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-full"
            >
              <img
                src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg"
                alt="Calculator"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -z-10 rounded-full w-32 h-32 bg-blue-200/30 blur-2xl top-0 right-0"></div>
              <div className="absolute -z-10 rounded-full w-48 h-48 bg-blue-300/30 blur-2xl bottom-0 left-0"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
