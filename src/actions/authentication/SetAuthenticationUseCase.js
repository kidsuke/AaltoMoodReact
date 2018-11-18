import {of} from "rxjs";
import {ignoreElements} from "rxjs/operators";
import {setAuthenticationActionCreator} from "./AuthenticationActionCreators";

const setAuthenticationUseCase = (authenticated) => {
    return (dispatch) => {
        console.log("Ended call...");
        return of(dispatch(setAuthenticationActionCreator(authenticated)))
            .pipe(ignoreElements())
    }
};

export default setAuthenticationUseCase;