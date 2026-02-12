import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

export default function ProtectedRoute({ children }) {
    const context = useContext(AdminAuthContext);
    if (!context) {
        return <Navigate to="/admin/login" replace />;
    }
    const { isAuthenticated } = context;
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;

}
