import { useAuth } from "../context/AuthenticationContext";

/**
 * Make Authenticated request against repurpost backend.
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
} = {} ) =>  {
    const { 
        isAuthenticated,
        accessToken, 
    } = useAuth();

    if (!isAuthenticated)
        throw new Error('Attempt to make authenticated request from unauthenticated context.');
    
    try {
        const response = await fetch(host, {
            method: method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...headers
            },
            body: body,
    });

    //TO-DO -- Add check to see if we get any error that results from an expired sessionID
    // or something else, and if so, do the proper logic to refresh the token and try again.

    return response.json();
    } catch (error) {
        console.error('ERROR IN AUTHENTICATED REQUEST');
        console.error(error);
    };
};

module.exports = {
    makeAuthenticatedRequest,
};
