import {combineReducers} from "redux";
import emotionReducer from "./EmotionReducer"
import tipsReducer from "./TipsReducer"

export default combineReducers({
    emotionState: emotionReducer,
    tipsState: tipsReducer
})