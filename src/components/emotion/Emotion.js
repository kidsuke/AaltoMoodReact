import React from "react";
import {ANGRY_GIF, FEAR_GIF, HAPPY_GIF, NEUTRAL_GIF, SAD_GIF} from "../../assets/index";

const Emotion = (props) => {
    const { emotion } = props;

    let src;
    switch (emotion) {
        case "neutral":
            src = NEUTRAL_GIF;
            break;
        case "happy":
            src = HAPPY_GIF;
            break;
        case "sad":
            src = SAD_GIF;
            break;
        case "angry":
            src = ANGRY_GIF;
            break;
        case "fear":
            src = FEAR_GIF;
            break;
        default:
            break;
    }

    return (
        <div className="Emotion">
            <img alt="Emotion" src={src}/>
        </div>
    )
};

export default Emotion;