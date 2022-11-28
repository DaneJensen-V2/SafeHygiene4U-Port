/**
 * Make an unauthenticated request against some host
 * @param {object} headers 
 * @param {string} method 
 * @param {string} body 
 * @param {string} host 
 * @returns JSON object of the response
 */
const makeUnauthenticatedRequest = async ({
    headers = {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
    },
    method = 'GET',
    body = '{}',
    host = 'NO_DESTINATION_SET',
} = {} ) =>  {
    try {
    const response = await fetch(host, {
        method: method,
        headers: headers,
        body: body,
    });

    return response.json();
    } catch (error) {
        console.error('ERROR IN UNAUTHENTICATED REQUEST', error, error.stack);
    };
};

module.exports = {
    makeUnauthenticatedRequest,
};
