import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setAuthUser(res.data);
    } catch (error) {
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const signup = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      if (res.data.token) {
        localStorage.setItem("jwt", res.data.token);
      }
      setAuthUser(res.data);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      if (res.data.token) {
        localStorage.setItem("jwt", res.data.token);
      }
      setAuthUser(res.data);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("jwt");
      setAuthUser(null);
      toast.success("Logged out");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, isCheckingAuth, isLoading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};