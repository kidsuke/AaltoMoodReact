import {BASE_URL} from "../utils/Constants";
import {defer} from "rxjs";
import {map} from "rxjs/operators"
import axios from "axios";

export const fetchEmotions = (username, audioData) => {
    const formData = new FormData();
    formData.append('audio_data', audioData, username);

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