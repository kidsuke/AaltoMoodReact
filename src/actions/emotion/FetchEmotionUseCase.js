import {fetchEmotions} from "../../api/AaltoMoodApi";
import {storeEmotionActionCreator} from "./EmotionActionCreators";

const fetchEmotionUseCase = (username, audioData) => {
    return (dispatch) => {
        fetchEmotions(username, audioData)
            .subscribe(res => {
                console.log("Fetching emotion succeeded");
                console.log(res);
                const emotion = processEmotion(res);
                dispatch(storeEmotionActionCreator(emotion))
            });
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