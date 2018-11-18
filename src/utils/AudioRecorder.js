import {defer, Subject} from "rxjs";

const script = document.createElement("script");

script.src = "https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js";
script.async = true;

document.body.appendChild(script);

class AudioRecorder {
    static stream;

    constructor() {
        this.audioSource = new Subject();
        this.recording = false;

        // Initialize recorder
        this.audioContext =  new (window.AudioContext || window.webkitAudioContext)();
        // this.recorder = new Recorder(audioContext, {
        //     onAnalysed: data => {
        //         if (this.recording) {
        //             this.audioSource.next(data.data)
        //         }
        //     }
        // });
        // if (AudioRecorder.stream) {
        //     this.recorder.init(AudioRecorder.stream)
        // }
    }

    startRecording = () => {
        /* use the stream */
        let input = this.audioContext.createMediaStreamSource(AudioRecorder.stream);

        /*
        Create the Recorder object and configure to record mono sound (1 channel)
        Recording 2 channels  will double the file size
        */
        this.recorder = new Recorder(input,{numChannels:1});
        this.recorder.record();
        this.recording = true;

        setInterval(this.getBlob, 1000)
        // this.recorder.start()
        //     .then(() => this.recording = true)
    };

    getBlob = () => {
        this.recorder.exportWAV(blob => {
            this.audioSource.next(blob)
        });
    };

    stopRecording = () => {
        this.recorder.stop();
        this.recording = false;
        // this.recorder.stop()
        //     .then(() => this.recording = false)
    };

    getAudioDataStream = () => {
        return defer(() => this.audioSource);
    }

}

export default AudioRecorder;