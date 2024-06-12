import React from 'react';
import { ScrollRestoration, Outlet } from 'react-router-dom';
import { MenuHeader } from '@/components/fraction';
import { useDispatch } from 'react-redux';
import { usersThunks } from '@/states/users';
import { threadsThunks } from '@/states/threads';
import { authUserThunks } from '@/states/authuser';
import { leaderboardThunks } from '@/states/leaderboards';
import { toast } from '@/components/design/toast';
import { tokenHandler } from '@/utils';

export function MainLayout() {

  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (!isInitialized) {
        try {
          if (tokenHandler.getToken()) {
            await dispatch(authUserThunks.asyncGetAuthUser());
          }

          await dispatch(leaderboardThunks.asyncSetLeaderboard());
          await dispatch(usersThunks.asyncSeeAllUsers());
          await dispatch(threadsThunks.asyncSet());
        } catch (error) {
          toast.error(error.message);
        }

        setIsInitialized(true);
      }
    })();
  }, [isInitialized, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <MenuHeader isStoreInitialized={isInitialized} />
      <main className="grow">
        <Outlet context={{ isInitialized }} />
        <ScrollRestoration/>
      </main>
      <footer className="container flex items-center justify-center py-4 font-bold text-black">
        <div className="text-sm text-center text-royalblue">
          <span className="block">aplikasi forum diskusi ©2024</span>
        </div>
      </footer>
    </div>
  );
}
