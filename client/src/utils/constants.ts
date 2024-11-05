export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const USER_INFO = `${AUTH_ROUTES}/user-info`;
export const SETUP_PROFILE = `${AUTH_ROUTES}/profile-setup`;

export const TOAST_DURATION = 3000;
