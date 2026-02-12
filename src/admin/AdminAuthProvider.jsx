import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "./AdminAuthContext";

function isTokenValid(token) {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
  }
}

export default function AdminAuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    isTokenValid(localStorage.getItem("adminToken"))
  );


  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken");
      const valid = isTokenValid(token);
      const isAdminRoute = location.pathname.startsWith("/admin");

      if (!valid) {
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);

        if (isAdminRoute && location.pathname !== "/admin/login") {
            navigate("/admin/login", { replace: true });
        }
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 30 * 1000);

    return () => clearInterval(interval);
  }, [location.pathname, navigate]);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
