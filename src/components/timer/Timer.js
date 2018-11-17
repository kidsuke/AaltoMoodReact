import React from "react";
import './Timer.css'

const Timer = (props) => {
    const { minute, second } = props;

    return (
        <div className="Timer">
            {minute} : {second}
        </div>
    )
};

export default Timer;