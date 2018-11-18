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
import Recorder from 'recorder-js';
import TimerContainer from "../timer/TimerContainer";
import {bufferTime, filter, map} from "rxjs/operators";

class EmotionContainer extends Component {
    constructor(props) {
        super(props);
        this.recorder = new AudioRecorder();
        this.audioDataSubscription = null;
    }

    componentDidMount() {
        this.bindAudioData()
    }

    componentWillUnmount() {
        this.unbindAudioData()
    }

    bindAudioData = () => {
        const { fetchEmotion, config } = this.props;

        // Listen the the audio source and fetch new emotionState here.
        // In order not to spam server, only emit the latest data after every {number} second(s).
        this.audioDataSubscription = this.recorder.getAudioDataStream()
            .pipe(
                bufferTime(config.duration),
                filter(bufferedData => bufferedData.length > 0),
                map(bufferedData => bufferedData.reduce((accumulator, currentData) => accumulator.concat(currentData))),
                map(data => new Blob(data, {type: "audio/wav"}))
            )
            .subscribe(audioData => {
                //let t = Recorder.download(audioData, 'my-audio-file');
                //console.log(t);
                fetchEmotion("longvu", audioData)
                    .subscribe(
                        () => {},
                        error => {console.log(error)},
                        () => {}
                    )
            });
    };

    unbindAudioData = () => {
        if (this.audioDataSubscription) {
            this.audioDataSubscription.unsubscribe();
            this.audioDataSubscription = null;
        }
    };

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