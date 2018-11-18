import {fetchConfig} from "../../api/AaltoMoodApi";
import {ignoreElements, tap} from "rxjs/operators";
import {storeConfigActionCreator} from "./ConfigActionCreators";

const fetchConfigUseCase = () => {
    return (dispatch) => {
        return fetchConfig()
            .pipe(
                tap(config => {
                    console.log("Config received: " + JSON.stringify(config));
                    dispatch(storeConfigActionCreator(config))
                }),
                ignoreElements()
            );
    }
};

export default fetchConfigUseCase;