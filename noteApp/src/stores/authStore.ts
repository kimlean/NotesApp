import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import api from "@/utils/fetchApi";
import type { LoginDto, RegisterDto } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!Cookies.get("token"));
  const user = ref(null);

  const login = async (loginDto: LoginDto) => {
    try {
      const response = await api.post("/api/auth/login", loginDto);
      const { token } = response;
      Cookies.set("token", token, { expires: 1 }); // expires in 1 day
      isAuthenticated.value = true;
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (registerDto: RegisterDto) => {
    try {
      await api.post("/api/auth/register", registerDto);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    isAuthenticated.value = false;
    user.value = null;
  };

  const checkAuth = () => {
    isAuthenticated.value = !!Cookies.get("token");
  };

  return {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    checkAuth,
  };
});
