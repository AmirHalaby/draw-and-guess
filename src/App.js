import React, { Component } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react';
import HomePage from './components/HomePage';
import Guessing from './components/Guessing';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import { BrowserRouter as Router, Route  } from 'react-router-dom';
// import { Redirect } from "react-router-dom";  

import Welcome from './components/Welcome';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/Drawing" exact element={<HomePage />} />
          <Route path="/Guessing" exact element={<Guessing />} />
        </Routes>
      </BrowserRouter>

    );

  }
}
export default inject("drawStore")(observer(App))