import React from 'react';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [employer, setEmployer] = React.useState();
  const store = { employer, setEmployer };
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}