export const SET_AUTHENTICATION = "SET_AUTHENTICATION";

export const setAuthenticationActionCreator = (authenticated) => {
    return {
        type: SET_AUTHENTICATION,
        payload: {
            authenticated: authenticated
        }
    }
};