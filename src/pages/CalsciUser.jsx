import React from "react";
import DisplayLayout from "../components/DisplayLayout";
import AuthForm from "./AuthForm";
import { Cpu, Smartphone, Zap, Code } from "lucide-react";

function CalsciUser() {
  return (
    <DisplayLayout>
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto z-10 w-full">
          <div className="text-left flex-1 max-w-2xl flex flex-col gap-6 px-2">
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-[#1b4332]">
                CalSci
              </h1>
              <div className="h-1 w-20 bg-[#2d6a4f] rounded-full"></div>
            </div>

            <p className="text-lg sm:text-xl font-mono text-[#2d6a4f] leading-relaxed">
              India’s first and only open-source scientific programmable
              calculator. Connect your hardware to the cloud and supercharge
              your workflow.
            </p>

            <div className="grid gap-6 mt-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1b4332] text-lg">
                    Device Registration
                  </h3>
                  <p className="text-[#2d6a4f] text-sm opacity-90">
                    Link your device via its unique MAC address to claim
                    ownership and secure your data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1b4332] text-lg">
                    Personal App Store
                  </h3>
                  <p className="text-[#2d6a4f] text-sm opacity-90">
                    Browse, maintain, and manage apps specifically designed for
                    your CalSci hardware.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1b4332] text-lg">
                    One-Click Wireless Updates
                  </h3>
                  <p className="text-[#2d6a4f] text-sm opacity-90">
                    No cables required. Update your device and push new apps
                    wirelessly with a single click.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <Code size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1b4332] text-lg">
                    VS Code Integration
                  </h3>
                  <p className="text-[#2d6a4f] text-sm opacity-90">
                    Use our VS Code extension to write code and sync apps
                    directly to your cloud account instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center flex-1 w-full max-w-md lg:max-w-none px-2">
            <div className="w-full max-w-md">
              <AuthForm />
            </div>
          </div>
        </div>
      </section>
    </DisplayLayout>
  );
}

export default CalsciUser;
