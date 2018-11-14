import {STORE_EMOTION} from "../../actions/emotion/EmotionActionCreators";
import {END_CALL, START_CALL} from "../../actions/call/CallActionCreators";

const initialState = {
    calls: [],
    onGoingCall: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case START_CALL: return startCall(state, action);
        case END_CALL: return endCall(state, action);
        case STORE_EMOTION: return addEmotionToOnGoingCall(state, action);
        default: return state;
    }
}

const startCall = (state, action) => {
    if (!state.onGoingCall) {
        state.onGoingCall = {}
    }
    state.calls.push(state.onGoingCall);

    return state;
};

const endCall = (state, action) => {
    state.onGoingCall = null;

    return state;
};

const addEmotionToOnGoingCall = (state, action) => {
    const { payload } = action;

    if (state.onGoingCall) {
        if (!state.onGoingCall.emotionHistory) {
            state.onGoingCall.emotionHistory = []
        }
        state.onGoingCall.emotionHistory.push(payload.emotion)
    }

    return state;
};