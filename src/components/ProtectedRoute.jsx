import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080a0d]">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to pending page if not approved
    if (!user.approved) {
        return <Navigate to="/pending-approval" replace />;
    }

    return children;
}

export default ProtectedRoute;