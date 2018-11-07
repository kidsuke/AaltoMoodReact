import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import { Button, ButtonToolbar } from "react-bootstrap"
import './EmotionContainer.css';
import {fetchEmotions} from "../../api/AaltoMoodApi";
import {Subject} from "rxjs";
import {throttleTime} from "rxjs/operators"

const audioDataSource = new Subject();
const mediaConstraints = {audio: true, video: false};

export default class EmotionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false
        };
        this.bindAudioSource()
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
        // Listen the the audio source and fetch new emotion here.
        // In order not to spam server, only emit the latest data after every {number} second(s).
        audioDataSource
            .pipe(throttleTime(5000))
            .subscribe(audioData => this.fetchEmotions(audioData))
    };

    fetchEmotions = (audioData) => {
        fetchEmotions("longvu", audioData)
            .subscribe(res => console.log(res));
    };

    render() {
        return (
            <div className="EmotionContainer">
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