import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DisplayLayout from "../components/DisplayLayout";
import DocsSidebar from "./DocsSidebar";

const DocsLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <DisplayLayout>
      <div className="relative w-full min-h-screen flex">
        <aside
          className="
    hidden md:flex
    w-72 shrink-0
    px-6 py-8
    sticky top-[84px]
    max-h-[calc(100vh-84px)]
    overflow-y-auto
    border-r border-[#b7e4c7]/60
  "
        >
          <DocsSidebar />
        </aside>

        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute left-4 right-4 top-[90px] mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-[#b7e4c7]/60">
              <DisplayLayout>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-m text-[#073623]">
                      Docs Menu
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-2 py-1 rounded-md border font-mono text-m text-[#073623]"
                    >
                      ✕
                    </button>
                  </div>
                  <DocsSidebar />
                </div>
              </DisplayLayout>
            </div>
          </div>
        )}

        <main className="flex-1 px-6 sm:px-10 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="md:hidden sticky top-[84px] z-40 mb-6">
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md shadow-sm font-mono text-sm"
              >
                ☰ Docs Menu
              </button>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </DisplayLayout>
  );
};

export default DocsLayout;
