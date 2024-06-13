/**
 * Test Scenarios for threadDetailReducer:
 *
 * - Should return the initial state when the action is unknown.
 * - Should handle SET action.
 * - Should handle UNSET action.
 * - Should handle UP_VOTE action.
 * - Should handle DOWN_VOTE action.
 * - Should handle NEUTRALIZE_UP_VOTE action.
 * - Should handle NEUTRALIZE_DOWN_VOTE action.
 * - Should handle ADD_COMMENT action.
 * - Should handle UP_VOTE_COMMENT action.
 * - Should handle DOWN_VOTE_COMMENT action.
 * - Should handle NEUTRALIZE_UP_VOTE_COMMENT action.
 * - Should handle NEUTRALIZE_DOWN_VOTE_COMMENT action.
 */

import { describe, it, expect } from 'vitest';
import { threadDetailReducer } from './reducer';
import { THREAD_DETAIL_ACTION_TYPES } from './action';

describe('threadDetailReducer', () => {
  it('should return the initial state when the action is unknown', () => {
    expect(threadDetailReducer(undefined, {})).toBe(null);
  });

  it('should handle SET action', () => {
    const threadDetail = { id: 1, title: 'Test Thread' };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.SET,
      payload: { threadDetail },
    };
    expect(threadDetailReducer(null, action)).toEqual(threadDetail);
  });

  it('should handle UNSET action', () => {
    const action = { type: THREAD_DETAIL_ACTION_TYPES.UNSET };
    expect(threadDetailReducer({ id: 1, title: 'Test Thread' }, action)).toBe(null);
  });

  it('should handle UP_VOTE action', () => {
    const userId = 1;
    const initialState = {
      id: 1,
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.UP_VOTE,
      payload: { userId },
    };
    const expectedState = {
      ...initialState,
      upVotesBy: [userId],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DOWN_VOTE action', () => {
    const userId = 1;
    const initialState = {
      id: 1,
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.DOWN_VOTE,
      payload: { userId },
    };
    const expectedState = {
      ...initialState,
      downVotesBy: [userId],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle NEUTRALIZE_UP_VOTE action', () => {
    const userId = 1;
    const initialState = {
      id: 1,
      upVotesBy: [userId],
      downVotesBy: [],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_UP_VOTE,
      payload: { userId },
    };
    const expectedState = {
      ...initialState,
      upVotesBy: [],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle NEUTRALIZE_DOWN_VOTE action', () => {
    const userId = 1;
    const initialState = {
      id: 1,
      upVotesBy: [],
      downVotesBy: [userId],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_DOWN_VOTE,
      payload: { userId },
    };
    const expectedState = {
      ...initialState,
      downVotesBy: [],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_COMMENT action', () => {
    const comment = { id: 1, content: 'Test Comment' };
    const initialState = {
      id: 1,
      comments: [],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.ADD_COMMENT,
      payload: { comment },
    };
    const expectedState = {
      ...initialState,
      comments: [comment, ...initialState.comments],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UP_VOTE_COMMENT action', () => {
    const userId = 1;
    const commentId = 1;
    const initialState = {
      id: 1,
      comments: [
        { id: commentId, upVotesBy: [], downVotesBy: [] },
      ],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.UP_VOTE_COMMENT,
      payload: { userId, commentId },
    };
    const expectedState = {
      ...initialState,
      comments: [
        { id: commentId, upVotesBy: [userId], downVotesBy: [] },
      ],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DOWN_VOTE_COMMENT action', () => {
    const userId = 1;
    const commentId = 1;
    const initialState = {
      id: 1,
      comments: [
        { id: commentId, upVotesBy: [], downVotesBy: [] },
      ],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.DOWN_VOTE_COMMENT,
      payload: { userId, commentId },
    };
    const expectedState = {
      ...initialState,
      comments: [
        { id: commentId, upVotesBy: [], downVotesBy: [userId] },
      ],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle NEUTRALIZE_UP_VOTE_COMMENT action', () => {
    const userId = 1;
    const commentId = 1;
    const initialState = {
      id: 1,
      comments: [
        { id: commentId, upVotesBy: [userId], downVotesBy: [] },
      ],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_UP_VOTE_COMMENT,
      payload: { userId, commentId },
    };
    const expectedState = {
      ...initialState,
      comments: [
        { id: commentId, upVotesBy: [], downVotesBy: [] },
      ],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle NEUTRALIZE_DOWN_VOTE_COMMENT action', () => {
    const userId = 1;
    const commentId = 1;
    const initialState = {
      id: 1,
      comments: [
        { id: commentId, upVotesBy: [], downVotesBy: [userId] },
      ],
    };
    const action = {
      type: THREAD_DETAIL_ACTION_TYPES.NEUTRALIZE_DOWN_VOTE_COMMENT,
      payload: { userId, commentId },
    };
    const expectedState = {
      ...initialState,
      comments: [
        { id: commentId, upVotesBy: [], downVotesBy: [] },
      ],
    };
    expect(threadDetailReducer(initialState, action)).toEqual(expectedState);
  });
});
