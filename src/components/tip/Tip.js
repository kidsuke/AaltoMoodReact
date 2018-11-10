import React from "react";
import './Tip.css';

const Tip = (props) => {
    const { tip } = props;

    return (
        <div className={tip.prioritized ? "Tip-prioritized" : "Tip"}>
            <p className={tip.prioritized ? "Tip-content-prioritized" : "Tip-content"}>
                {tip.value}
            </p>
        </div>
    )
};

export default Tip;