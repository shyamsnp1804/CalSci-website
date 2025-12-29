import { useState } from "react";
import { Outlet } from "react-router-dom";
import DisplayLayout from "../components/DisplayLayout";
import DocsSidebar from "./DocsSidebar";

const DocsLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DisplayLayout>
      <div className="w-full min-h-screen flex">
        {/* ---- Desktop Sidebar ---- */}
        <aside
          className="hidden md:block fixed w-72 px-6 py-8 h-[calc(100vh-84px)]"
          style={{ top: "84px" }}
        >
          <DocsSidebar />
        </aside>

        {/* ---- Mobile Drawer ---- */}
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            <aside className="absolute left-0 top-[84px] h-[calc(100vh-84px)] w-72 bg-[#e0f2e9] p-6 shadow-2xl border-r">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-mono font-semibold text-[#1b4332]">
                  Docs Menu
                </h2>

                <button
                  className="px-2 py-1 rounded-md border font-mono text-xs"
                  onClick={() => setIsOpen(false)}
                >
                  Close ✕
                </button>
              </div>

              <DocsSidebar />
            </aside>
          </div>
        )}

        {/* ---- Main Content ---- */}
        <main className="flex-1 px-6 sm:px-10 py-10 md:ml-72">
          <div className="max-w-5xl">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden mb-6 flex items-center gap-2 px-3 py-2 rounded-lg border bg-white shadow-sm font-mono text-sm"
            >
              ☰ Open Docs Menu
            </button>

            <Outlet />
          </div>
        </main>
      </div>
    </DisplayLayout>
  );
};

export default DocsLayout;
