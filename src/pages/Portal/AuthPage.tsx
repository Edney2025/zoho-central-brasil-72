
import React from 'react';
import { useAutoLogin } from './hooks/useAutoLogin';
import AuthLoading from './components/auth/AuthLoading';

const AuthPage: React.FC = () => {
  // Use the auto-login hook to handle authentication logic
  useAutoLogin();

  // Show a simple loading message while the automatic login happens
  return <AuthLoading />;
};

export default AuthPage;
