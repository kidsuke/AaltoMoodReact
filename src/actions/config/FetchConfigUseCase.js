import {fetchConfig} from "../../api/AaltoMoodApi";
import {ignoreElements} from "rxjs/operators";

const fetchConfigUseCase = () => {
    return (dispatch) => {
        return fetchConfig()
            .pipe(ignoreElements());
    }
};

export default fetchConfigUseCase;