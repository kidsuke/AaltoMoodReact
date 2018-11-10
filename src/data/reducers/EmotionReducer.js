import {STORE_EMOTION} from "../../actions/emotion/EmotionActionCreators";

const initialState = {
    emotion: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case STORE_EMOTION: return storeEmotion(state, action);
        default: return state;
    }
}


const storeEmotion = (state, action) => {
    const { payload } = action;

    return {
        ...state,
        emotion: payload.emotion
    }
};