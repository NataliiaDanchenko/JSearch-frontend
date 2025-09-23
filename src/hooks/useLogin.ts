import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/api';

export interface LoginValues {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginValues>({
    mutationFn: async (values: LoginValues) => {
      const res = await axios.post<LoginResponse>(
        `${API_BASE_URL}/auth/login`,
        values
      );
      console.log("Login response:", res.data);
      return res.data;
    },
  });
