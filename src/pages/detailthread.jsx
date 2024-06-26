import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext as useMainLayoutOutletContext, useParams } from 'react-router-dom';
import { Leaderboard, CategoryList, NewThreadButton } from '@/components/fraction';
import { Async, VoteFactory } from '@/hooks';
import { threadDetailThunks } from '@/states/threaddetail';
import { leaderboardThunks } from '@/states/leaderboards';
import { Loader } from '@/components/design/loader';
import { ThreadDetail } from '@/components/fraction/threads';
import { CommentInput, CommentsList, Comment } from '@/components/fraction/comments';
import { toast } from '@/components/design/toast';

export function DetailThread() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isInitialized } = useMainLayoutOutletContext();
  const authUser = useSelector((states) => states.authUser);
  const voteFactory = VoteFactory();
  const { threadId } = useParams();

  const [threadDetail, isThreadDetailInitialized] = Async(
    (states) => states.threadDetail,
    React.useCallback(async () => {
      try {
        await dispatch(threadDetailThunks.asyncSet(threadId));
      } catch (error) {
        toast.error(error.message);
        navigate('/');
      }
    }, [dispatch, navigate, threadId])
  );

  const handleComment = async (newComment) => {
    try {
      await dispatch(threadDetailThunks.asyncAddComment({ threadId, content: newComment }));
      await dispatch(leaderboardThunks.asyncSetLeaderboard());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-4 flex flex-col items-start gap-6 md:flex-row md:gap-4">
      {isInitialized && isThreadDetailInitialized ? (
        <>
          <div className="w-full md:w-3/4">
            <ThreadDetail
              className="rounded-b-none border-b-0 duration-3000 animate-in fade-in"
              authUserId={authUser?.id}
              threadDetail={threadDetail}
              onUpvote={voteFactory(threadDetailThunks.asyncUpvote)}
              onDownvote={voteFactory(threadDetailThunks.asyncDownvote)}
              onNeutralizeUpvote={voteFactory(threadDetailThunks.asyncNeutralizeUpvote)}
              onNeutralizeDownvote={voteFactory(threadDetailThunks.asyncNeutralizeDownvote)}
            />
            <CommentInput
              authUserId={authUser?.id}
              onSubmit={handleComment}
              className="rounded-t-none border-t-0 duration-300 animate-in fade-in"
            />
            <hr className="my-4 w-full border-gray-300" />
            <CommentsList totalComments={threadDetail?.comments.length}>
              {threadDetail?.comments.length > 0 ? (
                threadDetail?.comments.map((comment) => (
                  <Comment
                    threadId={threadId}
                    authUserId={authUser?.id}
                    comment={comment}
                    key={comment.id}
                    onUpvote={voteFactory(threadDetailThunks.asyncUpvoteComment)}
                    onDownvote={voteFactory(threadDetailThunks.asyncDownvoteComment)}
                    onNeutralizeUpvote={voteFactory(threadDetailThunks.asyncNeutralizeUpvoteComment)}
                    onNeutralizeDownvote={voteFactory(threadDetailThunks.asyncNeutralizeDownvoteComment)}
                  />
                ))
              ) : (
                <p className="my-5 text-center text-gray-500">Thread ini belum memiliki komentar..</p>
              )}
            </CommentsList>
          </div>
          <div className="top-20 flex w-full flex-col gap-4 md:sticky md:w-1/4">
            <NewThreadButton />
            <CategoryList />
            <Leaderboard />
          </div>
        </>
      ) : (
        <div className="w-full grow basis-3/4 md:w-auto">
          <Loader amount={1} loaderWrapperClassName="w-full mb-4" className="mb-4 h-96" />
          <Loader amount={4} gap={8} loaderWrapperClassName="w-full" className="h-20" />
        </div>
      )}
      <hr className="w-full border-gray-300 md:hidden" />
    </div>
  );
}
