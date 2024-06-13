/**
 * Test scenario for VoteComment
 * handleUpvoteLogic:
 * - should neutralize upvote if user has already upvoted
 * - should switch downvote to upvote if user has downvoted
 * - should do nothing if user is not authenticated
 * handleDownvoteLogic:
 * - should neutralize downvote if user has already downvoted
 * - should switch upvote to downvote if user has upvoted
 * - should do nothing if user is not authenticated
 */

import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { VoteComment } from './commentvote';

describe('VoteComment', () => {
  const mockUpVotesBy = ['user1', 'user2'];
  const mockDownVotesBy = ['user3'];
  const mockAuthUserId = 'user1';
  const mockCommentId = 'comment1';
  const mockThreadId = 'thread1';

  const mockOnUpvote = vi.fn();
  const mockOnDownvote = vi.fn();
  const mockOnNeutralizeUpvote = vi.fn();
  const mockOnNeutralizeDownvote = vi.fn();

  let voteCommentHandlers;

  beforeEach(() => {
    voteCommentHandlers = VoteComment({
      upVotesBy: mockUpVotesBy,
      downVotesBy: mockDownVotesBy,
      authUserId: mockAuthUserId,
      onUpvote: mockOnUpvote,
      onDownvote: mockOnDownvote,
      onNeutralizeUpvote: mockOnNeutralizeUpvote,
      onNeutralizeDownvote: mockOnNeutralizeDownvote,
      commentId: mockCommentId,
      threadId: mockThreadId,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('handleUpvoteLogic neutralizes upvote if user has already upvoted', () => {
    voteCommentHandlers.handleUpvoteLogic();

    expect(mockOnNeutralizeUpvote).toHaveBeenCalledWith({ commentId: mockCommentId, threadId: mockThreadId });
    expect(mockOnUpvote).not.toHaveBeenCalled();
  });

  test('handleUpvoteLogic switches downvote to upvote if user has downvoted', () => {
    const customVoteCommentHandlers = VoteComment({
      upVotesBy: [],
      downVotesBy: [mockAuthUserId],
      authUserId: mockAuthUserId,
      onUpvote: mockOnUpvote,
      onDownvote: mockOnDownvote,
      onNeutralizeUpvote: mockOnNeutralizeUpvote,
      onNeutralizeDownvote: mockOnNeutralizeDownvote,
      commentId: mockCommentId,
      threadId: mockThreadId,
    });

    customVoteCommentHandlers.handleUpvoteLogic();

    expect(mockOnNeutralizeDownvote).toHaveBeenCalledWith({ commentId: mockCommentId, threadId: mockThreadId });
    expect(mockOnUpvote).toHaveBeenCalledWith({ commentId: mockCommentId, threadId: mockThreadId });
  });

  test('handleDownvoteLogic neutralizes downvote if user has already downvoted', () => {
    const customVoteCommentHandlers = VoteComment({
      upVotesBy: [],
      downVotesBy: [mockAuthUserId],
      authUserId: mockAuthUserId,
      onUpvote: mockOnUpvote,
      onDownvote: mockOnDownvote,
      onNeutralizeUpvote: mockOnNeutralizeUpvote,
      onNeutralizeDownvote: mockOnNeutralizeDownvote,
      commentId: mockCommentId,
      threadId: mockThreadId,
    });

    customVoteCommentHandlers.handleDownvoteLogic();

    expect(mockOnNeutralizeDownvote).toHaveBeenCalledWith({ commentId: mockCommentId, threadId: mockThreadId });
    expect(mockOnDownvote).not.toHaveBeenCalled();
  });

  test('handleDownvoteLogic switches upvote to downvote if user has upvoted', () => {
    voteCommentHandlers.handleDownvoteLogic();

    expect(mockOnNeutralizeUpvote).toHaveBeenCalledWith({ commentId: mockCommentId, threadId: mockThreadId });
    expect(mockOnDownvote).toHaveBeenCalledWith({ commentId: mockCommentId, threadId: mockThreadId });
  });

  test('handleUpvoteLogic does nothing if user is not authenticated', () => {
    const unauthenticatedVoteCommentHandlers = VoteComment({
      upVotesBy: [],
      downVotesBy: [],
      authUserId: null,
      onUpvote: mockOnUpvote,
      onDownvote: mockOnDownvote,
      onNeutralizeUpvote: mockOnNeutralizeUpvote,
      onNeutralizeDownvote: mockOnNeutralizeDownvote,
      commentId: mockCommentId,
      threadId: mockThreadId,
    });

    unauthenticatedVoteCommentHandlers.handleUpvoteLogic();

    expect(mockOnNeutralizeUpvote).not.toHaveBeenCalled();
    expect(mockOnUpvote).not.toHaveBeenCalled();
  });

  test('handleDownvoteLogic does nothing if user is not authenticated', () => {
    const unauthenticatedVoteCommentHandlers = VoteComment({
      upVotesBy: [],
      downVotesBy: [],
      authUserId: null,
      onUpvote: mockOnUpvote,
      onDownvote: mockOnDownvote,
      onNeutralizeUpvote: mockOnNeutralizeUpvote,
      onNeutralizeDownvote: mockOnNeutralizeDownvote,
      commentId: mockCommentId,
      threadId: mockThreadId,
    });

    unauthenticatedVoteCommentHandlers.handleDownvoteLogic();

    expect(mockOnNeutralizeDownvote).not.toHaveBeenCalled();
    expect(mockOnDownvote).not.toHaveBeenCalled();
  });
});