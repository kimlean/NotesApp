import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import api from "@/utils/fetchApi";
import type { LoginDto, RegisterDto, User } from "@/types/auth";

// Helper function to decode JWT token
// Helper function to decode JWT token
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const parsed = JSON.parse(jsonPayload);
    console.log('Decoded token:', parsed);
    return parsed;
  } catch (e) {
    console.error("Failed to parse JWT token", e);
    return null;
  }
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const isAuthenticated = ref(false);
  const user = ref<{id: number, username: string, email: string} | null>(null);

  const login = async (loginDto: LoginDto) => {
    try {
      const response = await api.post<{token: string}>("/api/auth/login", loginDto);
      const { token: jwtToken } = response;
      
      // Save token in cookie and state
      Cookies.set("token", jwtToken, { expires: 1 }); // expires in 1 day
      token.value = jwtToken;
      isAuthenticated.value = true;
      
     // Parse user info from JWT token
     const decodedToken = parseJwt(jwtToken);
     if (decodedToken) {
       // Try to extract user ID from various possible claim formats
       let userId = null;
       if (decodedToken.nameid) {
         userId = parseInt(decodedToken.nameid);
       } else if (decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) {
         userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
       } else if (decodedToken.sub) {
         userId = parseInt(decodedToken.sub);
       } else {
         // Search for any claim that might contain the user ID
         for (const key in decodedToken) {
           if (key.toLowerCase().includes('nameid') || key.toLowerCase().includes('identifier')) {
             userId = parseInt(decodedToken[key]);
             break;
           }
         }
       }
       
       // Extract username and email similarly
       const username = 
         decodedToken.unique_name || 
         decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
         decodedToken.name || 
         decodedToken.preferred_username || 
         'User';
         
       const email = 
         decodedToken.email || 
         decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
         '';
       
       console.log('Extracted user info:', { id: userId, username, email });
       
       if (userId) {
         user.value = { id: userId, username, email };
       } else {
         console.error('Could not extract user ID from token');
       }
     }
      
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
    token.value = null;
    isAuthenticated.value = false;
    user.value = null;
  };

  const checkAuth = () => {
    const savedToken = Cookies.get("token");
    console.log('Checking auth, token exists:', !!savedToken);
    
    if (savedToken) {
      token.value = savedToken;
      isAuthenticated.value = true;
      
      // Parse user info from the saved token
      const decodedToken = parseJwt(savedToken);
      if (decodedToken) {
        // Try to extract user ID from various possible claim formats
        let userId = null;
        if (decodedToken.nameid) {
          userId = parseInt(decodedToken.nameid);
        } else if (decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) {
          userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        } else if (decodedToken.sub) {
          userId = parseInt(decodedToken.sub);
        } else {
          // Search for any claim that might contain the user ID
          for (const key in decodedToken) {
            if (key.toLowerCase().includes('nameid') || key.toLowerCase().includes('identifier')) {
              userId = parseInt(decodedToken[key]);
              break;
            }
          }
        }
        
        // Extract username and email similarly
        const username = 
          decodedToken.unique_name || 
          decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
          decodedToken.name || 
          decodedToken.preferred_username || 
          'User';
          
        const email = 
          decodedToken.email || 
          decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
          '';
        
        console.log('Extracted user info:', { id: userId, username, email });
        
        if (userId) {
          user.value = { id: userId, username, email };
        } else {
          console.error('Could not extract user ID from token');
          // If we can't extract user ID, we should consider auth invalid
          isAuthenticated.value = false;
          token.value = null;
          Cookies.remove("token");
        }
      }
    } else {
      // No token found, ensure auth state is cleared
      isAuthenticated.value = false;
      user.value = null;
    }
  };

  // Get current user ID - useful helper for components
  const getUserId = () => {
    return user.value?.id || 0;
  };

  return {
    token,
    isAuthenticated,
    user,
    login,
    register,
    logout,
    checkAuth,
    getUserId
  };
});