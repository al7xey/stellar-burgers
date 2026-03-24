import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from '../../services/store';
import { Route, Routes, useLocation } from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';
import { getUserThunk } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';

const App: FC = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      setIsAuthChecked(true);
      return;
    }

    dispatch(getUserThunk()).finally(() => {
      setIsAuthChecked(true);
    });
  }, [dispatch]);

  const location = useLocation();
  const background = location.state?.background;

  const handleCloseModal = () => {
    window.history.back();
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth isAuthChecked={isAuthChecked}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth isAuthChecked={isAuthChecked}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth isAuthChecked={isAuthChecked}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth isAuthChecked={isAuthChecked}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthChecked={isAuthChecked}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute isAuthChecked={isAuthChecked}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute isAuthChecked={isAuthChecked}>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute isAuthChecked={isAuthChecked}>
                <Modal title='Детали заказа' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
