import { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'constants/constants';
import AuthContext from 'context/auth/auth.context';

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('TOKEN');
  const myEmail = 'email@gmail.com';
  const myPassword = 'Password1!';

  const handleLogout = useCallback(() => {
    localStorage.removeItem('TOKEN');
    navigate(PATHS.login);
  }, [navigate]);

  const handleLogin = useCallback(
    (email, password) => {
      if (email === myEmail && password === myPassword) {
        localStorage.setItem('TOKEN', 'tokken');
        navigate(PATHS.weather);
      }
    },
    [navigate],
  );

  const authData = useMemo(
    () => ({
      isAuth,
      myEmail,
      myPassword,
      logout: handleLogout,
      login: handleLogin,
    }),
    [handleLogout, handleLogin, isAuth],
  );

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return authContext;
};
