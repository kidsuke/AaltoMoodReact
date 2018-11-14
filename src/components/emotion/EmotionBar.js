import React from "react";
import './EmotionBar.css';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { emojify } from 'react-emoji';
import PropTypes from 'prop-types'

const HAPPY_POINT = 100;
const NEUTRAL_POINT = 80;
const SAD_POINT = 60;
const FEAR_POINT = 40;
const ANGRY_POINT = 20;

const EmotionBar = (props) => {
    const { emotionProportion } = props;
    const { happy, neutral, sad, fear, angry } = emotionProportion;

    const perfectSatisfaction = (happy + neutral + sad + fear + angry) * HAPPY_POINT;
    const realSatisfaction = happy * HAPPY_POINT + neutral * NEUTRAL_POINT + sad * SAD_POINT + fear * FEAR_POINT + angry * ANGRY_POINT;
    const satisfactionPercent = realSatisfaction * 100 / perfectSatisfaction;

    let status;
    if (isNaN(satisfactionPercent) || satisfactionPercent === 0) {
        status = 'default'
    } else {
        if (satisfactionPercent > NEUTRAL_POINT) {
            status = 'happy'
        } else if (satisfactionPercent > SAD_POINT) {
            status = 'neutral'
        } else if (satisfactionPercent > FEAR_POINT) {
            status = 'sad'
        } else if (satisfactionPercent > ANGRY_POINT) {
            status = 'fear'
        } else {
            status = 'angry'
        }
    }

    return (
        <div className="EmotionBar">
            <Progress
                percent={satisfactionPercent}
                status={status}
                theme={{
                    happy: {
                        symbol: emojify(':smile:'),
                        color: '#4CAF50'
                    },
                    neutral: {
                        symbol: emojify(':neutral_face:'),
                        color: '#8BC34A'
                    },
                    sad: {
                        symbol: emojify(':pensive:'),
                        color: '#FFC107'
                    },
                    fear: {
                        symbol: emojify(':fearful:'),
                        color: '#FF9800'
                    },
                    angry: {
                        symbol: emojify(':rage:'),
                        color: '#F44336'
                    },
                    default: {
                        symbol: emojify(':speak_no_evil:')
                    }
                }}
            />
        </div>
    )
};

EmotionBar.propTypes = {
    emotionProportion: PropTypes.shape({
        happy: PropTypes.number,
        neutral: PropTypes.number,
        sad: PropTypes.number,
        fear: PropTypes.number,
        angry: PropTypes.number
    })
};

EmotionBar.defaultProps = {
    emotionProportion: {
        happy: 0,
        neutral: 0,
        sad: 0,
        fear: 0,
        angry: 0
    }
};

export default EmotionBar;