import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DisplayLayout from "../components/DisplayLayout";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <DisplayLayout>
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold text-[#1b4332]">
          Welcome to CalSci Dashboard
        </h1>

        <p className="mt-2 text-green-700">Logged in as: {user?.email}</p>

        <button
          onClick={logout}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </DisplayLayout>
  );
};

export default Dashboard;
