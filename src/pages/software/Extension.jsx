import DisplayLayout from "../../components/DisplayLayout";
import { Code, Github, Video, Settings, PlugZap } from "lucide-react";

const Extension = () => {
  return (
    <DisplayLayout>
      <section className="relative w-full min-h-screen flex flex-col items-center justify-start px-6 py-16 font-mono text-[#1b4332]">
        <div className="container mx-auto max-w-5xl flex flex-col gap-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              CalSci VS Code Extension
            </h1>
            <p className="text-lg text-[#2d6a4f] max-w-2xl mx-auto">
              Seamlessly connect your CalSci programmable calculator with VS
              Code — program, upload, and monitor your ESP32 calculator directly
              from your editor.
            </p>
          </div>
          <div className="bg-[#f1faee] border border-[#95d5b2] rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <PlugZap className="w-6 h-6" /> Overview
            </h2>
            <p className="text-[#2d6a4f] leading-relaxed">
              The <strong>CalSci VS Code Extension</strong> is built to enhance
              your development workflow with the CalSci programmable calculator.
              It lets you write and execute MicroPython code directly on your
              ESP32-powered calculator. You can also manage GPIO pins, visualize
              data, and upload scripts in one click — making your hardware
              experimentation faster and smarter.
            </p>
          </div>
          <div className="bg-[#f8fdf7] border border-[#95d5b2] rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Settings className="w-6 h-6" /> Key Features
            </h2>
            <ul className="list-disc pl-8 text-[#2d6a4f] space-y-2">
              <li>
                ⚡ Direct communication with CalSci ESP32 device via serial
                port.
              </li>
              <li>🧠 Real-time code execution and REPL terminal built-in.</li>
              <li>
                📊 GPIO pin management and live sensor monitoring interface.
              </li>
              <li>
                📂 Auto-upload of MicroPython files to your device with one
                click.
              </li>
              <li>💾 Integrated logging and error tracking panel.</li>
              <li>🔌 Auto-detection of connected CalSci calculator devices.</li>
              <li>
                🌐 Internet sync for pulling and pushing code from the CalSci
                cloud.
              </li>
              <li>
                🧩 Open-source and fully extensible for community developers.
              </li>
            </ul>
          </div>
          <div className="bg-[#f1faee] border border-[#95d5b2] rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Code className="w-6 h-6" /> Installation & Setup
            </h2>
            <ol className="list-decimal pl-8 text-[#2d6a4f] space-y-3">
              <li>
                Install the extension from the VS Code Marketplace or manually
                via `.vsix` file.
              </li>
              <li>
                Connect your CalSci calculator (ESP32) to your computer using
                USB.
              </li>
              <li>
                Ensure you have <strong>Python ≥ 3.9</strong> and{" "}
                <strong>MicroPython firmware</strong> flashed on your device.
              </li>
              <li>
                Go to VS Code → <em>Command Palette</em> → search “CalSci:
                Connect Device”.
              </li>
              <li>
                Once connected, you can write MicroPython code and click “Run on
                CalSci”.
              </li>
              <li>
                To manage GPIO pins, open the <strong>CalSci Panel</strong> from
                the sidebar.
              </li>
            </ol>

            <div className="mt-4">
              <p className="text-[#1b4332] font-semibold">Prerequisites:</p>
              <ul className="list-disc pl-6 text-[#2d6a4f]">
                <li>VS Code (v1.80+)</li>
                <li>Node.js & npm (for extension developers)</li>
                <li>ESP32 board with CalSci firmware</li>
                <li>USB connection & correct COM/tty port permissions</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#f8fdf7] border border-[#95d5b2] rounded-xl p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Video className="w-6 h-6" /> Watch How It Works
            </h2>
            <p className="text-[#2d6a4f] text-center mb-6 max-w-xl">
              Here’s a short walkthrough showing how the CalSci extension
              interacts with your programmable calculator. (You’ll add your
              YouTube/video link below)
            </p>
            <div className="w-full max-w-3xl aspect-video bg-[#d8f3dc] border border-[#95d5b2] rounded-lg flex items-center justify-center text-[#1b4332]">
              🎥 Your Demo Video Will Appear Here
            </div>
          </div>
          <div className="text-center">
            <a
              href="https://github.com/your-github-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[#2d6a4f] text-[#1b4332] font-semibold hover:bg-[#b7e4c7] transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              Contribute on GitHub
            </a>
          </div>
        </div>
      </section>
    </DisplayLayout>
  );
};

export default Extension;
