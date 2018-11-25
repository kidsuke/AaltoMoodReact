const initialState = {
    tips: [
        {
            id: 1,
            prioritized: true,
            type: "neutral",
            value: "Ask customer if he/she has a car insurance"
        },
        {
            id: 3,
            prioritized: true,
            type: "happy",
            value: "Tell customer about our insurance's benefits"
        },
        {
            id: 5,
            prioritized: true,
            type: "sad",
            value: "Cheer customer up"
        },
        {
            id: 7,
            prioritized: true,
            type: "angry",
            value: "Calm customer down"
        },
        {
            id: 9,
            prioritized: true,
            type: "fear",
            value: "Talk about more special benefits"
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}