import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '../../services/store';
import { RegisterUI } from '@ui-pages';
import { registerUserThunk } from '../../services/slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk({ email, password, name: userName }))
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
