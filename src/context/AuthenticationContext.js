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
 import { API_CONSTANTS } from '../utils/constants';

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

      //method to get user info and store crucial bits in the userObject
      const getUserInfo = async () => {
        const user = await makeAuthenticatedRequest({
          host:API_CONSTANTS.REPURPOST_USERINFO,
          method: 'GET',
        });
        const workspaces = await makeAuthenticatedRequest({
          host: API_CONSTANTS.REPURPOST_WORKSPACE_LIST,
          method: 'GET',
        });

        const newWork = JSON.parse(JSON.stringify(workspaces));
        const newUser = JSON.parse(JSON.stringify(user));

        const finalObject = {
          name: newUser.profile.name,
          email: newUser.profile.email,
          projNum: newUser.projectsNumber,
          currentProjID: newUser.project._id,
          currentProjName: newUser.project.name,
          allWorkspaces: newWork,
        }
        setUserobject(finalObject);
        console.log(userObject);
      }

      /**
       * Switch user workspace
       * @param {string} ID
       * @returns
       */
      const swapWorkspace = async (ID) => {
        const Host = API_CONSTANTS.REPURPOST_SWITCH_ACTIVE_WORKSPACE + ID;
        response = await makeAuthenticatedRequest({
          host: Host,
          method: 'PUT',
        });

        //TO-DO: check for response codes and only continue if code is 200
        //TO-DO: add refresh function if code 200
        //TO-DO: update user object to ensure the current project is now the selected workspace (NK: I can't test this, as my account only lets me have 1 workspace)
        //TO-DO: test function
      }
      


      /**
       * Make Authenticated Request to Repurpost API
       * @param {object} params
       * @returns
       */
      const makeAuthenticatedRequest = async ({
        headers = {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
        },
        method = 'GET',
        body = '{}',
        host = 'NO_DESTINATION_SET',
      } = {} ) => {
        if (!isAuthenticated)
          throw new Error('Attempt to make authenticated request from unauthenicated context.');
        
        if(method=='GET'){
          try {
            const response = await fetch(host, {
              method: method,
              headers: {
                Authorization: `Bearer ${accessToken}`,
                ...headers
              },
            });

            //TO-DO -- Add check to see if we get any error that results from an expired sessionID
            // or something else, and if so, do the proper logic to refresh the token and try again.
            
            return response.json();
          } catch (error) {
            console.error('ERROR IN AUTH REQUEST');
            console.error(error);
          }
      }
      //TO-DO: test that this long if statement works, specifically the POST and PUT sections, as the GET section works properly
      else if(method == 'POST'){
        try {
          const response = await fetch(host, {
            method: method,
            body: body,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              ...headers
            },
          });

          //TO-DO -- Add check to see if we get any error that results from an expired sessionID
          // or something else, and if so, do the proper logic to refresh the token and try again.
          
          return response.json();
        } catch (error) {
          console.error('ERROR IN AUTH REQUEST');
          console.error(error);
        }
      }
      else if(method == 'PUT'){
        try {
          const response = await fetch(host, {
            method: method,
            body: body,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              ...headers
            },
          });

          //TO-DO -- Add check to see if we get any error that results from an expired sessionID
          // or something else, and if so, do the proper logic to refresh the token and try again.
          
          return response.json();
        } catch (error) {
          console.error('ERROR IN AUTH REQUEST');
          console.error(error);
        }
      }
      };

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
            makeAuthenticatedRequest,
            getUserInfo,
          }}
        >
          {children}
        </AuthenticationContext.Provider>
      );
    };
    
//create a new hook for authentication use 
export const useAuth = () => useContext(AuthenticationContext);