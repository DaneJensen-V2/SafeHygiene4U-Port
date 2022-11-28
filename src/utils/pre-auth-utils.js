import * as SecureStore from 'expo-secure-store';
import { 
    API_CONSTANTS, 
    ERROR_TYPES,
    REPURPOST_BACKEND_CONSTANTS,
 } from './constants';
import {
    makeUnauthenticatedRequest,
} from './request-unauthenticated';

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
            password: password
            }),
        });

        //if the access token isn't found in the response, throw an appropriate error.
        if (!response.accessToken) {
            //throw some errors if the user's credentials don't result in an access token.
            console.error(`Access token not received for provided credentials. Response: `, JSON.stringify(response));
            switch (response?.message) {
                case REPURPOST_BACKEND_CONSTANTS.INVALID_EMAIL:
                    throw new Error(ERROR_TYPES.INVALID_EMAIL);
                case REPURPOST_BACKEND_CONSTANTS.INVALID_PASSWORD:
                    throw new Error(ERROR_TYPES.INVALID_PASSWORD);
                default:
                    throw new Error(ERROR_TYPES.UNKNOWN_ERROR);
            };
        };

        // otherwise, return the token info
        return {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            sessionID: response.session,
        };
};

module.exports = {
    getAuthTokensLogin,
};
