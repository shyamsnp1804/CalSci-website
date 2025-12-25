import { Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

import Native from "./pages/software/Native";
import Extension from "./pages/software/Extension";
import Simulator from "./pages/software/Simulator";
import Circuit from "./pages/hardware/Circuit";
import Mechanical from "./pages/hardware/Mechanical";

import CalsciUser from "./pages/CalsciUser";
import Footer from "./components/Footer";

import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/software/native" element={<Native />} />
          <Route path="/software/extension" element={<Extension />} />
          <Route path="/software/simulator" element={<Simulator />} />
          <Route path="/hardware/circuit" element={<Circuit />} />
          <Route path="/hardware/mechanical" element={<Mechanical />} />
          <Route path="/calsciuser" element={<CalsciUser />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

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
