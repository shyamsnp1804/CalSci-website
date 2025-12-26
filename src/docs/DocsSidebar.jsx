import { NavLink } from "react-router-dom";

const linkClass =
  "block py-2 px-3 rounded-md text-sm font-mono text-[#1b4332] hover:bg-[#d8f3dc] hover:text-[#2d6a4f]";

const DocsSidebar = () => {
  return (
    <nav
      className="space-y-6 font-mono p-5 rounded-xl shadow-2xl border border-[#cbd3cc]
  "
    >
      <div>
        <h3 className="text-xs uppercase tracking-wider text-[#1b4332] mb-3">
          Introduction
        </h3>
        <NavLink
          to="/docs/introduction"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-[#95d5b2]/40 font-semibold" : ""}`
          }
        >
          What is CalSci
        </NavLink>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-wider text-[#1b4332] mb-3">
          Software
        </h3>
        <NavLink
          to="/docs/apps"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-[#95d5b2]/40 font-semibold" : ""}`
          }
        >
          Apps & App Store
        </NavLink>
        <NavLink
          to="/docs/sdk"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-[#95d5b2]/40 font-semibold" : ""}`
          }
        >
          CalSci SDK
        </NavLink>
        <NavLink
          to="/docs/vscode"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-[#95d5b2]/40 font-semibold" : ""}`
          }
        >
          VS Code Extension
        </NavLink>
        <NavLink
          to="/docs/simulator"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-[#95d5b2]/40 font-semibold" : ""}`
          }
        >
          Simulator
        </NavLink>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-wide text-[#40916c] mb-2">
          Hardware
        </h3>
        <NavLink
          to="/docs/electricalCircuit"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-[#95d5b2]/40 font-semibold" : ""}`
          }
        >
          Electrical Circuit
        </NavLink>
        <NavLink
          to="/docs/bodyDesign"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-[#95d5b2]/40 font-semibold" : ""}`
          }
        >
          Body Design
        </NavLink>
      </div>
    </nav>
  );
};

export default DocsSidebar;
