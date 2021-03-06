import {fetchEmotions} from "../../api/AaltoMoodApi";
import {storeEmotionActionCreator} from "./EmotionActionCreators";
import {map, tap, ignoreElements} from "rxjs/operators"

const fetchEmotionUseCase = (username, audioData) => {
    return (dispatch) => {
        return fetchEmotions(username, audioData)
            .pipe(
                map(res => {
                    console.log("Emotion received raw: " + JSON.stringify(res));
                    return processEmotion(res)
                }),
                tap(emotion => {
                    console.log("Emotion received: " + emotion);
                    dispatch(storeEmotionActionCreator(emotion))
                }),
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