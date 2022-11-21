import React, { 
  useState, 
  createContext, 
  useContext 
} from 'react';
import {
  getPersistedAuthTokens,
  getRefreshedToken,
  getAuthTokensLogin,
} from '../utils/authentication';
import { ERROR_TYPES } from '../utils/constants';

const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [userObject, setUserobject] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [sessionID, setSessionID] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const onLogin = async (email, password) => {
      console.log(`Entry to onLogin with email ${email} and password ${password}`);
      try {
        const { 
          accessToken,
          refreshToken,
          sessionID
        } = await getAuthTokensLogin(email, password);
      
        setAccessToken(accessToken);
        setSessionID(sessionID);
        //TO-DO -- save refresh token to the secure store
        //TO-DO -- make call to get user info and store it in user object. 
  
        setIsAuthenticated(true);
        console.log('USER AUTHENTICATED');
      }
      catch (error) {
        console.error(error.message)
        switch (error.message) {
          case ERROR_TYPES.INVALID_EMAIL:
            //TO-DO: Handle Invalid email
            console.log('Invalid email. Try again.')
            setIsAuthenticated(false);
            break;
          case ERROR_TYPES.INVALID_PASSWORD:
            //TO-DO: handle invalid password
            console.log('Invalid password. Try again');
            setIsAuthenticated(false);
            break;
          default:
            console.log('Unknown error during login. Try again.')
            //TO-DO: Handle generic error on login attempt
            setIsAuthenticated(false);
            break;
        }
      }
    };

      const onLogout = async () => {
        setIsAuthenticated(false);
        setAccessToken('');
        setSessionID('');
        setUserobject({});
        //TO-DO -- Implement the rest of the functionality
        // remove the user's refresh token
        // delete local user data
        // anything else?
      };

      //method to fake authentication during testing
      const fakeLogin = () => setIsAuthenticated(true);

    return (
        <AuthenticationContext.Provider
          value={{
            isAuthenticated: isAuthenticated,
            accessToken: accessToken,
            sessionID: sessionID,
            userObject: userObject,
            onLogin,
            onLogout,
            fakeLogin,
          }}
        >
          {children}
        </AuthenticationContext.Provider>
      );
    };
    
//create a new hook for authentication use 
export const useAuth = () => useContext(AuthenticationContext);