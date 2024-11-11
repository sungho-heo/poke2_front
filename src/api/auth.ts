import axios from "axios";

const API_URL = "https://poke2-backend.onrender.com/api/auth";

// 회원가입 데이터 타입.
export interface SignupParams {
  nickname: string;
  email: string;
  password: string;
}

// 로그인 데이터 타입
export interface LoginParams {
  email: string;
  password: string;
}

// user 토큰.
export interface AuthResponse {
  token: string;
}

// signup
export const apiSignup = async ({
  nickname,
  email,
  password,
}: SignupParams): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/signup`, {
    nickname,
    email,
    password,
  });
  return response.data;
};

// login
export const apiLogin = async ({
  email,
  password,
}: LoginParams): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};
