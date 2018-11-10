export const STORE_EMOTION = "STORE_EMOTION";

export const storeEmotionActionCreator = (emotion) => {
    return {
        type: STORE_EMOTION,
        payload: {
            emotion: emotion
        }
    }
};