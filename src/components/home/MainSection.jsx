import DisplayLayout from "../DisplayLayout";
import calsciDevice from "../../../public/calsci.png";

const MainSection = () => {
  return (
    <DisplayLayout>
      <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 max-w-6xl mx-auto z-10">
          <div className="text-left flex-1 max-w-xl flex flex-col gap-4 px-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold leading-snug text-[#1b4332]">
              CalSci
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-mono text-[#2d6a4f] opacity-90">
              India’s only open-source scientific programmable calculator —
              fully programmable, internet-connected, and ready for your
              experiments.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-[#2d6a4f] text-[#1b4332] font-mono text-sm sm:text-base hover:bg-[#b7e4c7] transition-all duration-300"
              >
                GitHub
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-[#2d6a4f] text-[#1b4332] font-mono text-sm sm:text-base hover:bg-[#b7e4c7] transition-all duration-300"
              >
                Community
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-md border border-[#2d6a4f] text-[#1b4332] font-mono text-sm sm:text-base hover:bg-[#b7e4c7] transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex justify-center flex-1 px-2">
            <img
              src={calsciDevice}
              alt="CalSci Device"
              className="w-[60%] sm:w-[300px] md:w-[340px] lg:w-[380px] max-w-[400px] drop-shadow-lg"
            />
          </div>
        </div>
      </section>
    </DisplayLayout>
  );
};

export default MainSection;
