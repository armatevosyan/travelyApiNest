// ==============================|| AUTH HOOKS ||============================== //

import { useDispatch } from 'react-redux';
import { isUserLoggedIn } from '@/utils/methods';
import { logoutSuccess } from '@/redux/auth/actions';

const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = isUserLoggedIn();

  const logout = () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
    } catch (e) {
      // ignore
    }
    dispatch(logoutSuccess());
  };

  return {
    isLoggedIn,
    user,
    logout
  };
};

export default useAuth;
