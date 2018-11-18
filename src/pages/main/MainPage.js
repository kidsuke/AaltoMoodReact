import React from 'react';
import './MainPage.css';
import EmotionContainer from "../../containers/emotion/EmotionContainer"
import TipsContainer from "../../containers/tip/TipsContainer"

export default class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage">
                <EmotionContainer/>
                <TipsContainer />
            </div>
        )
    }

}