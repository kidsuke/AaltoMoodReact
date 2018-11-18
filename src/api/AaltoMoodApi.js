import {BASE_URL} from "../utils/Constants";
import {defer} from "rxjs";
import {map} from "rxjs/operators"
import axios from "axios";

export const fetchEmotions = (username, audioData) => {
    const formData = new FormData();
    formData.append('audio_data', audioData, username);

    return defer(() =>
        axios.post(
            `${BASE_URL}/emotions`, formData)
    )
        .pipe(map(res => res.data))
};

export const fetchConfig = () => {
    return defer(() =>
        axios.get(
            `${BASE_URL}/interval`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
    )
        .pipe(map(res => {
            console.log(res);
            return {
                duration: res.data * 1000
            }
        }))
};