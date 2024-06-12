import React from 'react';
import { useSelector } from 'react-redux';
import { threadsThunks } from '@/states/threads';
import { Leaderboard, CategoryList, NewThreadButton } from '@/components/fraction';
import { useSearchParams, useParams, useOutletContext as useMainLayoutOutletContext } from 'react-router-dom';
import { Loader } from '@/components/design/loader';
import { VoteFactory } from '@/hooks';
import { Thread, ThreadsList } from '@/components/fraction/threads';

export function Home() {
  const { isInitialized } = useMainLayoutOutletContext();
  const authUser = useSelector(states => states.authUser);
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const threads = useSelector(states => states.threads);
  const threadVoteFactory = VoteFactory();

  const filteredThreads = React.useMemo(() => {
    let finalResult = threads ?? [];
    if (category) finalResult = finalResult.filter(thread => thread.category === category);
    if (keyword) {
      const lowerCasedKeyword = keyword.toLowerCase();
      finalResult = finalResult.filter(thread => 
        thread.title.toLowerCase().includes(lowerCasedKeyword) || 
        thread.body.toLowerCase().includes(lowerCasedKeyword)
      );
    }
    return finalResult;
  }, [threads, category, keyword]);

  return (
    <div className="container mt-4 flex flex-col-reverse gap-6 items-start md:flex-row md:gap-4">
      <ThreadsList title="Latest Threads" className="w-full md:w-3/4 animate-in">
        {isInitialized ? (
          filteredThreads.length ? (
            filteredThreads.map(thread => (
              <Thread
                key={thread.id}
                thread={thread}
                authUserId={authUser?.id}
                onUpvote={threadVoteFactory(threadsThunks.asyncUpvote)}
                onDownvote={threadVoteFactory(threadsThunks.asyncDownvote)}
                onNeutralizeUpvote={threadVoteFactory(threadsThunks.asyncNeutralizeUpVote)}
                onNeutralizeDownvote={threadVoteFactory(threadsThunks.asyncNeutralizeDownVote)}
                className="animate-in duration-300 fade-in"
              />
            ))
          ) : (
            <p className="my-5 text-center text-gray-500">Tidak ada threads yang dapat ditemukan.</p>
          )
        ) : (
          <Loader amount={4} gap={16} className="h-60" loaderWrapperClassName="grow w-full basis-3/4 md:w-auto" />
        )}
      </ThreadsList>
      <hr className="w-full border-gray-300 md:hidden" />
      <aside className="flex flex-col-reverse gap-4 w-full top-20 md:w-1/4 md:sticky md:flex-col">
        <NewThreadButton />
        <CategoryList />
        <Leaderboard />
      </aside>
    </div>
  );
}
