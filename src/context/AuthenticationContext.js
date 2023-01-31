import React, { 
  useState, 
  createContext, 
  useContext 
} from 'react';
import {
  getAuthTokensLogin,
} from '../utils/pre-auth-utils';
import {
  saveAuthTokensToSecureStore,
  removeAuthTokensFromSecureStore,
  getSecureKeys,
  getRefreshedToken,
} from '../utils/post-auth-utils';
import { 
  ERROR_TYPES,
  SECURE_STORE_KEYS,
 } from '../utils/constants';

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
        saveAuthTokensToSecureStore(accessToken, refreshToken);
        setAccessToken(accessToken);
        setSessionID(sessionID);
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
        await removeAuthTokensFromSecureStore();
        //TODO -- Implement the rest of the functionality
        // remove the user's refresh token
        // delete local user data
        // anything else?
      };

      const onAppOpen = async () => {
        // Check if user has a refresh token in secure store
        // This will tell us if they have previously logged in.
        const refreshTokenData = 
          await getSecureKeys([SECURE_STORE_KEYS.REFRESH_TOKEN]);
        const refreshToken = refreshTokenData[SECURE_STORE_KEYS.REFRESH_TOKEN]

        if (!!refreshToken) {
          console.log(`refresh token found! Authenticating user...`)
          // if the token is found in the secure store, authenticate the user
          // and refresh the access token
          setIsAuthenticated(true);
          const newAcecssToken = await getRefreshedToken(refreshToken);
          setAccessToken(newAcecssToken);
          setSessionID('');
          //TODO: Get user object from secure store and load it into context. 
        }
        else {
          console.log(`refresh token not found! Setting user unauthenticated...`)

          //otherwise, ensure that that the user isn't authenticated.
          setIsAuthenticated(false);
        }

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
            onAppOpen,
            fakeLogin,
          }}
        >
          {children}
        </AuthenticationContext.Provider>
      );
    };
    
//create a new hook for authentication use 
export const useAuth = () => useContext(AuthenticationContext);