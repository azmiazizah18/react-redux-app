import React from 'react';
import PropTypes from 'prop-types';
import { threadValidator } from '@/utils/validasi';
import { useSelector } from 'react-redux';
import { VoteThread } from '@/hooks/threadvote';
import { ThreadFraction } from './fraction';

export function Thread({
  onUpvote,
  onDownvote,
  onNeutralizeUpvote,
  onNeutralizeDownvote,
  className,
  thread,
  authUserId,
}) {
  const { ownerId, downVotesBy, id: threadId, upVotesBy } = thread;

  const users = useSelector((states) => states.users);
  const owner = React.useMemo(
    () => users.find((user) => user?.id === ownerId),
    [ownerId, users],
  );

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
    <li className={className}>
      <ThreadFraction
        authUserId={authUserId}
        onDownvote={handleDownvoteLogic}
        onUpvote={handleUpvoteLogic}
        thread={{ ...thread, owner }}
      />
    </li>
  );
}

Thread.propTypes = {
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func,
  onDownvote: PropTypes.func,
  onNeutralizeUpvote: PropTypes.func,
  onNeutralizeDownvote: PropTypes.func,
  className: PropTypes.string,
  thread: PropTypes.shape(threadValidator).isRequired,
};

Thread.defaultProps = {
  authUserId: undefined,
  className: '',
  onUpvote: undefined,
  onDownvote: undefined,
  onNeutralizeUpvote: undefined,
  onNeutralizeDownvote: undefined,
};
