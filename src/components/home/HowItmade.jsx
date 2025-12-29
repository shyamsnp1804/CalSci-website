import { Link } from "react-router-dom";
import {
  Cpu,
  Code,
  Monitor,
  CircuitBoard,
  Hammer,
  Layers,
  GitBranch,
} from "lucide-react";
import DisplayLayout from "../DisplayLayout";

const HowItMade = () => {
  return (
    <DisplayLayout>
      <div className="w-full flex flex-col items-center text-gray-900 px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="w-full flex flex-col items-center text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4 text-[#1b4332]">
            How CalSci is Made
          </h1>

          <img
            src="/calsci1.png"
            alt="CalSci Device"
            className="w-[240px] sm:w-[380px] md:w-[600px] lg:w-[800px] rounded-xl shadow-lg mb-6 sm:mb-8"
          />

          <p className="text-base sm:text-lg md:text-xl max-w-3xl font-mono font-semibold text-center text-[#1b4332] leading-relaxed">
            CalSci is built around the powerful <b>ESP32-S3</b> microcontroller
            and a <b>128×64 monochrome OLED</b> display. It’s a fully
            open-source project combining innovation in hardware and software.
          </p>
        </div>
        <div className="h-px bg-[#b7e4c7] w-3/4 mb-10"></div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-semibold text-[#1b4332] mb-6">
            Project Structure
          </h2>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start md:items-stretch justify-center w-full max-w-6xl">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Cpu size={28} className="text-[#1b4332]" />
                <h3 className="text-xl sm:text-2xl font-mono font-semibold text-[#1b4332]">
                  Software
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#1b4332] max-w-sm leading-relaxed">
                The software ecosystem is divided into three main components:
              </p>

              <div className="border-l-2 border-[#95d5b2] text-[#1b4332] pl-5 space-y-4 mt-2 text-left">
                <Link
                  to="/docs/SDK"
                  className="flex items-start space-x-2 hover:text-[#2d6a4f] transition-colors"
                >
                  <Code size={20} />
                  <span>
                    <b>Native Firmware</b> – Powers the ESP32-S3 directly.
                  </span>
                </Link>
                <Link
                  to="/docs/simulator"
                  className="flex items-start space-x-2 hover:text-[#2d6a4f] transition-colors"
                >
                  <Monitor size={20} />
                  <span>
                    <b>Simulator</b> - Run and test programs virtually.
                  </span>
                </Link>
                <Link
                  to="/docs/vscode"
                  className="flex items-start space-x-2 hover:text-[#2d6a4f] transition-colors"
                >
                  <Layers size={20} />
                  <span>
                    <b>VS Code Extension</b> - Develop, upload, and control your
                    CalSci.
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <CircuitBoard size={28} className="text-[#1b4332]" />
                <h3 className="text-xl sm:text-2xl font-mono font-semibold text-[#1b4332]">
                  Hardware
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#1b4332] max-w-sm leading-relaxed">
                The hardware design focuses on both circuit efficiency and
                mechanical structure:
              </p>

              <div className="border-l-2 border-[#95d5b2] text-[#1b4332] pl-5 space-y-4 mt-2 text-left">
                <Link
                  to="/docs/electricalCircuit"
                  className="flex items-start space-x-2 hover:text-[#2d6a4f] transition-colors"
                >
                  <GitBranch size={20} />
                  <span>
                    <b>Electrical Circuit Design</b> – Schematic & power layout.
                  </span>
                </Link>
                <Link
                  to="/docs/bodyDesign"
                  className="flex items-start space-x-2 hover:text-[#2d6a4f] transition-colors"
                >
                  <Hammer size={20} />
                  <span>
                    <b>Mechanical Design</b> – Body, buttons, and assembly.
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DisplayLayout>
  );
};

export default HowItMade;
