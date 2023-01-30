import * as SecureStore from 'expo-secure-store';
import { 
    API_CONSTANTS, 
    ERROR_TYPES,
    REPURPOST_BACKEND_CONSTANTS,
    SECURE_STORE_KEYS,
 } from './constants';
import {
    makeAuthenticatedRequest,
} from './request-authenticated';

/**
 * Function to get the access and refresh tokens from the User's secure storage, if they exist. 
 * @param keysToRetrieve - Array of keys (string constants) to retrieve)
 */
const getSecureKeys = async (keysToRetrieve) => {
    let retrievedKeyValues = {};
    for (const key of keysToRetrieve) {
        console.log(`Getting secure value for key ${key}`);
        let value = await SecureStore.getItemAsync(key);
        console.log(`Found value ${value} for key ${key}`);
        retrievedKeyValues[key] = value;
    }
    console.log(`Got secure key-values: ${JSON.stringify(retrievedKeyValues)}`)
    return retrievedKeyValues;
};

/**
 * Function to get a refreshed access token from Repurpost.
 */
const getRefreshedToken = async () => {
    
}

/**
 * Function to save the authentication tokens that were received from Repurpost to the 
 * secure store
 * 
 */
const saveAuthTokensToSecureStore = async (accessToken, refreshToken) => {
    console.log('Attempting to save authentication tokens to Expo secure store.');
    console.log(`accessToken: ${accessToken}, \n\nrefreshToken: ${refreshToken}`);
    await SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, accessToken);
    await SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken);
};

/**
 * Function to delete tokens from Secure Store when the user logs out. 
 */
const removeAuthTokensFromSecureStore = async () => {
    await SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, '');
    await SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, '');
    console.log("Secure Store cleared");
}

module.exports = {
    getSecureKeys,
    getRefreshedToken,
    saveAuthTokensToSecureStore,
    removeAuthTokensFromSecureStore,
};
