import React, { Component } from 'react';
import { Button, ButtonToolbar } from "react-bootstrap"
import './EmotionContainer.css';
import Emotion from "../../components/emotion/Emotion";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import fetchEmotionUseCase from "../../actions/emotion/FetchEmotionUseCase";
import EmotionBar from "../../components/emotion/EmotionBar";
import startCallUseCase from "../../actions/call/StartCallUseCase";
import endCallUseCase from "../../actions/call/EndCallUseCase";
import AudioRecorder from "../../utils/AudioRecorder";
import TimerContainer from "../timer/TimerContainer";

class EmotionContainer extends Component {

    constructor(props) {
        super(props);
        this.recorder = new AudioRecorder();
        this.fetchEmotionInterval = null;
    }

    startCall = (startCallUseCase) => {
        const { fetchEmotion, config } = this.props;

        startCallUseCase()
            .subscribe(
                res => {},
                error => {},
                () => {
                    console.log('Start recording...');
                    this.recorder.startRecording();
                    this.fetchEmotionInterval = setInterval(() => this.fetchEmotion(fetchEmotion), config.duration)
                }
            );
    };

    fetchEmotion = (fetchEmotionUseCase) => {
        this.recorder.getWAV()
            .then(blob => {
                fetchEmotionUseCase("longvu", blob)
                    .subscribe(
                        () => {},
                        error => {console.log(error)},
                        () => {}
                    )
            })
    };

    endCall = (endCallUseCase) => {
        endCallUseCase()
            .subscribe(
                res => {},
                error => {},
                () => {
                    console.log('Stop recording...');
                    this.recorder.stopRecording();
                    clearInterval(this.fetchEmotionInterval)
                }
            );
    };

    getEmotionProportion = (onGoingCall) => {
        let emotionProportion = {
            happy: 0,
            neutral: 0,
            sad: 0,
            fear: 0,
            angry: 0
        };

        if (onGoingCall && onGoingCall.emotionHistory) {
            onGoingCall.emotionHistory.forEach(emotion => {
                switch (emotion) {
                    case 'happy':
                        emotionProportion.happy++;
                        break;
                    case 'neutral':
                        emotionProportion.neutral++;
                        break;
                    case 'sad':
                        emotionProportion.sad++;
                        break;
                    case 'fear':
                        emotionProportion.fear++;
                        break;
                    case 'angry':
                        emotionProportion.angry++;
                        break;
                    default:
                        break;
                }
            })
        }

        return emotionProportion
    };

    render() {
        const { emotion, onGoingCall, startCall, endCall } = this.props;

        return (
            <div className="EmotionContainer">
                <div className="EmotionContainer-timer">
                    <TimerContainer/>
                </div>
                <Emotion emotion={emotion}/>
                <EmotionBar emotionProportion={this.getEmotionProportion(onGoingCall)}/>
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={() => this.startCall(startCall)}>Start call</Button>
                    <Button bsStyle="danger" onClick={() => this.endCall(endCall)}>End call</Button>
                </ButtonToolbar>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        config: state.configState.config,
        emotion: state.emotionState.emotion,
        onGoingCall: state.callsState.onGoingCall
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmotion: bindActionCreators(fetchEmotionUseCase, dispatch),
        startCall: bindActionCreators(startCallUseCase, dispatch),
        endCall: bindActionCreators(endCallUseCase, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmotionContainer)