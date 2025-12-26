import { Outlet } from "react-router-dom";
import DisplayLayout from "../components/DisplayLayout";
import DocsSidebar from "./DocsSidebar";

const DocsLayout = () => {
  return (
    <DisplayLayout>
      <div className="w-full min-h-screen flex">
        <aside
          className="
            hidden md:block
            fixed 
            h-screen w-72
            px-6 py-10"
        >
          <DocsSidebar />
        </aside>
        <main className="flex-1 px-6 sm:px-10 py-10 md:ml-72">
          <div className="max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </DisplayLayout>
  );
};

export default DocsLayout;
