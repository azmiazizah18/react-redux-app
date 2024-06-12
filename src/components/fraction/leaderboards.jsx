import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { classname, formatNumber } from '@/utils';
import { Card } from '@/components/design/card';
import { Avatar } from '@/components/design/avatar';
import { Loader } from '@/components/design/loader';
import { useOutletContext as useMainLayoutOutletContext } from 'react-router-dom';

export function Leaderboard({ className }) {
  const { isInitialized } = useMainLayoutOutletContext();
  const leaderboardData = useSelector((states) => states.leaderboard);

  if (isInitialized === undefined) {
    throw new Error('Silakan gunakan di dalam outlet tata letak utama!');
  }

  return (
    <Card className={classname('px-0', className)}>
      <header className="mb-2 px-4">
        <h4 className="text-black">Leaderboard</h4>
      </header>
      <ul
        className={classname(
          'flex max-h-80 flex-col gap-2 overflow-y-auto px-4 text-black',
          { 'divide-y divide-gray-200': isInitialized },
        )}
      >
        {isInitialized ? (
          leaderboardData?.map(({ user, score }) => (
            <li
              key={user.id}
              className="flex items-center justify-between gap-2 pt-2 duration-300 animate-in fade-in"
            >
              <div className="flex items-center gap-2">
                <Avatar
                  className="size-9"
                  image={user.avatar}
                  name={user.name}
                />
                <p className="max-w-32 truncate text-sm">{user.name}</p>
              </div>

              <p className="text-base">{formatNumber(score)}</p>
            </li>
          ))
        ) : (
          <Loader gap={8} className="h-12 w-full" amount={6} />
        )}
      </ul>
    </Card>
  );
}

Leaderboard.propTypes = {
  className: PropTypes.string,
};

Leaderboard.defaultProps = {
  className: '',
};
