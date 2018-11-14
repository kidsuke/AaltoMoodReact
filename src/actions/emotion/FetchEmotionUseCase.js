import {fetchEmotions} from "../../api/AaltoMoodApi";
import {storeEmotionActionCreator} from "./EmotionActionCreators";
import {map, tap, ignoreElements} from "rxjs/operators"

const fetchEmotionUseCase = (username, audioData) => {
    return (dispatch) => {
        return fetchEmotions(username, audioData)
            .pipe(
                map(res => processEmotion(res)),
                tap(emotion => dispatch(storeEmotionActionCreator(emotion))),
                ignoreElements()
            );
    }
};

const processEmotion = (emotion) => {
    const max = {
        maxKey: null,
        maxValue: null,
    };

    Object.keys(emotion).forEach(value => {
        if (!max.maxKey || (max.maxValue <= emotion[value])) {
            max.maxKey = value;
            max.maxValue = emotion[value]
        }
    });

    return max.maxKey;
};

export default fetchEmotionUseCase;