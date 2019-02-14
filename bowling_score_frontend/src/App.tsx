import * as React from 'react';
import './App.css';
import scoreStore from './store/ScoreStore';
import {Provider} from "mobx-react";
import ScoreBoard from "./components/ScoreBoard";
import createBrowserHistory from "history/createBrowserHistory";
import Navigation from "./components/Navigation";
import {Route, Router} from "react-router";
import Statics from "./components/Statics";

// import logo from './logo.svg';

class App extends React.Component {

  public render() {
      return (
      <div className="App">
          <Provider store={scoreStore}>
          <Router history={createBrowserHistory()}>
              <div>
                  <Navigation/>
                  <Route path="/" exact component={ScoreBoard} />
                  <Route path="/Statics" exact component={Statics} />
              </div>
          </Router>
          </Provider>


      </div>
    );
  }
}

export default App;
