import React from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  Smartphone,
  Shield,
  PlugZap,
  TerminalSquare,
  LineChart,
} from "lucide-react";

const BackgroundBubbles = () => {
  return (
    <>
      <style>{`
                @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
                @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(-5deg); } }
            `}</style>
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div
          className="absolute bg-gradient-to-br from-red-800 to-orange-500 rounded-full filter blur-3xl opacity-20"
          style={{
            width: "350px",
            height: "350px",
            top: "5%",
            left: "15%",
            animation: "float1 5s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bg-gradient-to-br from-green-800 to-teal-500 rounded-full filter blur-3xl opacity-20"
          style={{
            width: "300px",
            height: "300px",
            bottom: "10%",
            left: "5%",
            animation: "float2 5s ease-in-out infinite alternate",
            animationDelay: "3s",
          }}
        ></div>
        <div
          className="absolute bg-gradient-to-br from-purple-800 to-indigo-500 rounded-full filter blur-3xl opacity-15"
          style={{
            width: "450px",
            height: "450px",
            top: "20%",
            right: "10%",
            animation: "float1 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
      </div>
    </>
  );
};

const iconComponents = {
  BarChart2: () => <BarChart2 className="h-7 w-7" />,
  Smartphone: () => <Smartphone className="h-7 w-7" />,
  Shield: () => <Shield className="h-7 w-7" />,
  PlugZap: () => <PlugZap className="h-7 w-7" />,
  TerminalSquare: () => <TerminalSquare className="h-7 w-7" />,
  LineChart: () => <LineChart className="h-7 w-7" />,
};

const FeaturesSection = () => {
  const features = [
    {
      icon: "BarChart2",
      title: "Real-Time Monitoring",
      description:
        "Track machinery performance instantly from our web dashboard or directly on the CalSci Master device.",
      imageSrc: "/image14.png",
    },
    {
      icon: "Smartphone",
      title: "Instant Mobile Alerts",
      description:
        "Receive immediate notifications on your phone the moment a machine's parameters hit a critical threshold.",
      imageSrc: "/image5.jpeg",
    },
    {
      icon: "Shield",
      title: "Secure Access Control",
      description:
        "Manage your team with a secure, role-based console. Assign admin or employee permissions to control who sees what.",
      imageSrc: "/image15.png",
    },
    {
      icon: "PlugZap",
      title: "Plug & Play Setup",
      description:
        "Get started in minutes. Simply attach a CalSci Slave to your sensor, and it instantly connects to the Master device.",
      imageSrc: "/image2.jpeg",
    },
    {
      icon: "TerminalSquare",
      title: "On-Floor Master Device",
      description:
        "View all real-time data and settings directly on the factory floor with the CalSci Master, no computer needed.",
      imageSrc: "/image1.jpeg",
    },
    {
      icon: "LineChart",
      title: "One-Click Data Analysis",
      description:
        "Export comprehensive records with a single click to analyze machine performance and predict future needs.",
      imageSrc: "/image4.jpeg",
    },
  ];

  const cardVariants = {
    initial: { scale: 1, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" },
    hover: { scale: 1.05, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)" },
  };

  const imageVariants = {
    initial: { scale: 1.1 },
    hover: { scale: 1.2, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative bg-gray-50 overflow-hidden py-7 sm:py-7">
      <BackgroundBubbles />
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            A Platform Built for Performance
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We've packed CalSci with features to make automation powerful and
            intuitive.
          </p>
        </div>
        <div
          className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          style={{ perspective: "1200px" }}
        >
          {features.map((feature, index) => {
            const Icon = iconComponents[feature.icon];
            return (
              <motion.div
                key={index}
                className="relative h-80 cursor-pointer"
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                  variants={{ hover: { transform: "rotateY(180deg)" } }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div
                    className="absolute w-full h-full p-6 flex flex-col items-start bg-white/70 backdrop-blur-lg rounded-2xl border border-white/30"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="mb-4 bg-blue-600/10 text-blue-600 p-3 rounded-xl">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-800 text-m">
                      {feature.description}
                    </p>
                  </div>
                  <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <motion.img
                      src={feature.imageSrc}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      variants={imageVariants}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
