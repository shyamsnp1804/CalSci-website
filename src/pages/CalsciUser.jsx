import React from "react";
import DisplayLayout from "../components/DisplayLayout";
import AuthForm from "./AuthForm";

function CalsciUser() {
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
          </div>
          <div className="flex justify-center flex-1 px-2">
            <AuthForm />
          </div>
        </div>
      </section>
    </DisplayLayout>
  );
}

export default CalsciUser;
