import Recorder from "recorder-js";

class AudioRecorder {

    static stream;

    constructor() {
        this.recording = false;

        // Initialize recorder
        const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
        this.recorder = new Recorder(audioContext);
        if (AudioRecorder.stream) {
            this.recorder.init(AudioRecorder.stream)
        }
    }

    startRecording = () => {
        this.recorder.start()
             .then(() => this.recording = true)
    };

    stopRecording = () => {
        this.recorder.stop()
            .then(({blob, buffer}) => {
                this.recording = false;
            });
    };

    getWAV = () => {
        return new Promise((resolve) => {
            this.recorder.audioRecorder.exportWAV(blob => {
                // Reset the buffer
                this.stopRecording();
                this.startRecording();
                resolve(blob)
            });
        });
    };

}

export default AudioRecorder;