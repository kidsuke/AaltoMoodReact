import {BASE_URL} from "../utils/Constants";
import {defer, of} from "rxjs";
import {map,tap} from "rxjs/operators"
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

export const fetchConfig = () => {
    return of(1)
    // return defer(() =>
    //     axios.post(
    //         `${BASE_URL}/emotions`, formData,
    //         {
    //             headers: {
    //                 "Content-Type": "audio/wav"
    //             }
    //         }
    //     )
    // )
    //     .pipe(map(res => res.data))
};