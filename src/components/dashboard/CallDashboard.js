import React from "react";
import Popup from "reactjs-popup";
import {CRYING_ICON, SMILE_ICON, WINK_ICON} from "../../assets";
import "./CallDashboard.css"
import PropTypes from "prop-types";
import {getSatisfactionPoint} from "../../utils/EmtionUtils";

const CallDashboard = (props) => {
    const { open, onClose, emotionProportion } = props;

    const satisfactionPoint = getSatisfactionPoint(emotionProportion);
    const review = getReviewFromEmotionPoint(satisfactionPoint);

    return (
        <Popup open={open} onClose={onClose} modal>
            <div className="CallDashboard-content">
                <button
                    className="CallDashboard-content-close"
                    onClick={() => {
                        if (onClose) {
                            onClose()
                        }
                    }}
                >
                    &times;
                </button>
                <img className="CallDashboard-content-emoji" alt="Emotion" src={review.emoji} width="150px" height="150px"/>
                <p>Total satisfaction: {satisfactionPoint}</p>
                <p>{review.comment}</p>
                <div className="CallDashboard-content-summary">
                    <h1>Summary</h1>
                    <p>Happy: {emotionProportion.happy}</p>
                    <p>Neutral: {emotionProportion.neutral}</p>
                    <p>Sad: {emotionProportion.sad}</p>
                    <p>Fear: {emotionProportion.fear}</p>
                    <p>Angry: {emotionProportion.angry}</p>
                </div>
            </div>
        </Popup>
    )
};

const getReviewFromEmotionPoint = (point) => {
    let emoji;
    let comment;

    if (point >= 80) {
        emoji = SMILE_ICON;
        comment = "Excellent job!";
    } else if (point >= 50 && point < 80) {
        emoji = WINK_ICON;
        comment = "Keep up the good work!"
    } else {
        emoji = CRYING_ICON;
        comment = "Try better next time..."
    }

    return {
        emoji,
        comment
    }
};

CallDashboard.propTypes = {
    open: PropTypes.bool,
    emotionProportion: PropTypes.shape({
        happy: PropTypes.number,
        neutral: PropTypes.number,
        sad: PropTypes.number,
        fear: PropTypes.number,
        angry: PropTypes.number
    }),
    onClose: PropTypes.func
};

CallDashboard.defaultProps = {
    open: false,
    emotionProportion: {
        happy: 0,
        neutral: 0,
        sad: 0,
        fear: 0,
        angry: 0
    }
};

export default CallDashboard;