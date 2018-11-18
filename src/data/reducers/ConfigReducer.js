import {STORE_EMOTION} from "../../actions/emotion/EmotionActionCreators";
import {END_CALL, START_CALL} from "../../actions/call/CallActionCreators";

const initialState = {
    inialized
};

export default (state = initialState, action) => {
    switch (action.type) {
        case START_CALL: return startCall(state, action);
        case END_CALL: return endCall(state, action);
        case STORE_CONFIG: return addEmotionToOnGoingCall(state, action);
        default: return state;
    }
}

const storeConfig = (state, action) => {

}