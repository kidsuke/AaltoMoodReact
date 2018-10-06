import React, { Component } from 'react';
import './MainPage.css';
import EmotionContainer from "../../containers/emotion/EmotionContainer"
import ActionsContainer from "../../containers/action/ActionsContainer"

export default class MainPage extends Component {
    render() {
        return (
            <div className="Main">
                <div className="Main-left">
                    <EmotionContainer/>
                    <ActionsContainer />
                </div>
                <div className="Main-right">
                    <p>Questions</p>
                </div>
            </div>
        )
    }
}