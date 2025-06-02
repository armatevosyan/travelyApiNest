// auth provider
// import AuthContext from 'contexts/FirebaseContext';
// import AuthContext from 'contexts/AWSCognitoContext';
// import AuthContext from 'contexts/JWTContext';
// import AuthContext from 'contexts/Auth0Context';

// ==============================|| AUTH HOOKS ||============================== //

// import { useSelector } from 'react-redux';

import { isUserLoggedIn } from '@/utils/methods';

const useAuth = () => {
  const user = isUserLoggedIn();
  console.log(user, 'user');
  // if (!user.isLoggedIn) throw new Error('context must be use inside provider');

  return user;
};

export default useAuth;
