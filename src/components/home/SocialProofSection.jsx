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
          className="absolute bg-gradient-to-br from-blue-800 to-cyan-500 rounded-full filter blur-3xl opacity-20"
          style={{
            width: "400px",
            height: "400px",
            top: "5%",
            left: "10%",
            animation: "float1 22s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bg-gradient-to-br from-green-800 to-lime-500 rounded-full filter blur-3xl opacity-20"
          style={{
            width: "300px",
            height: "300px",
            bottom: "15%",
            right: "15%",
            animation: "float2 28s ease-in-out infinite alternate",
            animationDelay: "2s",
          }}
        ></div>
      </div>
    </>
  );
};

const SocialProofSection = () => {
  return (
    <div className="relative bg-gray-50 overflow-hidden py-16 sm:py-24">
      <BackgroundBubbles />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8 md:p-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 text-gray-700">
              We successfully demonstrated our remote temperature monitoring
              application at the Rubber Division of
            </p>
            <p className="mt-4 text-2xl font-semibold text-blue-600">
              DHARAMPAL SATYAPAL LIMITED
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Zone-1, Industrial Growth Centre, Bodhjungnagar, Agartala
            </p>
          </div>

          <div className="w-full h-64 md:h-full rounded-xl overflow-hidden shadow-lg">
            <img
              src="../../../public/image5.jpeg"
              alt="Demonstration at Dharampal Satyapal Limited"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;
