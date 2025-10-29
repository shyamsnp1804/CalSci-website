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
import calsciImage from "../../../public/calsci1.png";

const HowItMade = () => {
  return (
    <DisplayLayout>
      <div className="min-h-screen w-full flex flex-col items-center text-gray-900">
        <div className="w-full flex flex-col items-center mt-10">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 text-[#1b4332]">
            How CalSci is Made
          </h1>
          <img
            src={calsciImage}
            alt="calsci-device"
            className="w-[320px] md:w-[800px] rounded-xl shadow-lg mb-8"
          />
          <p className="text-lg max-w-2xl font-mono font-semibold text-center text-[#1b4332]">
            CalSci is built around the powerful <b>ESP32-S3</b> microcontroller
            and a <b>128×64 monochrome OLED</b> display. It’s a fully
            open-source project combining innovation in hardware and software.
          </p>
        </div>

        <div className="h-px bg-gray-300 w-3/4 my-10"></div>

        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-mono font-semibold text-[#1b4332] mb-6">
            Project Structure
          </h2>

          <div className="flex flex-col md:flex-row gap-16 items-start md:items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <Cpu size={30} className="text-[#1b4332]" />
                <h3 className="text-2xl font-mono font-semibold">Software</h3>
              </div>
              <p className="text-center font-mono text-[#1b4332] max-w-sm">
                The software ecosystem is divided into three main components:
              </p>
              <div className="border-l-2 text-[#1b4332] pl-6 space-y-4 mt-2">
                <Link
                  to="/software/native"
                  className="flex items-center space-x-2 hover:text-blue-600 transition"
                >
                  <Code size={20} />
                  <span>
                    <b>Native Firmware</b> – Powers the ESP32-S3 directly.
                  </span>
                </Link>
                <Link
                  to="/software/simulator"
                  className="flex items-center space-x-2 hover:text-blue-600 transition"
                >
                  <Monitor size={20} />
                  <span>
                    <b>Simulator</b> – Run and test programs virtually.
                  </span>
                </Link>
                <Link
                  to="/software/extension"
                  className="flex items-center space-x-2 hover:text-blue-600 transition"
                >
                  <Layers size={20} />
                  <span>
                    <b>VS Code Extension</b> – Develop, upload, and control your
                    CalSci.
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <CircuitBoard size={30} className="text-[#1b4332]" />
                <h3 className="text-2xl font-mono font-semibold">Hardware</h3>
              </div>
              <p className="text-center font-mono text-[#1b4332] max-w-sm">
                The hardware design focuses on both circuit efficiency and
                mechanical structure:
              </p>
              <div className="border-l-2 text-[#1b4332] pl-6 space-y-4 mt-2">
                <Link
                  to="/hardware/circuit"
                  className="flex items-center space-x-2 hover:text-blue-600 transition"
                >
                  <GitBranch size={20} />
                  <span>
                    <b>Electrical Circuit Design</b> – Schematic & power layout.
                  </span>
                </Link>
                <Link
                  to="/hardware/mechanical"
                  className="flex items-center space-x-2 hover:text-blue-600 transition"
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
