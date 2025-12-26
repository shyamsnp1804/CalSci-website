import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import CalsciUser from "./pages/CalsciUser";
import Footer from "./components/Footer";

import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import DocsLayout from "./docs/DocsLayout";
import Introduction from "./docs/pages/Introduction";
import SDK from "./docs/pages/SDK";
import Simulator from "./docs/pages/Simulator";
import ElectricalCircuit from "./docs/pages/ElectricalCircuit";
import BodyDesign from "./docs/pages/BodyDesign";
import VSCodeExtension from "./docs/pages/VSCodeExtension";
import Apps from "./docs/pages/Apps";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calsciuser" element={<CalsciUser />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Introduction />} />
            <Route path="introduction" element={<Introduction />} />
            <Route path="sdk" element={<SDK />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="electricalCircuit" element={<ElectricalCircuit />} />
            <Route path="bodyDesign" element={<BodyDesign />} />
            <Route path="vscode" element={<VSCodeExtension />} />
            <Route path="apps" element={<Apps />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
