import React from "react";

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
            animation: "float2 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        ></div>
      </div>
    </>
  );
};

const CpuChipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <rect x="4" y="4" width="16" height="16" rx="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);
const ZapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const CloudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);
const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <ZapIcon />,
      title: "Real-Time Updates",
      description:
        "Our console updates instantly, so you can operate without any delays in monitoring or control.",
    },
    {
      icon: <CpuChipIcon />,
      title: "Powerful Edge Computing",
      description:
        "Processes happen faster with strong computations performed directly on the CalSci Master.",
    },
    {
      icon: <CloudIcon />,
      title: "Cloud AppStore",
      description:
        "Install new apps for different sensors from the CalSci Console, just like on your phone.",
    },
    {
      icon: <CodeIcon />,
      title: "Low-Code Environment",
      description:
        "Build new applications for your sensors with less code, directly on the CalSci Console.",
    },
  ];

  return (
    <div className="relative bg-gray-50 overflow-hidden py-5 sm:py-5">
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
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/30"
            >
              <div className="mb-4 bg-blue-600/10 text-blue-600 p-3 rounded-xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
