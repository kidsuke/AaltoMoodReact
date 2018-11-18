import {combineReducers} from "redux";
import emotionReducer from "./EmotionReducer"
import tipsReducer from "./TipsReducer"
import callsReducer from "./CallsReducer"
import authenticationReducer from "./AuthenticationReducer"

export default combineReducers({
    emotionState: emotionReducer,
    tipsState: tipsReducer,
    callsState: callsReducer,
    authenticationState: authenticationReducer
})