import './App.css';

import React from "react";
import {
  Switch, Route, useHistory, Redirect
} from "react-router-dom";
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {LoggedInContext} from "../../context/LoggedInContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from '../Header/Header';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

import Tooltip from "../Tooltip/Tooltip";


function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  const [isPageLoader, setIsPageLoader] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState('');
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('Все хорошо');
  const history = useHistory();

  React.useEffect(
      () => {
        setIsPageLoader(true);
        handleTokenCheck();
        setTimeout(() => setIsPageLoader(false), 1000);
      }, [loggedIn]
  )
  console.log(loggedIn);
  console.log(currentUser);

  function handleRegister(name, email, password) {
    return auth.register(name, email, password)
        .then(res => {
          if (!res || !res.ok) {
            setInfoMessage('Что-то пошло не так!Попробуйте ещё раз.');
            setIsTooltipOpen(true);
            setTimeout(() => setIsTooltipOpen(false), 4000);

            //  throw new Error('что-то не так пошло')
          }
          if (res.userNoPassword) {
            //setMessageToolTip('Вы успешно зарегистрировались!');
            setInfoMessage('Вы зарегестрировались');
            setIsTooltipOpen(true);
            setTimeout(() => setIsTooltipOpen(false), 4000);
            history.push('/signin')
          }

          // setIsInfoTooltipOpen(true);

        }).catch(err => console.log(err));
  }

  function handleLogin(login, password) {
    return auth.authorize(login, password)
        .then(data => {

          if (!data.token) {
            setInfoMessage(data.message)
            setIsTooltipOpen(true);
            setTimeout(() => setIsTooltipOpen(false), 4000);
            return data;
          }

          setLoggedIn(true);
          history.push('/movies');
          return data;
        })
        .then(()=>mainApi.getUserInfo().then((data)=>{setCurrentUser(data)}).catch(err => console.log(err)))
        .catch(err => console.log(err));

  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({
      name: "",
      email: ""
    })
  }

  function handleTokenCheck() {

    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then(
          res => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser(res);
            } else {
              setLoggedIn(false);
            }
          }
      ).catch(err => console.log(err))

    }
  }

  function handleEditSubmit(name, email) {

    mainApi.editUserInfo({name, email})
        .then((res) => {
          if (res) {
            setCurrentUser(res);

            setInfoMessage("У вас все получилось")
            setIsTooltipOpen(true);
            setTimeout(() => setIsTooltipOpen(false), 4000);
          } else {
            setInfoMessage("Что-то пошло не так!Попробуйте ещё раз.")
            setIsTooltipOpen(true);
            setTimeout(() => setIsTooltipOpen(false), 4000);
          }
        })
        .then(() => {

          console.log('saved');
        })
        .catch((err) => console.log(err));
  }

  const showTooltip = (message) => {
    setInfoMessage(message)
    setIsTooltipOpen(true);
    setTimeout(() => setIsTooltipOpen(false), 4000);
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <LoggedInContext.Provider value={loggedIn}>
          {isPageLoader && <Preloader/>}
          <Switch>
            <Route exact path={['/', '/movies', '/saved-movies']}>
              <div className="page">
                <Header checkToken={handleTokenCheck} loggedIn={loggedIn}/>
                <Main tooltip={showTooltip}/>
                <Footer/>
              </div>
            </Route>
            <Route path='/profile'>
              <div className="page">
                <Header checkToken={handleTokenCheck} loggedIn={loggedIn}/>
                <ProtectedRoute path='/profile' component={Profile} onEditSubmit={handleEditSubmit} loggedIn={loggedIn}
                                onLogout={handleLogout}/>
              </div>
            </Route>
            <Route path='/signin'>
              <Login onLogin={handleLogin}/>
            </Route>
            <Route path='/signup'>
              <Register onRegister={handleRegister}/>
            </Route>
            <Route path='*'>
              {loggedIn ? <NotFoundPage/> : <Redirect to="/signin"/>}
            </Route>
          </Switch>
          <Tooltip message={infoMessage} isOpen={isTooltipOpen}/>
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default App;
