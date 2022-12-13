import { createContext } from 'react';

const defaultValue = {
  isAuth: false,
  login: () => {},
  logout: () => {},
};

export default createContext(defaultValue);
