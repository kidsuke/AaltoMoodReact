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

const audioDataSource = new Subject();
const mediaConstraints = {audio: true, video: false};

class EmotionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false,
            emotionState: null,
            audioDataSourceSubscription: null,
        };
    }

    componentDidMount() {
        this.bindAudioSource()
    }

    componentWillUnmount() {
        this.unbindAudioSource()
    }

    startStreaming = () => {
        console.log('Start streaming...');
        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(stream => {
                console.log("Has microphone");
                this.setState({
                    streaming: true
                })
            })
            .catch(error => {
                alert("Does not have microphone")
            })
    };

    stopStreaming = () => {
        console.log('Stop streaming...');
        this.setState({
            streaming: false
        })
    };

    onDataReceived = (recordedBlob) => {
        // Emit the recorded blob
        audioDataSource.next(recordedBlob);
    };

    bindAudioSource = () => {
        const { fetchEmotion } = this.props;

        // Listen the the audio source and fetch new emotionState here.
        // In order not to spam server, only emit the latest data after every {number} second(s).
        let subscription = audioDataSource
            .pipe(throttleTime(2000))
            .subscribe(audioData => fetchEmotion("longvu", audioData));

        this.setState({
            audioDataSourceSubscription: subscription
        })
    };

    unbindAudioSource = () => {
        this.state.audioDataSourceSubscription.unsubscribe()
    };

    render() {
        const { emotion } = this.props;

        return (
            <div className="EmotionContainer">
                <Emotion emotion={emotion}/>
                <ReactMic
                    record={this.state.streaming}
                    className="sound-wave"
                    onData={this.onDataReceived}
                    strokeColor="#FF9800"
                    backgroundColor="#FF4081" />
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={this.startStreaming}>Start call</Button>
                    <Button bsStyle="danger" onClick={this.stopStreaming}>End call</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        emotion: state.emotionState.emotion
    }
};

 const mapDispatchToProps = (dispatch) => {
     return {
         fetchEmotion: bindActionCreators(fetchEmotionUseCase, dispatch)
     }
 };

export default connect(mapStateToProps, mapDispatchToProps)(EmotionContainer)