import React from 'react';
import api from './api';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [employer, setEmployer] = React.useState();
  const [alert, setAlert] = React.useState({ open: false, severity: '', message: '' });
  const store = {
    employer,
    setEmployer,
    alert,
    setAlert,
    api: new api('http://localhost:8000', setAlert),
  };
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}