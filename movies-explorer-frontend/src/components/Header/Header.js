import {
   Link, NavLink
} from "react-router-dom";

import React from "react";
import './Header.css';

function Header(props) {
  const [mobMenu, setMobMenu] = React.useState(false);
  const handleClicMobMenu = () => {
    setMobMenu(!mobMenu)
  };
  const handleClose = () => {

    setMobMenu(false);
  }


  return (
      <header className={` header ${mobMenu ? "header_mobileOpen" : ""}`}>
        <div className='section__wrap header__wrap'>
          <Link to='/' className='header__logo'/>
          {(!props.loggedIn) ?
              (<nav className='header__nav '>
                <Link to='/signup' className='header__linkSignin'>
                  Регистрация
                </Link>
                <Link to={props.loggedIn ? '/movies' : '/signin'} className='header__linkSignin header__btn'>
                  Войти
                </Link>
              </nav>) : (
                  <>
                    <button className={`${mobMenu ? "header__mobMenu_open" : "header__mobMenu"}`}
                            onClick={handleClicMobMenu}/>
                    <div className={`header__linkWrap ${mobMenu ? "header__linkWrap_mobileMenuOpen" : ""}`}>
                      <button className={`${mobMenu ? "header__closeMobMenuBtn" : "header__closeMobMenuBtn_hidden"}`}
                              onClick={handleClose}/>
                      <nav className={`header__nav ${mobMenu ? "header__nav_mobileMenuOpen" : ""}`}>
                        <NavLink exact to='/' className={`${mobMenu ? "header__link" : "header__link_hidden"}`}
                                 activeClassName='header__link_active' onClick={handleClose}>
                          Главная
                        </NavLink>
                        <NavLink exact to='/movies' className='header__link' activeClassName='header__link_active'
                                 onClick={handleClose}>
                          Фильмы
                        </NavLink>
                        <NavLink to='/saved-movies' className='header__link' activeClassName='header__link_active'
                                 onClick={handleClose}>
                          Сохраненные фильмы
                        </NavLink>
                      </nav>
                      <Link to='/profile' className='header__btnAcc' onClick={handleClose}>
                        <span className='header__btnAccText'>Аккаунт</span>
                      </Link>
                    </div>
                  </>)}

        </div>
      </header>
  )
}

export default Header;
