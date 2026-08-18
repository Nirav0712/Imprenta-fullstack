import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await api.get("/auth/profile");
                    if (res.data && res.data.success) {
                        setUser(res.data.user);
                    }
                } catch (error) {
                    console.error("Auth verification failed", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            } else {
                localStorage.removeItem("user");
            }
            setLoading(false);
        };
        verifyUser();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/auth/login", { email, password });
            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                return data.user;
            }
            throw new Error(data.message || "Login failed");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error(error.message || "Network Error");
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post("/auth/register", userData);
            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                return data.user;
            }
            throw new Error(data.message || "Registration failed");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error(error.message || "Network Error");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
    };

    const updateProfile = async (userData) => {
        try {
            const { data } = await api.put("/auth/profile", userData);
            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                return data.user;
            }
            throw new Error(data.message || "Profile update failed");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error(error.message || "Network Error");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
