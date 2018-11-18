import React from "react";
import {HashLoader} from "react-spinners";
import './SplashPage.css'
import {defer, concat} from "rxjs";
import {ignoreElements} from "rxjs/operators";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import fetchConfigUseCase from "../../actions/config/FetchConfigUseCase";

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
        concat(
            this.askForMicrophonePermission(),
            this.fetchServerConfig()
        )
            .subscribe(
                () => console.log("Done111"),
                error => {},
                () => console.log("Complete222"))
    };

    askForMicrophonePermission = () => {
        return defer(() => {
            this.setState({
                info: "Ask microphone permission"
            });
            return navigator.mediaDevices.getUserMedia({audio: true, video: false})
        })
            .pipe(ignoreElements());
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

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchConfig: bindActionCreators(fetchConfigUseCase, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage)