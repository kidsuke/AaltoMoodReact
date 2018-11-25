export const HAPPY_POINT = 100;
export const NEUTRAL_POINT = 80;
export const SAD_POINT = 60;
export const FEAR_POINT = 40;
export const ANGRY_POINT = 20;

export const getEmotionProportion = (emotions) => {
    let emotionProportion = {
        happy: 0,
        neutral: 0,
        sad: 0,
        fear: 0,
        angry: 0
    };

    if (emotions && emotions.length > 0) {
        emotions.forEach(emotion => {
            switch (emotion) {
                case 'happy':
                    emotionProportion.happy++;
                    break;
                case 'neutral':
                    emotionProportion.neutral++;
                    break;
                case 'sad':
                    emotionProportion.sad++;
                    break;
                case 'fear':
                    emotionProportion.fear++;
                    break;
                case 'angry':
                    emotionProportion.angry++;
                    break;
                default:
                    break;
            }
        })
    }

    return emotionProportion
};

export const getSatisfactionPoint = ({happy, neutral, sad, fear, angry}) => {
    const perfectSatisfaction = (happy + neutral + sad + fear + angry) * HAPPY_POINT;
    const realSatisfaction = happy * HAPPY_POINT + neutral * NEUTRAL_POINT + sad * SAD_POINT + fear * FEAR_POINT + angry * ANGRY_POINT;
    const result = Math.round(realSatisfaction * 100 / perfectSatisfaction);

    return isNaN(result) ? 0 : result;
};

export const getEmotionPoint = (emotion) => {
    let result = 0;

    switch (emotion) {
        case "happy":
            result = HAPPY_POINT;
            break;
        case "neutral":
            result = NEUTRAL_POINT;
            break;
        case "sad":
            result = SAD_POINT;
            break;
        case "fear":
            result = FEAR_POINT;
            break;
        case "angry":
            result = ANGRY_POINT;
            break;
        default:
            break;
    }

    return result;
};