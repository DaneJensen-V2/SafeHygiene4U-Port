const API_CONSTANTS = {
    REPURPOST_LOGIN: 'https://api.repurpost.com/auth/login/',
    REPURPOST_USERINFO: 'https://api.repurpost.com/api/users/user/me',
};

const ERROR_TYPES = {
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
}

const REPURPOST_BACKEND_CONSTANTS = {
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    INVALID_EMAIL: 'INVALID_EMAIL',
}

module.exports = {
    API_CONSTANTS,
    ERROR_TYPES,
    REPURPOST_BACKEND_CONSTANTS,
};