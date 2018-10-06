import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import { Button, ButtonToolbar } from "react-bootstrap"
import './EmotionContainer.css';

export default class EmotionContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            streaming: false
        }
    }

    startStreaming = () => {
        console.log('Start streaming...');
        this.setState({
            streaming: true
        })
    }

    stopStreaming = () => {
        console.log('Stop streaming...');
        this.setState({
            streaming: false
        })
    }

    onDataReceived = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

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