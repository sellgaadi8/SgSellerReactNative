import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setAuthenticated: () => {},
  setName: () => {},
  name: '',
});

export default GlobalContext;
