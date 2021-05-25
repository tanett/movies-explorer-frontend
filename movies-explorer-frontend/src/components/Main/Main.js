import {
  Switch, Route, useParams, Link, NavLink
} from "react-router-dom";

import React from "react";
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main(props) {

  return (
      <main className='main' >
        <Switch >
          <Route exact path = "/">
            <Promo />
            <AboutProject/>
            <Techs />
            <AboutMe />
            <Portfolio/>

          </Route>
          <Route  path = "/movies">

          </Route>
          <Route  path = "/saved-movies">

          </Route>

        </Switch>

      </main>
  )
}

export default Main;
