import React, { Component } from 'react';
import './App.css';
import MainPage from "./pages/main/MainPage"
import {Provider} from "react-redux";
import configureStore from "./data/ConfigureStore"
import SplashPage from "./pages/splash/SplashPage";

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <SplashPage/>
                </div>
            </Provider>
        )
    }
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  // }
}

export default App;
