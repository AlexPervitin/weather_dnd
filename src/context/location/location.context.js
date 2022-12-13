import { createContext } from 'react';

const defaultValue = {
  position: {},
  setPosition: () => {},
};

export default createContext(defaultValue);
