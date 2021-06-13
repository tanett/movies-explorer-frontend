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
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";


function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",

  });

  const [isPageLoader, setIsPageLoader] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState('');
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('Все хорошо');
  const history = useHistory();

  React.useEffect(
      () => {
        setIsPageLoader(true);
        handleTokenCheck();
        setTimeout(() => setIsPageLoader(false), 1500);
      }, [loggedIn]
  )


  function handleRegister(name, email, password) {
    return auth.register(name, email, password)
        .then(res => {
          if (!res || !res.ok) {
            setInfoMessage('Что-то пошло не так!Попробуйте ещё раз.');
            setIsTooltipOpen(true);
            setTimeout(() => setIsTooltipOpen(false), 4000);


          }
          if (res.userNoPassword) {
            //setMessageToolTip('Вы успешно зарегистрировались!');
            setInfoMessage('Вы зарегестрировались');
            setIsTooltipOpen(true);
            setTimeout(() => setIsTooltipOpen(false), 4000);
            history.push('/signin')
          }


        }).catch(err => {
          console.log(err)
        });
  }

  function handleLogin(login, password) {

    return auth.authorize(login, password)
        .then(data => {
          if (!data.token) {
            showTooltip(data.message);
            setLoggedIn(false);
            throw new Error(data.message)
          }

        })
      .then(()=>setLoggedIn(true))
        .then(() => history.push('/movies'))

    .catch(err=>console.log(err));
console.log(localStorage('jwt'))
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
            localStorage.setItem('user', JSON.stringify(res));
            setLoggedIn(true);
            setCurrentUser(res);
          }
      ).catch(err => {
        console.log(err)
      })
    } else {setLoggedIn(false)}
  }

  function handleEditSubmit(name, email) {

    mainApi.editUserInfo({name, email})
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(res));
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
        .catch((err) => {
          showTooltip(err.message);
          console.log(err)
        });
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
            <Route exact path={'/'}>
              <div className="page">
                <Header checkToken={handleTokenCheck} loggedIn={loggedIn}/>
                <Main tooltip={showTooltip}/>
                <Footer/>
              </div>
            </Route>
            <ProtectedRoute exact path={'/movies'} component={Movies} tooltip={showTooltip} user={currentUser} checkToken={handleTokenCheck} />
            <ProtectedRoute exact path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} tooltip={showTooltip}
                            user={currentUser}/>
            <ProtectedRoute exact path='/profile' component={Profile} onEditSubmit={handleEditSubmit} loggedIn={loggedIn}
                            user={currentUser}
                            onLogout={handleLogout}/>
            <Route path='/signin'>
              <Login onLogin={handleLogin}/>
            </Route>
            <Route path='/signup'>
              <Register onRegister={handleRegister}/>
            </Route>
            <Route path='/notFound'>
              <NotFoundPage/>
            </Route>
            <Route path='*'>
              {(loggedIn || localStorage.getItem('jwt'))? <Redirect to={'/notFound'}/>:<Redirect to={'/signin'}/>}
            </Route>
          </Switch>
          <Tooltip message={infoMessage} isOpen={isTooltipOpen}/>
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default App;
