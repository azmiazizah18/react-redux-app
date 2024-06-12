import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@/components/design/avatar';
import { Button } from '@/components/design/button'; 
import { Card } from '@/components/design/card';
import { commentValidator } from '@/utils/validasi';
import { useSelector } from 'react-redux';
import { VoteComment } from '@/hooks';
import { classname } from '@/utils';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike, BiShare } from "react-icons/bi";

export function Comment({
  comment,
  authUserId,
  threadId,
  className,
  onUpvote,
  onDownvote,
  onNeutralizeUpvote,
  onNeutralizeDownvote,
}) {
  const {
    id: commentId,
    content,
    createdAt,
    upVotesBy,
    downVotesBy,
    owner,
  } = comment;

  const users = useSelector((state) => state.users);
  const commenter = React.useMemo(
    () => users.find((user) => user.id === owner.id),
    [users, owner.id],
  );

  const date = new Date(createdAt).toDateString();

  const { handleDownvoteLogic, handleUpvoteLogic } = VoteComment({
    authUserId,
    onUpvote,
    onDownvote,
    onNeutralizeUpvote,
    onNeutralizeDownvote,
    downVotesBy,
    upVotesBy,
    commentId,
    threadId,
  });

  return (
    <Card className={classname(className)}>
      <div className="flex items-center gap-2 pt-1 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Avatar
            className="size-5"
            image={commenter?.avatar}
            name={commenter?.name ?? owner.name}
          />
          <p className="max-w-32 truncate text-sm">{owner.name}</p>
        </div>
        <span>•</span>
        <time dateTime={createdAt}>{date}</time>
      </div>

      <div
        className="mb-4 break-words border-b border-gray-200 py-2 text-gray-600"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="flex grow items-center gap-1">
        <Button
          disabled={!authUserId}
          withIcon
          onClick={handleUpvoteLogic}
          pill={false}
        >
          <span className="sr-only">Like</span>
          {upVotesBy.includes(authUserId) ? (
            <BiSolidLike size={20} />
          ) : (
            <BiLike size={20} />
          )}
          {upVotesBy.length}
        </Button>

        <Button
          disabled={!authUserId}
          withIcon
          onClick={handleDownvoteLogic}
          pill={false}
        >
          <span className="sr-only">Dislike</span>
          {downVotesBy.includes(authUserId) ? (
            <BiSolidDislike size={20} />
          ) : (
            <BiDislike size={20} />
          )}
          {downVotesBy.length}
        </Button>

        <Button
          withIcon
          pill={false}
          className="text-gray-400"
        >
          <span className="sr-only">Share</span>
          <BiShare size={20} />
        </Button>
      </div>
    </Card>
  );
}

Comment.propTypes = {
  threadId: PropTypes.string.isRequired,
  authUserId: PropTypes.string,
  className: PropTypes.string,
  comment: PropTypes.shape(commentValidator).isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onNeutralizeUpvote: PropTypes.func.isRequired,
  onNeutralizeDownvote: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  authUserId: '',
  className: '',
};
