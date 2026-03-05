import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// project import
import { APP_DEFAULT_PATH } from 'config';
import { isUserLoggedIn } from '@/utils/methods';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = isUserLoggedIn();
  const loginSuccess = useSelector((state) => state.auth?.isUserLoggedInSuccess);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn || loginSuccess) {
      const to = location?.state?.from || APP_DEFAULT_PATH;
      navigate(to, { state: { from: '' }, replace: true });
    }
  }, [isLoggedIn, loginSuccess, navigate, location]);

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
