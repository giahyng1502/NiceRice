import {useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {getAllMember} from '../../store/action/userAction';
import {Participant} from '../../hooks/useParticipant';
type Props = {
  participantCurrent?: Participant[];
};
const useMember = ({participantCurrent = []}: Props) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allUser = useSelector((state: RootState) => state.user.allUser) || [];
  const loading = useSelector((state: RootState) => state.user.loading);
  const hasMore = useSelector((state: RootState) => state.user.hasMore);

  const user = useSelector((state: RootState) => state.user.data);

  const memberOnline = useSelector(
    (state: RootState) => state.user.memberOnline,
  );
  const refresh = useCallback(() => {
    dispatch(getAllMember(0));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    console.log('hasMore', hasMore);
    console.log('loading', loading);
    if (!loading && hasMore) {
      dispatch(getAllMember(allUser.length));
    }
  }, [dispatch, loading, hasMore, allUser.length]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  const filteredUser = useMemo(() => {
    const participantIds = new Set(participantCurrent.map(p => p.userId));
    const onlineIds = new Set(memberOnline);

    const result = allUser
      .filter(user => !participantIds.has(user.userId))
      .sort((a, b) => {
        const aOnline = onlineIds.has(a.userId) ? 1 : 0;
        const bOnline = onlineIds.has(b.userId) ? 1 : 0;
        return bOnline - aOnline; // online users first
      });

    return result;
  }, [allUser, participantCurrent, memberOnline]);

  return {filteredUser, refresh, loadMore, loading, memberOnline, user};
};

export default useMember;
