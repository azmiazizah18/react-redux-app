/* eslint */
import PropTypes from 'prop-types';
import React from 'react';
import { threadDetailValidator } from '@/utils/validasi';
import { VoteThread } from '@/hooks/threadvote';
import { classname } from '@/utils';
import { ThreadFraction } from './fraction';

export function ThreadDetail({
  className,
  threadDetail,
  authUserId,
  onDownvote,
  onNeutralizeDownvote,
  onNeutralizeUpvote,
  onUpvote,
}) {
  const { id: threadId, upVotesBy, downVotesBy, comments } = threadDetail;

  const { handleDownvoteLogic, handleUpvoteLogic } = VoteThread({
    threadId,
    authUserId,
    downVotesBy,
    onDownvote,
    onNeutralizeDownvote,
    onNeutralizeUpvote,
    onUpvote,
    upVotesBy,
  });

  return (
    <ThreadFraction
      className={classname(className)}
      authUserId={authUserId}
      onDownvote={handleDownvoteLogic}
      onUpvote={handleUpvoteLogic}
      thread={{ ...threadDetail, totalComments: comments.length }}
    />
  );
}

ThreadDetail.propTypes = {
  authUserId: PropTypes.string,
  className: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeUpvote: PropTypes.func.isRequired,
  onNeutralizeDownvote: PropTypes.func.isRequired,
  threadDetail: PropTypes.shape(threadDetailValidator).isRequired,
};

ThreadDetail.defaultProps = {
  className: '',
  authUserId: undefined,
};
