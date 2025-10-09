import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundBubbles = () => {
  return (
    <>
      <style>
        {`
                    @keyframes float1 {
                        0% { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
                        25% { transform: translateY(-20px) translateX(30px) scale(1.05) rotate(5deg); }
                        50% { transform: translateY(-10px) translateX(-20px) scale(1) rotate(-5deg); }
                        75% { transform: translateY(20px) translateX(10px) scale(0.95) rotate(10deg); }
                        100% { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
                    }
                    @keyframes float2 {
                        0% { transform: translateY(0) translateX(0) scale(1.1) rotate(0deg); }
                        50% { transform: translateY(40px) translateX(-40px) scale(1) rotate(-15deg); }
                        100% { transform: translateY(0) translateX(0) scale(1.1) rotate(0deg); }
                    }
                    @keyframes float3 {
                        0% { transform: translateY(0) translateX(0) scale(0.95) rotate(10deg); }
                        40% { transform: translateY(-30px) translateX(-30px) scale(1) rotate(0deg); }
                        70% { transform: translateY(30px) translateX(30px) scale(1.05) rotate(-10deg); }
                        100% { transform: translateY(0) translateX(0) scale(0.95) rotate(10deg); }
                    }
                `}
      </style>
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
            animation: "float3 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute bg-gradient-to-br from-yellow-800 to-amber-500 rounded-full filter blur-3xl opacity-20"
          style={{
            width: "250px",
            height: "250px",
            bottom: "5%",
            right: "25%",
            animation: "float1 5s ease-in-out infinite alternate",
            animationDelay: "2s",
          }}
        ></div>
      </div>
    </>
  );
};

const ArrowLeftIcon = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
);
const ArrowRightIcon = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
);

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Deploy & Collect",
      subtitle: "CalSci Slave",
      description:
        "Easily connect our versatile Slave devices to any sensor on your machinery. They process readings into meaningful data and transmit them wirelessly.",
      image: "https://placehold.co/800x600/1F2937/9CA3AF?text=Slave+Device",
    },
    {
      title: "2. Aggregate & Process",
      subtitle: "CalSci Master",
      description:
        "The Master device is the powerful heart of the system, collecting data from up to 10 Slaves and performing strong edge computing for faster processing.",
      image: "https://placehold.co/800x600/1F2937/9CA3AF?text=Master+Device",
    },
    {
      title: "3. Monitor & Control",
      subtitle: "CalSci Console",
      description:
        "View all your data in real-time from any browser on our cloud platform. Set parameters, receive alerts, and install new apps from our AppStore.",
      image: "https://placehold.co/800x600/1F2937/9CA3AF?text=Console+UI",
    },
  ];

  const [direction, setDirection] = useState(0);

  const handleStepChange = (newStep) => {
    if (newStep > activeStep) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setActiveStep(newStep);
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="bg-gray-50 py-16 sm:py-24 relative overflow-hidden">
      <BackgroundBubbles />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            From Sensor to Screen in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform is designed for seamless integration and effortless
            operation.
          </p>
        </div>

        <div className="mt-16 relative max-w-7xl mx-auto">
          <div className="relative h-[600px] md:h-[480px] overflow-hidden rounded-2xl shadow-2xl bg-white/70 backdrop-blur-lg border border-white/30">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 0.5,
                  ease: [0.44, 0, 0.56, 1],
                }}
                className="absolute w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12"
              >
                <div className="text-left md:order-1">
                  <span className="font-semibold text-blue-600">
                    {steps[activeStep].subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                    {steps[activeStep].title}
                  </h3>
                  <p className="mt-4 text-gray-700 text-lg">
                    {steps[activeStep].description}
                  </p>
                </div>
                <div className="md:order-2">
                  <img
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    className="rounded-xl w-full object-cover shadow-lg"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <ArrowLeftIcon
            onClick={() => handleStepChange(activeStep - 1)}
            disabled={activeStep === 0}
          />
          <ArrowRightIcon
            onClick={() => handleStepChange(activeStep + 1)}
            disabled={activeStep === steps.length - 1}
          />
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepChange(index)}
              className={`w-3 h-3 rounded-full ${
                activeStep === index ? "bg-blue-600" : "bg-gray-300"
              } transition-colors`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
