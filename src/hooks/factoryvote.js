import { toast } from '@/components/design/toast';
import { leaderboardThunks } from '@/states/leaderboards';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function VoteFactory() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();

  const threadVoteFactory = (voteThunk) => async (threadId) => {
    try {
      if (!authUser?.id) {
        navigate('/login');
        return;
      }
      await dispatch(voteThunk(threadId));
      await dispatch(leaderboardThunks.asyncSetLeaderboard());
    } catch (error) {
      toast.error(error.message);
    }
  };

  return threadVoteFactory;
}
