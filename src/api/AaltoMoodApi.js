import {BASE_URL} from "../utils/Constants";
import {defer, of} from "rxjs";
import {map} from "rxjs/operators"
import axios from "axios";

export const fetchEmotions = (username, audioData) => {
    const formData = new FormData();
    formData.append('audio_data', audioData);

    return defer(() =>
        axios.post(
            `${BASE_URL}/emotions`, formData,
            {
                headers: {
                    "Content-Type": "audio/wav"
                }
            }
        )
    )
        .pipe(map(res => res.data))
};

export const fetchConfig = () => {
    return defer(() =>
        axios.get(`${BASE_URL}/interval`)
    )
        .pipe(map(res => {
            return {
                duration: res.data * 1000
            }
        }))
};