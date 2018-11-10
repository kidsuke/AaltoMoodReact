const initialState = {
    tips: [
        {
            id: 1,
            prioritized: true,
            type: "neutral",
            value: "Ask customer if he/she has a car insurance"
        },
        {
            id: 2,
            prioritized: false,
            type: "neutral",
            value: "Give more information about the insurance"
        },
        {
            id: 3,
            prioritized: true,
            type: "happy",
            value: "Tell customer about our insurance's benefits"
        },
        {
            id: 4,
            prioritized: false,
            type: "happy",
            value: "Tell how well our customer service is"
        },
        {
            id: 5,
            prioritized: true,
            type: "sad",
            value: "Cheer customer up"
        },
        {
            id: 6,
            prioritized: false,
            type: "sad",
            value: "Ask more detail about the situation"
        },
        {
            id: 7,
            prioritized: true,
            type: "angry",
            value: "Calm customer down"
        },
        {
            id: 8,
            prioritized: false,
            type: "angry",
            value: "End conversation"
        },
        {
            id: 9,
            prioritized: true,
            type: "fear",
            value: "Lulululul"
        },
        {
            id: 10,
            prioritized: false,
            type: "fear",
            value: "Is it ok if we have feared customer...?"
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}