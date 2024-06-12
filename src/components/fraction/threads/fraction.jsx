import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/design/button';
import { Card } from '@/components/design/card';
import { Avatar } from '@/components/design/avatar';
import { Link } from 'react-router-dom';
import { ownerValidator } from '@/utils/validasi';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike, BiShare } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import { classname } from '@/utils';

export function ThreadFraction({
  className,
  thread,
  authUserId,
  onUpvote,
  onDownvote,
}) {
  const {
    id: threadId,
    title,
    body,
    owner,
    upVotesBy,
    downVotesBy,
    totalComments,
    category,
    createdAt,
  } = thread;

  const date = new Date(createdAt).toDateString();

  return (
    <Card className={classname(className)}>
      <Button
        to={`/nr/${category}`}
        variant="link"
        className="mb-0.5 inline-block px-0 font-bold text-black"
      >
        {`nr/${category}`}
      </Button>

      <div className="mb-3">
        <h3 className="break-words text-gray-700">
          <Link
            className="underline-offset-2 hover:underline"
            to={`/threads/${threadId}`}
          >
            {title}
          </Link>
        </h3>

        <div className="flex items-center gap-2 pt-1 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Avatar className="size-5" image={owner.avatar} name={owner.name} />
            <p className="max-w-32 truncate text-sm">{owner.name}</p>
          </div>
          <span>•</span>
          <time dateTime={createdAt}>{date}</time>
        </div>
      </div>

      <div
        className="mb-4 w-full break-words border-b border-gray-200 py-2 text-black"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="flex grow items-center justify-between gap-2">
        <div className="flex gap-1">
          <Button disabled={!authUserId} withIcon pill={false} onClick={onUpvote}>
            <span className="sr-only">Like</span>
            {upVotesBy.includes(authUserId) ? (
              <BiSolidLike size={20} />
            ) : (
              <BiLike size={20} />
            )}
            <span>{upVotesBy.length}</span>
          </Button>
          <Button disabled={!authUserId} withIcon pill={false} onClick={onDownvote}>
            <span className="sr-only">Dislike</span>
            {downVotesBy.includes(authUserId) ? (
              <BiSolidDislike size={20} />
            ) : (
              <BiDislike size={20} />
            )}
            <span>{downVotesBy.length}</span>
          </Button>
          <Button withIcon pill={false} className="text-black" onClick={() => console.log('Shared!')}>
            <span className="sr-only">Share</span>
            <BiShare size={20} />
          </Button>
        </div>

        <Button
          to={`/threads/${threadId}`}
          variant="link"
          className="flex items-center gap-2 px-2 text-black"
        >
          <span className="sr-only">Total Komentar</span>
          <BsChatText size={20} />
          <span>{totalComments}</span>
        </Button>
      </div>
    </Card>
  );
}

ThreadFraction.propTypes = {
  className: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  authUserId: PropTypes.string,
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape(ownerValidator),
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

ThreadFraction.defaultProps = {
  className: '',
  authUserId: undefined,
};
