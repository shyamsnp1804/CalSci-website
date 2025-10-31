import DisplayLayout from "../DisplayLayout";
import { Code, Wifi, Cpu, Calculator, Terminal, Monitor } from "lucide-react";

const features = [
  {
    icon: <Code size={42} className="text-[#1b4332]" />,
    title: "Fully Programmable",
    description:
      "Customize every function and program your own calculations and sequences easily.",
  },
  {
    icon: <Wifi size={42} className="text-[#1b4332]" />,
    title: "Internet Connected",
    description:
      "Connect to the internet to fetch data, update firmware, or integrate with online platforms.",
  },
  {
    icon: <Cpu size={42} className="text-[#1b4332]" />,
    title: "GPIO Testing & Calibration",
    description:
      "Use GPIO pins to test, calibrate, and control external circuits in real-time.",
  },
  {
    icon: <Calculator size={42} className="text-[#1b4332]" />,
    title: "Math Apps",
    description:
      "Run your mathematical functions, frequently used formulas, and create custom applications.",
  },
  {
    icon: <Terminal size={42} className="text-[#1b4332]" />,
    title: "VSCode Extension",
    description:
      "Code, debug, and program your CalSci device using our dedicated VSCode extension and SDK.",
  },
  {
    icon: <Monitor size={42} className="text-[#1b4332]" />,
    title: "Simulator & Testing",
    description:
      "Test your programs in a safe virtual environment before running them on the actual device.",
  },
];

const FeaturesSection = () => {
  return (
    <DisplayLayout>
      <section className="relative w-full px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-[#1b4332]">
            What CalSci Can Do
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-mono text-[#2d6a4f] mt-3 sm:mt-4 max-w-3xl mx-auto">
            Explore the features of India’s only open-source programmable
            calculator.
          </p>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-md rounded-xl p-5 sm:p-6 flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300 shadow-md"
            >
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-mono font-semibold mb-2 text-[#1b4332]">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base font-mono text-[#2d6a4f] opacity-90 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </DisplayLayout>
  );
};

export default FeaturesSection;
