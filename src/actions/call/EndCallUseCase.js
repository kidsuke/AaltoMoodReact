import {endCallActionCreator} from "./CallActionCreators";
import {of} from "rxjs";
import {ignoreElements} from "rxjs/operators"

const endCallUseCase = () => {
    return (dispatch) => {
        console.log("Ended call...");
        return of(dispatch(endCallActionCreator()))
            .pipe(ignoreElements())
    }
};

export default endCallUseCase;