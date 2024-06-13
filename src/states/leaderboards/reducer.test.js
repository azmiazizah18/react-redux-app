/**
 * test scenario for leaderBoardReducer
 * - should return the initial state when given by unknown action
 * - should return leaderBoards when given RECEIVE_LEADERBOARDS action
 */

import { leaderboardReducer } from './reducer';
import { LEADERBOARD_ACTION_TYPE } from './action';

describe('leaderboardReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboard when given SET action', () => {
    // Arrange
    const initialState = null;
    const leaderboardData = {
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar',
      },
      score: 75,
    };
    const action = {
      type: LEADERBOARD_ACTION_TYPE.SET,
      payload: {
        leaderboard: leaderboardData,
      },
    };

    // Act
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.leaderboard);
  });

  it('should return null when given UNSET action', () => {
    // Arrange
    const initialState = {
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar',
      },
      score: 75,
    };
    const action = {
      type: LEADERBOARD_ACTION_TYPE.UNSET,
    };

    // Act
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(null);
  });

  it('should return current leaderboard state when given an unknown action with current leaderboard state', () => {
    // Arrange
    const currentState = {
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar',
      },
      score: 75,
    };
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = leaderboardReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });
});
