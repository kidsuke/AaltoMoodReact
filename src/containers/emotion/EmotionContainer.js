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
import CallDashboard from "../../components/dashboard/CallDashboard";
import {getEmotionProportion} from "../../utils/EmtionUtils";
import _ from 'underscore'

class EmotionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCallDashboard: false
        };
        this.recorder = new AudioRecorder();
        this.fetchEmotionInterval = null;
        this.fetchEmotionSubscription = null;
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
                this.fetchEmotionSubscription = fetchEmotionUseCase("longvu", blob)
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
                    clearInterval(this.fetchEmotionInterval);
                    if (this.fetchEmotionSubscription) {
                        this.fetchEmotionSubscription.unsubscribe();
                        this.fetchEmotionSubscription = null;
                    }
                    this.openCallDashboard()
                }
            );
    };

    getCallEmotionProportion = (call) => {
        return getEmotionProportion(call ? call.emotionHistory : []);
    };

    openCallDashboard = () => {
        this.setState({
            showCallDashboard: true
        })
    };

    closeCallDashboard = () => {
        this.setState({
            showCallDashboard: false
        })
    };

    render() {
        const { emotion, onGoingCall, lastCall, startCall, endCall } = this.props;
        const { showCallDashboard } = this.state;

        return (
            <div className="EmotionContainer">
                <CallDashboard
                    open={showCallDashboard}
                    onClose={this.closeCallDashboard}
                    emotionProportion={this.getCallEmotionProportion(lastCall)}
                />
                <div className="EmotionContainer-top">
                    <TimerContainer/>
                </div>
                <div className="EmotionContainer-center">
                    <Emotion emotion={emotion}/>
                    <EmotionBar emotionProportion={this.getCallEmotionProportion(onGoingCall)}/>
                </div>
                <div className="EmotionContainer-bottom">
                    {
                        !onGoingCall && <Button bsStyle="success" onClick={() => this.startCall(startCall)}>Start call</Button>
                    }
                    {
                        onGoingCall && <Button bsStyle="danger" onClick={() => this.endCall(endCall)}>End call</Button>
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        config: state.configState.config,
        emotion: state.emotionState.emotion,
        onGoingCall: state.callsState.onGoingCall,
        lastCall: _.last(state.callsState.calls)
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