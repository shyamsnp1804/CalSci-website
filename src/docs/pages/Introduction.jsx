import { Link } from "react-router-dom";

const Introduction = () => {
  return (
    <article className="flex flex-col gap-20 text-[#1b4332]">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          What is CalSci?
        </h1>
        <img
          src="/images/docs1.png"
          alt="CalSci programmable calculator"
          className="w-full max-w-4xl mx-auto"
        />
        <p className="text-lg sm:text-xl text-[#2d6a4f] max-w-3xl">
          CalSci is a programmable scientific calculator designed for engineers,
          students, and researchers who want more than buttons and equations. It
          combines software, hardware, and the internet into one compact device.
        </p>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">
          A Calculator That Talks to the Real World
        </h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          Unlike traditional calculators, CalSci comes with GPIO pins that let
          you connect sensors and electronic components. You can measure
          temperature, voltage, motion, and more — directly from your programs.
        </p>
        <div className="grid sm:grid-cols-2 gap-10 items-center">
          <img src="/images/sensor1.png" alt="GPIO Pins" />
          <img src="/images/sensor2.png" alt="Sensor connection" />
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">Apps, Just Like Your Phone</h2>

        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          Everything on CalSci runs as an app. You can download ready-made apps
          from the CalSci App Store for measurements, calculations, and
          experiments — without writing a single line of code.
        </p>
        <img
          src="/images/app1.png"
          alt="CalSci apps"
          className="w-full max-w-4xl"
        />
        <Link
          to="/docs/apps"
          className="text-[#40916c] font-medium underline w-fit"
        >
          Explore CalSci Apps →
        </Link>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">Internet-Connected by Design</h2>

        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          With built-in Wi-Fi, CalSci can connect to online services and cloud
          tools. This enables features like molecule search, cloud sync, and
          remote updates.
        </p>
        <img
          src="/images/feature.png"
          alt="Online features"
          className="w-full max-w-4xl"
        />
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">
          Build Your Own Apps in Python
        </h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          If you want to go deeper, CalSci provides a full Python SDK that lets
          you build your own apps — from simple calculators to sensor-driven
          tools.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link to="/docs/sdk" className="text-[#40916c] font-medium underline">
            CalSci SDK →
          </Link>
          <Link
            to="/docs/simulator"
            className="text-[#40916c] font-medium underline"
          >
            App Simulator →
          </Link>
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">Develop Faster with VS Code</h2>

        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          The CalSci VS Code Extension allows you to write, test, and deploy
          apps directly from your editor — making development fast and familiar.
        </p>
        <img
          src="/images/extension.png"
          alt="VS Code extension"
          className="w-full max-w-4xl"
        />
        <Link
          to="/docs/vscode"
          className="text-[#40916c] font-medium underline w-fit"
        >
          Learn about the VS Code Extension →
        </Link>
      </section>
      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-semibold">Fully Configurable</h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          CalSci includes system settings for display modes, Wi-Fi, power
          management, and device status — giving you full control over your
          workflow.
        </p>
      </section>
      <section className="pt-10 border-t border-[#b7e4c7]/50">
        <p className="text-[#2d6a4f]">
          Use the sidebar to explore hardware, software, and development tools
          in more detail.
        </p>
      </section>
    </article>
  );
};

export default Introduction;
