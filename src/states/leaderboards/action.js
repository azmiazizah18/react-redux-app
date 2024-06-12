import { leaderboardApi } from '@/useAPI';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

export const LEADERBOARD_ACTION_TYPE = {
  SET: 'leaderboard/set',
  UNSET: 'leaderboard/unset',
};

export const leaderboardActions = {
  set: (leaderboard) => ({
    type: LEADERBOARD_ACTION_TYPE.SET,
    payload: { leaderboard },
  }),
  unset: () => ({
    type: LEADERBOARD_ACTION_TYPE.UNSET,
    payload: {},
  }),
};

export const leaderboardThunks = {
  asyncSetLeaderboard: () => async (dispatch) => {
    try {
      dispatch(showLoading());
      const leaderboardData = await leaderboardApi.seeLeaderboard();
      if (leaderboardData.status === 'fail') throw new Error(leaderboardData.message);
      dispatch(leaderboardActions.set(leaderboardData.data.leaderboards));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoading());
    }
  },
};
