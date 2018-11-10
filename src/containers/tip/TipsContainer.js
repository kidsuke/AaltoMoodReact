import React, { Component } from 'react';
import './TipsContainer.css'
import {connect} from "react-redux";
import Tip from "../../components/tip/Tip";
import posed, {PoseGroup} from "react-pose"

const Box = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        delay: 300,
        transition: {
            y: { type: 'spring' },
            default: { duration: 300 }
        }
    },
    exit: {
        y: 50,
        opacity: 0,
        transition: { duration: 150 }
    }
});

class TipsContainer extends Component {
    render() {
        const { tips } = this.props;

        return (
            <PoseGroup className="TipsContainer">
                {
                    tips.map(tip =>
                        <Box key={tip.id}>
                            <Tip className="Tip" key={tip.id} tip={tip}/>
                        </Box>
                    )
                }
            </PoseGroup>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tips: state.tipsState.tips.filter(tip => tip.type === state.emotionState.emotion)
    }
};

export default connect(mapStateToProps)(TipsContainer)