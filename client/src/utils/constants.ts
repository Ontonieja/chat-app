export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/auth";
export const CONTACT_ROUTES = "/contacts";
export const CHAT_ROUTES = "/chat";

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const USER_INFO = `${AUTH_ROUTES}/user-info`;
export const SETUP_PROFILE = `${AUTH_ROUTES}/profile-setup`;

export const SEARCH_CONTACT = `${CONTACT_ROUTES}/find-contact`;
export const ADD_CONTACT = `${CONTACT_ROUTES}/add-contact`;
export const GET_CONTACTS = `${CONTACT_ROUTES}/get-contacts`;

export const GET_MESSAGES = `${CHAT_ROUTES}/get-messages`;

export const TOAST_DURATION = 3000;
