import { Navigate } from 'react-router-dom';
import { PATHS } from 'constants/constants';
import { useAuthContext } from 'context/auth/auth.provider';

function PrivateRoute({ children }) {
  const { isAuth } = useAuthContext();
  if (isAuth) return children;

  return <Navigate to={PATHS.login} />;
}

export default PrivateRoute;
