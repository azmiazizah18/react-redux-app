import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './dicodingAPI';

export const usersApi = {
  async seeAllUsers() {
    try {
      const response = await axiosInstance.get('/users');

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({ status: 'gagal', message: 'gagal mendapatkan pengguna' })
        );
      }

      return createResponse({ status: 'gagal', message: 'gagal mendapatkan pengguna' });
    }
  },
};
