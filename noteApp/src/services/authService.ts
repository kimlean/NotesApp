import api from "@/utils/fetchApi";
import type { LoginDto, RegisterDto } from "@/types/auth";

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async register(registerDto: RegisterDto) {
    return api.post("/api/auth/register", registerDto);
  }

  public async login(loginDto: LoginDto) {
    return api.post<{ token: string }>("/api/auth/login", loginDto);
  }
}

export const authService = AuthService.getInstance();
