import { Link } from "react-router-dom";

const VSCodeExtension = () => {
  return (
    <article className="flex flex-col gap-24 text-[#1b4332]">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          CalSci VS Code Extension
        </h1>
        <p className="text-lg sm:text-xl text-[#2d6a4f] max-w-3xl">
          The CalSci VS Code Extension lets you build, test, and deploy apps
          directly from your editor. No manual uploads, no device juggling —
          everything happens in one place.
        </p>
        <img
          src=" "
          alt="CalSci VS Code Extension"
          className="w-full max-w-5xl mx-auto"
        />
      </section>
      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-semibold">What Can You Do With It?</h2>
        <ul className="list-disc pl-6 space-y-3 text-lg text-[#2d6a4f] max-w-3xl">
          <li>Create CalSci apps using Python</li>
          <li>Connect to your CalSci device with one click</li>
          <li>Upload apps directly to the device</li>
          <li>Fetch installed apps from hardware</li>
          <li>Open live MicroPython REPL</li>
          <li>Manage apps via cloud login</li>
        </ul>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">Create a CalSci App</h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          Creating an app is as simple as selecting <strong>Make App</strong>{" "}
          from the CalSci sidebar. The extension generates a ready-to-run Python
          template so you can focus on logic, not boilerplate.
        </p>
        <img src=" " alt="Create CalSci App" className="w-full max-w-3xl" />
        <Link
          to="/docs/apps"
          className="text-[#40916c] font-medium underline w-fit"
        >
          Learn how CalSci Apps work →
        </Link>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">Upload Apps to CalSci</h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          Once your app is ready, connect your device and upload it with a
          single click. The extension handles file transfer and execution
          automatically.
        </p>
        <img src=" " alt="Upload app to CalSci" className="w-full max-w-3xl" />
        <div className="border border-dashed border-[#b7e4c7] rounded-lg p-10 text-center text-[#2d6a4f]">
          GIF placeholder: Upload app flow
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">
          Fetch Installed Apps from Device
        </h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          With CalSci connected, you can instantly view all installed apps on
          the device. This helps you manage, update, or debug apps without
          switching tools.
        </p>
        <img src=" " alt="Installed apps list" className="w-full max-w-3xl" />
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">
          Cloud & App Store Integration
        </h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          Log in to your CalSci account directly from VS Code. You can push your
          apps to the cloud, publish public apps, or fetch apps created by
          others — all without leaving the editor.
        </p>
        <div className="grid sm:grid-cols-2 gap-10">
          <img src=" " alt="Cloud login" />
          <img src=" " alt="Public apps" />
        </div>
        <Link
          to="/docs/apps"
          className="text-[#40916c] font-medium underline w-fit"
        >
          Explore App Store →
        </Link>
      </section>
      <section className="flex flex-col gap-10">
        <h2 className="text-3xl font-semibold">Powered by the Python SDK</h2>
        <p className="max-w-3xl text-[#2d6a4f] text-lg">
          The VS Code Extension is built on top of the CalSci Python SDK, giving
          you full access to hardware APIs, UI components, and system features.
        </p>
        <Link
          to="/docs/sdk"
          className="text-[#40916c] font-medium underline w-fit"
        >
          Read the SDK Documentation →
        </Link>
      </section>
      <section className="pt-10 border-t border-[#b7e4c7]/50">
        <p className="text-[#2d6a4f]">
          Use the sidebar to explore apps, SDK, simulator, and hardware in
          detail.
        </p>
      </section>
    </article>
  );
};

export default VSCodeExtension;
