import {Component} from "react";
import React from "react";
import {ANGRY_GIF, FEAR_GIF, HAPPY_GIF, NEUTRAL_GIF, SAD_GIF} from "../../../assets";

export default class Emotion extends Component {
    getGifFromEmotion = (emoji) => {
        let result;

        switch (emoji) {
            case "neutral":
                result = NEUTRAL_GIF;
                break;
            case "happy":
                result = HAPPY_GIF;
                break;
            case "sad":
                result = SAD_GIF;
                break;
            case "angry":
                result = ANGRY_GIF;
                break;
            case "fear":
                result = FEAR_GIF;
                break;
            default:
                break;
        }

        return result;
    };

    render() {
        const { emotion } = this.props;
        const src = this.getGifFromEmotion(emotion);

        return (
            <div className="Emotion">
                <img alt="Emotion" src={src}/>
            </div>
        )
    }
}