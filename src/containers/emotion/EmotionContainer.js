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
import Timer from "../../components/timer/Timer";
import TimerContainer from "../timer/TimerContainer";

class EmotionContainer extends Component {
    constructor(props) {
        super(props);
        this.recorder = new AudioRecorder();
    }

    componentDidMount() {
        const { fetchEmotion } = this.props;

        this.recorder.init();
        this.recorder.setOnAudioDataReceivedListener(audioData => {
            fetchEmotion("longvu", audioData).subscribe()
        });
    }

    componentWillUnmount() {
        this.recorder.setOnAudioDataReceivedListener(null)
    }

    startCall = (startCallUseCase) => {
        startCallUseCase()
            .subscribe(
                res => {},
                error => {},
                () => {
                    console.log('Start recording...');
                    this.recorder.startRecording();
                }
            );
    };

    endCall = (endCallUseCase) => {
        endCallUseCase()
            .subscribe(
                res => {},
                error => {},
                () => {
                    console.log('Stop recording...');
                    this.recorder.stopRecording();
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