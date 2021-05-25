import logo from '../../logo.svg';

import './App.css';

import Header from '../Header/Header';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import React from "react";
import {
  Switch, Route, useParams, Link, NavLink
} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";


function App() {
  return (
      <Switch>
        <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
          <div className="page">
            <Header />
            <Main />
            <Footer />
          </div>
        </Route>
        <Route path='/login' >
          <Login />
        </Route>
        <Route path='/register' >
          <Register />
        </Route>
        <Route path='*' >
          <NotFoundPage />
        </Route>
      </Switch>

  );
}

export default App;
