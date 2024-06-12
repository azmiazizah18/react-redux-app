import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { toast } from '@/components/design/toast';
import { tokenHandler } from '@/utils';

export function ProtectedRoute({ children }) {
  const token = tokenHandler.getToken();

  if (!token) {
    toast.info('Upss, Anda harus login terlebih dahulu.');
    return <Navigate to="/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
