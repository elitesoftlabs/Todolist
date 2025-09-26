import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api";

export default function PrivateRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("http://localhost:5000/auth/check");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div className="text-center mt-5">Loading...</div>;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}