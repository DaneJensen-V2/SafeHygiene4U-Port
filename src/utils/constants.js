const API_CONSTANTS = {
  REPURPOST_LOGIN: 'https://api.repurpost.com/auth/login/',
  REPURPOST_USERINFO: 'https://api.repurpost.com/api/users/user/me',
  REPURPOST_WORKSPACE_LIST: 'https://api.repurpost.com/api/projects',
  REPURPOST_SWITCH_ACTIVE_WORKSPACE: 'https://api.repurpost.com/api/users/project/',  //add new workspace ID after the slash
  REPURPOST_WORKSPACE_REFRESH: 'https://api.repurpost.com/auth/token/refresh',        //user after switching workspaces
};

const REPURPOST_PAGES = {
  TERMS_OF_USE: 'https://repurpost.com/terms-of-use/',
};

const ERROR_TYPES = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
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
