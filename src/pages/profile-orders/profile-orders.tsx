import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading
} from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';
import { AppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div className='error-message'>Error: {error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
