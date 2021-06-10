import {
  Switch, Route} from "react-router-dom";
import {LoggedInContext} from "../../context/LoggedInContext";
import React from "react";
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";


function Main() {

  return (
      <main className='main'>
        <Switch>
          <Route exact path={'/'}>
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
          </Route>

        </Switch>
      </main>
  )
}

export default Main;
