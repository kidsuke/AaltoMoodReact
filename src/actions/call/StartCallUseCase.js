import {startCallActionCreator} from "./CallActionCreators";
import {of} from "rxjs";
import {ignoreElements} from "rxjs/operators"

const startCallUseCase = () => {
    return (dispatch) => {
        console.log("Started call...");
        return of(dispatch(startCallActionCreator()))
            .pipe(ignoreElements())
    }
};

export default startCallUseCase;