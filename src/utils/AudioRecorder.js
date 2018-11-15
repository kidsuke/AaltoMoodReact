import Recorder from 'recorder-js';
import {Subject} from "rxjs";
import {filter, map, bufferTime} from "rxjs/operators";

class AudioRecorder {
    constructor() {
        this.audioSource = new Subject();

        this.audioSourceSubscription = null;

        this.onAudioDataReceived = null;

        const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
        this.recorder = new Recorder(audioContext, {
            onAnalysed: data => this.audioSource.next(data.data)
        });
    }

    init = (config) => {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(stream => this.recorder.init(stream))
            .catch(err => console.log('Unable to get stream...', err));
    };

    startRecording = () => {
        this.recorder.start()
            .then(() => {
                // Listen the the audio source and fetch new emotionState here.
                // In order not to spam server, only emit the latest data after every {number} second(s).
                this.audioSourceSubscription = this.audioSource
                    .pipe(
                        bufferTime(5000),
                        filter(bufferedData => bufferedData.length > 0),
                        map(bufferedData => bufferedData.reduce((accumulator, currentData) => accumulator.concat(currentData))),
                        map(data => new Blob(data, {type: "audio/wav"}))
                    )
                    .subscribe(audioData => {
                        console.log(audioData);
                        if (this.onAudioDataReceived) {
                            this.onAudioDataReceived(audioData)
                        }
                    });
            })
    };

    stopRecording = () => {
        this.recorder.stop()
            .then(() => {
                // Unsubscribe from the audio source
                if (this.audioSourceSubscription) {
                    this.audioSourceSubscription.unsubscribe();
                    this.audioSourceSubscription = null;
                }
            });
    };

    setOnAudioDataReceivedListener = (listener) => {
        this.onAudioDataReceived = listener;
    }
}

export default AudioRecorder;