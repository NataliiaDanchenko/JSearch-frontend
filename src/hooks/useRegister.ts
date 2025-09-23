import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/api';

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
  desiredJobTitle: string;
  about: string;
}

interface RegisterResponse {
  message: string;
  user: {
    name: string;
    email: string;
    desiredJobTitle: string;
    about: string;
  };
}

export const useRegister = () =>
  useMutation<RegisterResponse, Error, RegisterValues>({
    mutationFn: async (values: RegisterValues) => {
      const res = await axios.post<RegisterResponse>(
        `${API_BASE_URL}/auth/register`,
        values
      );
      console.log("Register response:", res.data);
      return res.data;
    },
  });

