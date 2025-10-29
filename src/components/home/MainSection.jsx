import DisplayLayout from "../DisplayLayout";
import calsciDevice from "../../../public/calsci.png";

const MainSection = () => {
  return (
    <DisplayLayout>
      <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-20 z-10">
          <div className="text-left max-w-lg flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold leading-snug text-[#1b4332]">
              CalSci
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-mono text-[#2d6a4f] opacity-90">
              India’s only open-source scientific programmable calculator —
              fully programmable, internet-connected, and ready for your
              experiments.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-[#2d6a4f] text-[#1b4332] font-mono text-base hover:bg-[#b7e4c7] transition-all duration-300"
              >
                GitHub
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-[#2d6a4f] text-[#1b4332] font-mono text-base hover:bg-[#b7e4c7] transition-all duration-300"
              >
                Community
              </a>
              <a
                href=""
                className="px-4 py-2 rounded-md border border-[#2d6a4f] text-[#1b4332] font-mono text-base hover:bg-[#b7e4c7] transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-center">
            <img
              src={calsciDevice}
              alt="CalSci Device"
              className="w-[220px] sm:w-[290px] md:w-[330px] lg:w-[360px] drop-shadow-lg"
            />
          </div>
        </div>
      </section>
    </DisplayLayout>
  );
};

export default MainSection;
