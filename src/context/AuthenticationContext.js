import React, { useState, createContext } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    const onLogin = () => {
        setUser(true);
      };

      const onLogout = () => {
        setUser(false);
      };

    return (
        <AuthenticationContext.Provider
          value={{
            isAuthenticated: user,
            onLogin,
            onLogout
          }}
        >
          {children}
        </AuthenticationContext.Provider>
      );
    };