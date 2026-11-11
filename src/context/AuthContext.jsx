import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const loadUser = async () => {
            try {
                const profile = await apiRequest("/user/profile");
                setUser(profile);
            } catch (error) {
                console.error("Failed to load user:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Login
    const login = async (email, password) => {
        const data = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        });

        localStorage.setItem("token", data.token);

        setUser({
            id: data.id,
            fullName: data.fullName,
            email: data.email,
            role: data.role,
            approved: data.approved,
        });

        return data;
    };

    // Register
    const register = async (
        fullName,
        email,
        phone,
        password
    ) => {
        return await apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                fullName,
                email,
                phone,
                password,
            }),
        });
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}