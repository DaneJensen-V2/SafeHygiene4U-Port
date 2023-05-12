const API_CONSTANTS = {
  REPURPOST_LOGIN: 'https://api.repurpost.com/auth/login/',
  REPURPOST_CREATE_ACCOUNT: 'https://api.repurpost.com/auth/signup',
  REPURPOST_USERINFO: 'https://api.repurpost.com/api/users/user/me',
  REPURPOST_WORKSPACE_LIST: 'https://api.repurpost.com/api/projects',
  REPURPOST_SWITCH_ACTIVE_WORKSPACE: 'https://api.repurpost.com/api/users/project/', // add new workspace ID after the slash
  REPURPOST_WORKSPACE_REFRESH: 'https://api.repurpost.com/auth/token/refresh', // user after switching workspaces
  REPURPOST_GET_IDEAS:
    'https://api.repurpost.com/api/idea?limit=20&skip=0&properties[]=campaign&properties[]=product&properties[]=persona&properties[]=creator&properties[]=buyStage&properties[]=tags&properties[]=amazonKeys&status[]=SHARED&status[]=HIDDEN',
  REPURPOST_GET_IDEAS_HEADERS: {
    Accept: 'application/json, text/plain, */*',
    'Content-Disposition': 'multipart/form-data',
    Referer: 'https://app.repurpost.com/',
  },
};

const REPURPOST_PAGES = {
  TERMS_OF_USE: 'https://repurpost.com/terms-of-use/',
};
const API_KEYS = {
  GOOGLE_CLOUD_KEY: 'AIzaSyD7NxRBuSdX4x4S-MiWrNVct22ScH-X7Ow',
};

const ERROR_TYPES = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  USER_ALREADY_EXISTS: 'USER_ALREADY_HAS_A_REGISTERED_COMPANY',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

const REPURPOST_BACKEND_CONSTANTS = {
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_EMAIL: 'INVALID_EMAIL',
};

const SECURE_STORE_KEYS = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};

module.exports = {
  API_CONSTANTS,
  ERROR_TYPES,
  REPURPOST_BACKEND_CONSTANTS,
  REPURPOST_PAGES,
  SECURE_STORE_KEYS,
};
