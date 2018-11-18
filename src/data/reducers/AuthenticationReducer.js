import {SET_AUTHENTICATION} from "../../actions/authentication/AuthenticationActionCreators";

const initialState = {
    authenticated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATION: return setAuthentication(state, action);
        default: return state;
    }
}

const setAuthentication = (state, action) => {
    const { payload } = action;

    return {
        ...state,
        authenticated: payload.authenticated
    }
};