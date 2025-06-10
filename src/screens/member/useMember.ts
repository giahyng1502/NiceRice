import React, {useCallback, useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {getAllMember} from '../../store/action/userAction';

const useMember = () => {
  const dispatch = useAppDispatch();
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
    if (!loading && hasMore) {
      dispatch(getAllMember(allUser.length));
    }
  }, [dispatch, loading, hasMore, allUser.length]);

  useEffect(() => {
    refresh();
  }, []);

  return {allUser, refresh, loadMore, loading, memberOnline,user};
};

export default useMember;
