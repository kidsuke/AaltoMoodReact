export const START_CALL = "START_CALL";
export const END_CALL = "END_CALL";

export const startCallActionCreator = () => {
    return {
        type: START_CALL,
        payload: {}
    }
};

export const endCallActionCreator = () => {
    return {
        type: END_CALL,
        payload: {}
    }
};