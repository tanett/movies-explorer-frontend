import {
  Switch, Route, useParams, Link, NavLink
} from "react-router-dom";
import {LoggedInContext} from "../../context/LoggedInContext";
import React from "react";
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function Main(props) {
  const loggedIn = React.useContext(LoggedInContext);
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
          <ProtectedRoute path={'/movies'} component={Movies}/>
          <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn}/>
        </Switch>
      </main>
  )
}

export default Main;
