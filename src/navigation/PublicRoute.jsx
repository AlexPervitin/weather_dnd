import { Navigate } from 'react-router-dom';
import { PATHS } from 'constants/constants';
import { useAuthContext } from 'context/auth/auth.provider';

function PublicRoute({ children }) {
  const { isAuth } = useAuthContext();
  if (isAuth) return <Navigate to={PATHS.weather} />;

  return children;
}

export default PublicRoute;
