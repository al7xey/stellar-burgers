import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError
} from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  if (error) {
    return <div className='error-message'>Error: {error}</div>;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
