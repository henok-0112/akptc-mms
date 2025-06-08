import { useEffect, useState } from "react";
import Login from "./components/Login";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdministrativeStaffDashboard from "./components/AdministrativeStaffDashboard";
import EditClient from "./components/EditClient";
import RegisterClient from "./components/RegisterClient";
import RegisterMaterial from "./components/RegisterMaterial";
import ClientDetail from "./components/ClientDetail";
import MaterialDetail from "./components/MaterialDetail";
import EditMaterial from "./components/EditMaterial";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="overflow-hidden relative min-h-screen">
      <div className="absolute z-0 w-screen blur-lg h-screen bg-gradient-to-bl from-lime-300 via-emerald-300 to-teal-300">
        <div className="w-150 absolute shadow-2xl blur-2xl -left-50 -top-20 h-150 md:w-300 md:-left-50 md:-top-100 md:h-300 rounded-full filter hue-rotate bg-gradient-to-bl from-lime-300 via-emerald-300 to-teal-300"></div>
        <div className="w-150 absolute -right-50 shadow-2xl blur-2xl -bottom-20 h-150 md:w-300 md:-right-50 md:-bottom-100 md:h-300 rounded-full filter hue-rotate bg-gradient-to-bl from-lime-300 via-emerald-300 to-teal-300"></div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route
                path="administrative-staff"
                element={<AdministrativeStaffDashboard />}
              />
              <Route path=":client/detail/:id" element={<ClientDetail />} />
              <Route
                path=":client/material/detail/:id"
                element={<MaterialDetail />}
              />
              <Route path="register" element={<RegisterClient />} />
              <Route path=":client/edit/:id" element={<EditClient />} />
              <Route
                path=":client/edit/material/:id"
                element={<EditMaterial />}
              />
              <Route
                path="register/:client/material/:id"
                element={<RegisterMaterial />}
              />
            </Route>
          </Route>
        </Routes>
      )}
      <ToastContainer
        theme="dark"
        toastClassName={() =>
          "bg-white/30 p-5 rounded-lg shadow-lg backdrop-blur-2xl flex items-center border border-white/80 min-h-25 max-w-100"
        }
        autoClose={4000}
      />
    </div>
  );
}

export default App;
