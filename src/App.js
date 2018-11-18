import React, { Component } from 'react';
import './App.css';
import MainPage from "./pages/main/MainPage"
import {Provider} from "react-redux";
import configureStore from "./data/ConfigureStore"
import SplashPage from "./pages/splash/SplashPage";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

const store = configureStore();

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    {this.renderRouter()}
                </div>
            </Provider>
        )
    }

    renderRouter = () => {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={SplashPage} />
                    <ProtectedRoute path="/main" component={MainPage} />
                </Switch>
            </BrowserRouter>
        )
    }

}

export default App;
