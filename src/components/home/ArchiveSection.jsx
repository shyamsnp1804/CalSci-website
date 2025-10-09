import React from "react";

const BackgroundBubbles = () => {
  return (
    <>
      <style>{`
                @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
                @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(-5deg); } }
            `}</style>
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div
          className="absolute bg-gradient-to-br from-green-200 to-lime-200 rounded-full filter blur-3xl opacity-30"
          style={{
            width: "400px",
            height: "400px",
            top: "10%",
            left: "15%",
            animation: "float1 20s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bg-gradient-to-br from-amber-200 to-orange-200 rounded-full filter blur-3xl opacity-30"
          style={{
            width: "350px",
            height: "350px",
            bottom: "10%",
            right: "15%",
            animation: "float2 24s ease-in-out infinite alternate",
          }}
        ></div>
      </div>
    </>
  );
};

const ArchiveSection = () => {
  const images = [
    { src: "/image1.jpeg", alt: "Archive image 1" },
    { src: "/image2.jpeg", alt: "Archive image 2" },
    { src: "/image3.jpeg", alt: "Archive image 3" },
    { src: "/image4.jpeg", alt: "Archive image 4" },
    { src: "/image5.jpeg", alt: "Archive image 5" },
    { src: "/image6.jpeg", alt: "Archive image 6" },
    { src: "/image7.jpeg", alt: "Archive image 7" },
    { src: "/image8.jpeg", alt: "Archive image 8" },
    { src: "/image9.jpeg", alt: "Archive image 9" },
    { src: "/image10.jpeg", alt: "Archive image 10" },
    { src: "/image11.jpeg", alt: "Archive image 11" },
  ];

  return (
    <div className="relative bg-gray-50 overflow-hidden py-16 sm:py-24">
      <BackgroundBubbles />
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            From Our Archives
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            A glimpse into our operations and successful deployments.
          </p>
        </div>
      </div>

      <div className="relative w-full mt-12 overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-50 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-50 to-transparent"></div>
        <style>{`
                    @keyframes scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-100%); }
                    }
                    .animate-scroll {
                        animation: scroll 80s linear infinite;
                    }
                `}</style>
        <div className="flex w-max animate-scroll hover:animation-pause">
          {images.map((image, index) => (
            <div key={`a-${index}`} className="flex-shrink-0 w-auto px-4">
              <img
                src={image.src}
                alt={image.alt}
                className="h-64 rounded-2xl shadow-xl object-cover"
              />
            </div>
          ))}
          {images.map((image, index) => (
            <div
              key={`b-${index}`}
              className="flex-shrink-0 w-auto px-4"
              aria-hidden="true"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-64 rounded-2xl shadow-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveSection;
