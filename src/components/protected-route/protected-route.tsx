import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

import { selectUser } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type TProtectedRouteProps = PropsWithChildren<{
  onlyUnAuth?: boolean;
  isAuthChecked: boolean;
}>;

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  isAuthChecked,
  children
}) => {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const from =
      (location.state as { from?: { pathname?: string } } | null)?.from
        ?.pathname ?? '/';

    return <Navigate to={from} replace />;
  }

  return children;
};
