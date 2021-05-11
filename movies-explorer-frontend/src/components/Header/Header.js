import {
  Switch, Route, useParams, Link
} from "react-router-dom";
import logoPath from '../../images/logo.svg';
import React from "react";

function Header(props) {
  const [mobMenu, setMobMenu] = React.useState(false);
  const handleClicMobMenu = () => {
    setMobMenu(!mobMenu)
  };
  const handleOut = () => {
    props.onOutClick();
    setMobMenu(false);
  }


  return (
      <header className={` header ${mobMenu ? "header_mobileOpen" : ""}`}>
        <div className='page__wrap header__wrap'>
          <Link to='/' className='header__logo' />
          <Switch>
            <Route exact path={'/movies' || '/saved-movies' || '/profile'}>
              <div className='header__link-wrap'>
                <nav className='header__nav'>
                  <Link to='/movies' className='header__link'>
                    Фильмы
                  </Link>
                  <Link to='/saved-movies' className='header__link'>
                    Сохраненные фильмы
                  </Link>
                </nav>
                <Link to='/profile' className='header__link'>
                  Аккаунт
                </Link>
              </div>
            </Route>
            <Route path='/'>
              <nav className='header__nav '>
                <Link to='/signup' className='header__link header__link_signin'>
                  Регистрация
                </Link>
                <Link to='/signin' className='header__link header__link_signin header__btn'>
                  Войти
                </Link>
              </nav>
            </Route>
          </Switch>
        </div>
      </header>
  )
}

export default Header;
