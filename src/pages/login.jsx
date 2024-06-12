import React, { useCallback } from 'react';
import { LoginForm } from '@/components/fraction/login';
import { toast } from '@/components/design/toast';
import { authUserThunks } from '@/states/authuser';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = useCallback(async (loginFormData) => {
    try {
      await dispatch(authUserThunks.asyncLogin(loginFormData));
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  }, [dispatch, navigate]);

  return <LoginForm onSubmit={handleLogin} />;
}
