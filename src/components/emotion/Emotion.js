import React from "react";
import {ANGRY_ICON, DEFAULT_EMOJI_ICON, FEAR_ICON, HAPPY_ICON, NEUTRAL_ICON, SAD_ICON} from "../../assets/index";

const Emotion = (props) => {
    const { emotion } = props;

    let src;
    switch (emotion) {
        case "neutral":
            src = NEUTRAL_ICON;
            break;
        case "happy":
            src = HAPPY_ICON;
            break;
        case "sad":
            src = SAD_ICON;
            break;
        case "angry":
            src = ANGRY_ICON;
            break;
        case "fear":
            src = FEAR_ICON;
            break;
        default:
            src = DEFAULT_EMOJI_ICON;
            break;
    }

    return (
        <div className="Emotion">
            <img alt="Emotion" src={src} width="150px" height="150px"/>
        </div>
    )
};

export default Emotion;