import React from "react";
import './EmotionBar.css';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { emojify } from 'react-emoji';
import PropTypes from 'prop-types'
import {ANGRY_POINT, FEAR_POINT, getSatisfactionPoint, NEUTRAL_POINT, SAD_POINT} from "../../utils/EmtionUtils";

const EmotionBar = (props) => {
    const { emotionProportion } = props;

    const satisfactionPoint = getSatisfactionPoint(emotionProportion);

    let status;
    if (satisfactionPoint === 0) {
        status = 'default'
    } else {
        if (satisfactionPoint > NEUTRAL_POINT) {
            status = 'happy'
        } else if (satisfactionPoint > SAD_POINT) {
            status = 'neutral'
        } else if (satisfactionPoint > FEAR_POINT) {
            status = 'sad'
        } else if (satisfactionPoint > ANGRY_POINT) {
            status = 'fear'
        } else {
            status = 'angry'
        }
    }

    return (
        <div className="EmotionBar">
            <Progress
                percent={satisfactionPoint}
                status={status}
                theme={{
                    happy: {
                        symbol: emojify(':smile:'),
                        color: '#4CAF50'
                    },
                    neutral: {
                        symbol: emojify(':simple_smile:'),
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
                        symbol: emojify(':neutral_face:')
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