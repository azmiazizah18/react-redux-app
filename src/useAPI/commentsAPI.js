import { AxiosError } from 'axios';
import { axiosInstance, createResponse } from './dicodingAPI';

export const commentsApi = {
  async createThreadComment({ threadId, content }) {
    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/comments`,
        { content },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          error.response.data ||
          createResponse({
            status: 'gagal',
            message: 'gagal membuat komentar thread',
          })
        );
      }

      return createResponse({
        status: 'gagal',
        message: 'gagal membuat komentar thread',
      });
    }
  },
};
