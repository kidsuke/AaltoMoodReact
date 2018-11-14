import {combineReducers} from "redux";
import emotionReducer from "./EmotionReducer"
import tipsReducer from "./TipsReducer"
import callsReducer from "./CallsReducer"

export default combineReducers({
    emotionState: emotionReducer,
    tipsState: tipsReducer,
    callsState: callsReducer
})