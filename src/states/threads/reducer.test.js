/**
 * Test scenarios for threadsReducer:
 *  - should return the initial state when given an unknown action
 *  - should add a new thread when given a CREATE action
 *  - should set threads when given a SET action
 *  - should unset threads when given an UNSET action
 *  - should add a user to upVotesBy when given an UP_VOTE action
 *  - should add a user to downVotesBy when given a DOWN_VOTE action
 *  - should remove a user from upVotesBy when given a NEUTRALIZE_UP_VOTE action
 *  - should remove a user from downVotesBy when given a NEUTRALIZE_DOWN_VOTE action
 */

import { describe, it, expect } from 'vitest';
import { threadsReducer } from './reducer';
import { THREADS_ACTION_TYPE } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should add a new thread when given a CREATE action', () => {
    const initialState = [
      { id: 'thread-1', text: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: THREADS_ACTION_TYPE.CREATE,
      payload: { thread: { id: 'thread-2', text: 'Thread 2', upVotesBy: [], downVotesBy: [] } },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should set threads when given a SET action', () => {
    const initialState = null;
    const action = {
      type: THREADS_ACTION_TYPE.SET,
      payload: { threads: [{ id: 'thread-1', text: 'Thread 1', upVotesBy: [], downVotesBy: [] }] },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should unset threads when given an UNSET action', () => {
    const initialState = [
      { id: 'thread-1', text: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const action = { type: THREADS_ACTION_TYPE.UNSET };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(null);
  });

  it('should add a user to upVotesBy when given an UP_VOTE action', () => {
    const initialState = [
      { id: 'thread-1', text: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: THREADS_ACTION_TYPE.UP_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain(action.payload.userId);
  });

  it('should add a user to downVotesBy when given a DOWN_VOTE action', () => {
    const initialState = [
      { id: 'thread-1', text: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: THREADS_ACTION_TYPE.DOWN_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).toContain(action.payload.userId);
  });

  it('should remove a user from upVotesBy when given a NEUTRALIZE_UP_VOTE action', () => {
    const initialState = [
      { id: 'thread-1', text: 'Thread 1', upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const action = {
      type: THREADS_ACTION_TYPE.NEUTRALIZE_UP_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain(action.payload.userId);
  });

  it('should remove a user from downVotesBy when given a NEUTRALIZE_DOWN_VOTE action', () => {
    const initialState = [
      { id: 'thread-1', text: 'Thread 1', upVotesBy: [], downVotesBy: ['user-1'] },
    ];
    const action = {
      type: THREADS_ACTION_TYPE.NEUTRALIZE_DOWN_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).not.toContain(action.payload.userId);
  });
});
