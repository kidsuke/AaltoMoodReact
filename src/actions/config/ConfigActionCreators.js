export const STORE_CONFIG = "STORE_CONFIG";

export const storeConfigActionCreator = (config) => {
    return {
        type: STORE_CONFIG,
        payload: {
            config: config
        }
    }
};