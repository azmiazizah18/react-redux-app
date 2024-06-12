import { authUserApi } from '@/useAPI';
import { tokenHandler } from '@/utils';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const AUTH_USER_ACTION_TYPE = {
  SET: 'auth-user/set',
  UNSET: 'auth-user/unset',
};

export const authUserActions = {
  set: (authUser) => ({ type: AUTH_USER_ACTION_TYPE.SET, payload: { authUser } }),
  unset: () => ({ type: AUTH_USER_ACTION_TYPE.UNSET, payload: {} }),
};

export const authUserThunks = {
  asyncRegister: ({ name, email, password }) => async (dispatch) => {
    dispatch(showLoading());
    const response = await authUserApi.register({ name, email, password });
    if (response.status === 'fail') throw new Error(response.message);
    dispatch(hideLoading());
  },

  asyncLogin: ({ email, password }) => async (dispatch) => {
    dispatch(showLoading());
    const loginResponse = await authUserApi.login({ email, password });
    if (loginResponse.status === 'fail') throw new Error(loginResponse.message);
    tokenHandler.putToken(loginResponse.data.token);
    const userResponse = await authUserApi.seeOwnProfile();
    if (userResponse.status === 'fail') throw new Error(userResponse.message);
    dispatch(authUserActions.set(userResponse.data.user));
    dispatch(hideLoading());
  },

  asyncGetAuthUser: () => async (dispatch) => {
    dispatch(showLoading());
    const userResponse = await authUserApi.seeOwnProfile();
    if (userResponse.status === 'fail') throw new Error(userResponse.message);
    dispatch(authUserActions.set(userResponse.data.user));
    dispatch(hideLoading());
  },

  asyncLogout: () => (dispatch) => {
    try {
      dispatch(showLoading());
      tokenHandler.deleteToken();
      dispatch(authUserActions.unset());
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(hideLoading());
    }
  },
};
