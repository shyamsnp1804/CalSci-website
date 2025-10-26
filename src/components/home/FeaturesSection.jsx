import DisplayLayout from "../DisplayLayout";
import { Code, Wifi, Cpu, Calculator, Terminal, Monitor } from "lucide-react";

const features = [
  {
    icon: <Code size={48} className="text-[#1b4332]" />,
    title: "Fully Programmable",
    description:
      "Customize every function and program your own calculations and sequences easily.",
  },
  {
    icon: <Wifi size={48} className="text-[#1b4332]" />,
    title: "Internet Connected",
    description:
      "Connect to the internet to fetch data, update firmware, or integrate with online platforms.",
  },
  {
    icon: <Cpu size={48} className="text-[#1b4332]" />,
    title: "GPIO Testing & Calibration",
    description:
      "Use GPIO pins to test, calibrate, and control external circuits in real-time.",
  },
  {
    icon: <Calculator size={48} className="text-[#1b4332]" />,
    title: "Math Apps",
    description:
      "Run your mathematical functions, frequently used formulas, and create custom applications.",
  },
  {
    icon: <Terminal size={48} className="text-[#1b4332]" />,
    title: "VSCode Extension",
    description:
      "Code, debug, and program your CalSci device using our dedicated VSCode extension and SDK.",
  },
  {
    icon: <Monitor size={48} className="text-[#1b4332]" />,
    title: "Simulator & Testing",
    description:
      "Test your programs in a safe virtual environment before running them on the actual device.",
  },
];

const FeaturesSection = () => {
  return (
    <DisplayLayout>
      <section className="relative w-full min-h-screen px-6 py-16">
        <div className="text-center mb-12 z-10">
          <h2 className="text-4xl sm:text-5xl font-mono font-bold text-[#1b4332]">
            What CalSci Can Do
          </h2>
          <p className="text-lg sm:text-xl font-mono text-[#2d6a4f] mt-4">
            Explore the features of India’s only open-source programmable
            calculator.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-mono font-semibold mb-2 text-[#1b4332]">
                {feature.title}
              </h3>
              <p className="text-base font-mono text-[#2d6a4f] opacity-90">
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
