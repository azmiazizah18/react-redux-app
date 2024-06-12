import { configureStore } from '@reduxjs/toolkit';
import { authUserReducer } from '@/states/authuser';
import { leaderboardReducer } from '@/states/leaderboards';
import { threadsReducer } from '@/states/threads';
import { threadDetailReducer } from '@/states/threaddetail';
import { usersReducer } from '@/states/users';
import { loadingBarReducer } from 'react-redux-loading-bar';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    leaderboard: leaderboardReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
  },
});
