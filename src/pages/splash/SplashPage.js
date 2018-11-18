import React from "react";
import {HashLoader} from "react-spinners";
import './SplashPage.css'
import {defer, concat} from "rxjs";
import {ignoreElements, tap} from "rxjs/operators";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import fetchConfigUseCase from "../../actions/config/FetchConfigUseCase";
import {Redirect} from "react-router";
import AudioRecorder from "../../utils/AudioRecorder";
import setAuthenticationUseCase from "../../actions/authentication/SetAuthenticationUseCase";

class SplashPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info: "Initializing..."
        }
    }

    componentDidMount() {
        this.initialize()
    }

    initialize = () => {
        const { setAuthentication } = this.props;

        concat(
            this.askForMicrophonePermission(),
            this.fetchServerConfig()
        )
            .subscribe(
                () => {},
                error => {},
                () => {
                    setAuthentication(true)
                }
            )
    };

    askForMicrophonePermission = () => {
        return defer(() => {
            this.setState({
                info: "Ask microphone permission"
            });
            return navigator.mediaDevices.getUserMedia({audio: true, video: false})
        })
            .pipe(
                tap(stream => AudioRecorder.stream = stream),
                ignoreElements()
            );
    };

    fetchServerConfig = () => {
        const { fetchConfig } = this.props;

        return defer(() => {
            this.setState({
                info: "Get application config"
            });
            return fetchConfig()
        })
            .pipe(ignoreElements());
    };

    render() {
        const { info } = this.state;
        const { authenticated } = this.props;

        if (authenticated) {
            return <Redirect to="/main"/>
        } else {
            return (
                <div className="SplashPage">
                    <HashLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                        loading={true}
                    />
                    <p className="SplashPage-info">{info}</p>
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticationState.authenticated
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchConfig: bindActionCreators(fetchConfigUseCase, dispatch),
        setAuthentication: bindActionCreators(setAuthenticationUseCase, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage)