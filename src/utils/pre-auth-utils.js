import * as SecureStore from 'expo-secure-store';
import { API_CONSTANTS, ERROR_TYPES, REPURPOST_BACKEND_CONSTANTS } from './constants';
import { makeUnauthenticatedRequest } from './request-unauthenticated';

/**
 * Function to retreive auth tokens from Repurpost backend
 * @param {string} email
 * @param {string} password
 */
const getAuthTokensLogin = async (email, password) => {
  const response = await makeUnauthenticatedRequest({
    method: 'POST',
    host: API_CONSTANTS.REPURPOST_LOGIN,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  //if the access token isn't found in the response, throw an appropriate error.
  if (!response.accessToken) {
    //throw some errors if the user's credentials don't result in an access token.
    console.error(
      `Access token not received for provided credentials. Response: `,
      JSON.stringify(response)
    );
    switch (response?.message) {
      case REPURPOST_BACKEND_CONSTANTS.INVALID_EMAIL:
        throw new Error(ERROR_TYPES.INVALID_EMAIL);
      case REPURPOST_BACKEND_CONSTANTS.INVALID_PASSWORD:
        throw new Error(ERROR_TYPES.INVALID_PASSWORD);
      default:
        throw new Error(ERROR_TYPES.UNKNOWN_ERROR);
    }
  }

  // otherwise, return the token info
  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    sessionID: response.session,
  };
};

/**
 * Function to create a new user account.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} language
 * @param {string} from
 * @param {string} timezoneName
 *
 * @return {boolean} true if account created, false otherwise
 */
const createAccountRequest = async ({
  name,
  email,
  password,
  password2,
  language = 'english',
  from = null,
  timezoneName = 'America/Phoenix',
}) => {
  const response = await makeUnauthenticatedRequest({
    method: 'POST',
    host: API_CONSTANTS.REPURPOST_CREATE_ACCOUNT,
    body: JSON.stringify({
      from: from,
      language: language,
      name: name,
      email: email,
      password: password,
      password2: password2,
      timezoneName: timezoneName,
      checkConditions: true,
    }),
  });

  console.log(`Got CreateAccount response: ${JSON.stringify(response)}`);

  //if the user id isn't found in the response, throw an appropriate error.
  if (!response['_id']) {
    console.error(
      `Something went wrong with creating the account... details below.`,
      JSON.stringify(response)
    );
    switch (response?.message) {
      case ERROR_TYPES.USER_ALREADY_EXISTS:
        throw new Error(ERROR_TYPES.USER_ALREADY_EXISTS);
      default:
        throw new Error(ERROR_TYPES.UNKNOWN_ERROR);
    }
  }

  // otherwise, return the token info
  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    sessionID: response.session,
  };
};

module.exports = {
  getAuthTokensLogin,
  createAccountRequest,
};
