import {STORE_CONFIG} from "../../actions/config/ConfigActionCreators";

const initialState = {
    config: {
        duration: 5000
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case STORE_CONFIG: return storeConfig(state, action);
        default: return state;
    }
}

const storeConfig = (state, action) => {
    const { payload } = action;

    return {
        ...state,
        config: payload.config
    }
};