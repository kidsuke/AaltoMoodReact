import React from "react";
import connect from "react-redux/es/connect/connect";
import Timer from "../../components/timer/Timer";

class TimerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            counting: false
        }
    }

    startCounting = () => {
        this.countInterval = setInterval(this.tick, 1000);
        this.setState({
            counting: true
        })
    };

    stopCounting = () => {
        clearInterval(this.countInterval);
        this.setState({
            count: 0,
            counting: false
        })
    };

    tick = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.onGoingCall) {
            if (!this.state.counting) {
                this.startCounting()
            }
        } else {
            if (this.state.counting) {
                this.stopCounting()
            }
        }
    }

    render() {
        const { count } = this.state;

        const minute = Math.floor(count / 60);
        const second = count - minute * 60;

        return (
            <div>
                <Timer minute={minute < 10 ? "0" + minute : minute} second={second < 10 ? "0" + second : second}/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        onGoingCall: state.callsState.onGoingCall
    }
};

export default connect(mapStateToProps)(TimerContainer)