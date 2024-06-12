import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './dicodingAPI';

export const leaderboardApi = {
  async seeLeaderboard() {
    try {
      const response = await axiosInstance.get('/leaderboards');

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'gagal',
            message: 'gagal mendapatkan data papan peringkat',
          })
        );
      }

      return createResponse({
        status: 'gagal',
        message: 'gagal mendapatkan data papan peringkat',
      });
    }
  },
};
