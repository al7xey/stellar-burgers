import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutApi } from '@api';
import { logout, logoutUserThunk } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logoutUserThunk());
      navigate('/login', { replace: true });
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
