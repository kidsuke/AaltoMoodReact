import {combineReducers} from "redux";
import emotionReducer from "./EmotionReducer"

export default combineReducers({
    emotion: emotionReducer
})