import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import { Button, ButtonToolbar } from "react-bootstrap"
import './EmotionContainer.css';
import {Subject} from "rxjs";
import {throttleTime} from "rxjs/operators"
import Emotion from "../../components/emotion/Emotion";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import fetchEmotionUseCase from "../../actions/emotion/FetchEmotionUseCase";
import EmotionBar from "../../components/emotion/EmotionBar";
import startCallUseCase from "../../actions/call/StartCallUseCase";
import endCallUseCase from "../../actions/call/EndCallUseCase";

const audioDataSource = new Subject();
const mediaConstraints = {audio: true, video: false};

class EmotionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false,
            audioDataSourceSubscription: null
        };
    }

    componentDidMount() {
        const { fetchEmotion } = this.props;
        this.bindAudioSource(fetchEmotion)
    }

    componentWillUnmount() {
        this.unbindAudioSource()
    }

    bindAudioSource = (fetchEmotionUseCase) => {
        // Listen the the audio source and fetch new emotionState here.
        // In order not to spam server, only emit the latest data after every {number} second(s).
        let subscription = audioDataSource
            .pipe(throttleTime(2000))
            .subscribe(audioData => {
                fetchEmotionUseCase("longvu", audioData).subscribe()
            });

        this.setState({
            audioDataSourceSubscription: subscription
        })
    };

    unbindAudioSource = () => {
        this.state.audioDataSourceSubscription.unsubscribe()
    };

    startCall = (startCallUseCase) => {
        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(stream => {
                startCallUseCase()
                    .subscribe(
                        res => {},
                        error => {},
                        () => {
                            console.log('Start streaming...');
                            this.setState({
                                streaming: true
                            })
                        }
                    );
            })
            .catch(error => {
                alert(error)
            })
    };

    endCall = (endCallUseCase) => {
        endCallUseCase()
            .finally(() => {
                console.log('Stop streaming...');
                this.setState({
                    streaming: false
                })
            })
            .subscribe();
    };

    onDataReceived = (recordedBlob) => {
        // Emit the recorded blob
        audioDataSource.next(recordedBlob);
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
                <Emotion emotion={emotion}/>
                <ReactMic
                    record={this.state.streaming}
                    className="sound-wave"
                    onData={this.onDataReceived}
                    strokeColor="#FF9800"
                    backgroundColor="#FF4081" />
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