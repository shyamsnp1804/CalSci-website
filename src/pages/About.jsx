import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Plug, Code } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-200 text-blue-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900 inline-block">
            About CalSci
          </h1>
          <p className="mt-3 text-lg md:text-xl text-blue-700 max-w-3xl mx-auto">
            CalSci is your IoT launchpad, combining hardware, software, and cloud to empower creators. Build custom apps, connect sensors, and harness AI for smart solutions.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div className="space-y-10" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900 text-center">
            Our IoT Ecosystem
          </h2>

          {/* COS Feature with Image */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row items-center gap-6"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              variants={imageVariants}
              className="md:w-1/3 shadow-lg shadow-blue-500/50 rounded-lg overflow-hidden"
            >
              <img
                src="/images/calsci-device.jpg" // Replace with actual image path
                alt="CalSci Device"
                className="w-full h-48 object-cover"
              />
            </motion.div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <Cpu className="w-8 h-8 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-blue-900">COS: CalSci OS</h3>
              </div>
              <p className="text-blue-800">
                COS is a lightweight, secure operating system for CalSci devices. Use our Python code editor to build and deploy apps directly to your hardware.
              </p>
            </div>
          </motion.div>

          {/* Console Feature with Image */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row items-center gap-6"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              variants={imageVariants}
              className="md:w-1/3 shadow-lg shadow-blue-500/50 rounded-lg overflow-hidden"
            >
              <img
                src="/images/calsci-console.jpg" // Replace with actual image path
                alt="CalSci Console"
                className="w-full h-48 object-cover"
              />
            </motion.div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <Cloud className="w-8 h-8 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-blue-900">Console: Cloud Hub</h3>
              </div>
              <p className="text-blue-800">
                The CalSci Console manages apps, stores sensor data, and delivers AI-powered insights. Monitor devices and create dashboards from our scalable cloud.
              </p>
            </div>
          </motion.div>

          {/* Modules Feature with Image */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row items-center gap-6"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              variants={imageVariants}
              className="md:w-1/3 shadow-lg shadow-blue-500/50 rounded-lg overflow-hidden"
            >
              <img
                src="/images/calsci-modules.jpg" // Replace with actual image path
                alt="CalSci Modules"
                className="w-full h-48 object-cover"
              />
            </motion.div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <Plug className="w-8 h-8 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-blue-900">Modules: Sensors</h3>
              </div>
              <p className="text-blue-800">
                Attach sensors to CalSci’s pin-based modules to collect data. Build apps to process readings, store data in the Console, and run AI calculations.
              </p>
            </div>
          </motion.div>

          {/* Code Editor Highlight */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300 text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center mb-3">
              <Code className="w-8 h-8 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-blue-900">Python Code Editor</h3>
            </div>
            <p className="text-blue-800">
              Our Python code editor lets you craft custom IoT apps. Code, test, and deploy apps to CalSci devices, integrating with COS and Console for end-to-end solutions.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;