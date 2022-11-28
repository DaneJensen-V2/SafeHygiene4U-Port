import * as SecureStore from 'expo-secure-store';
import { 
    API_CONSTANTS, 
    ERROR_TYPES,
    REPURPOST_BACKEND_CONSTANTS,
 } from './constants';
import {
    makeAuthenticatedRequest,
} from './request-authenticated';

/**
 * Function to get the access and refresh tokens from the User's secure storage, if they exist. 
 */
const getPersistedAuthTokens = async () => {
    //TO-DO
    //const accessToken = await SecureStore.getItemAsync(auth.accessToken);
    //const refreshToken = await SecureStore.getItemAsync(auth.refreshToken);
};

/**
 * Function to get a refreshed access token from Repurpost.
 */
const getRefreshedToken = async () => {

}

module.exports = {
    getPersistedAuthTokens,
    getRefreshedToken,
};
