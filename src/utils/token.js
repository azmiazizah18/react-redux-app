export const tokenHandler = {
  getToken: () => localStorage.getItem('token'),
  deleteToken: () => localStorage.removeItem('token'),
  putToken: (newToken) => localStorage.setItem('token', newToken),
};
