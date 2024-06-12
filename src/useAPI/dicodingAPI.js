import { toast } from '@/components/design/toast';
import { tokenHandler } from '@/utils';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenHandler.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    toast.error(error.message);
  },
);

export function createResponse({ status = '', message = '', data = null }) {
  return { status, message, data };
}
