import React, { Component } from 'react';
import './TipsContainer.css'
import {connect} from "react-redux";
import Tip from "../../components/tip/Tip";

class TipsContainer extends Component {
    render() {
        const { tips } = this.props;

        return (
            <div className="TipsContainer">
                {
                    tips.map(tip => <Tip className="Tip" key={tip.id} tip={tip}/>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tips: state.tipsState.tips.filter(tip => tip.type === state.emotionState.emotion)
    }
};

export default connect(mapStateToProps)(TipsContainer)