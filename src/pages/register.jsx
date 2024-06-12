import React from 'react';
import { useDispatch } from 'react-redux';
import { RegisterForm } from '@/components/fraction';
import { toast } from '@/components/design/toast';
import { authUserThunks } from '@/states/authuser';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = React.useCallback(async (registerFormData) => {
    try {
      await dispatch(authUserThunks.asyncRegister(registerFormData));
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  }, [dispatch, navigate]);

  return <RegisterForm onSubmit={handleRegister} />;
}
