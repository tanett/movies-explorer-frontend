import {
  Link
} from "react-router-dom";

import React from "react";
import './Login.css';
import logo from '../../images/logo.svg';

function Login() {

  return (
      <main className={'login'}>
        <div className={'login__wrap'}>
          <img src={logo} className={'login__logo'} alt={'logo'} title={'На главную'}/>
          <h1 className={'login__title'}>
            Рады видеть!
          </h1>
          <form className={'login__form'}>
            <div className={'login__inputWrap'}>
              <label for={'email'} className={'login__inputLabel'}>
                E-mail
              </label>
              <input className={'login__formInput'} type={'email'} id={'email'}/>
              <label for={'password'} className={'login__inputLabel'}>
                Пароль
              </label>
              <input className={'login__formInput'} type={'password'} id={'password'}/>
            </div>
            <button className={'login__formSubmit'} type={'submit'}>Войти</button>
          </form>
          <p className={'login__ask'}>
            Ещё не зарегистрированы?
            <Link to={'/register'} className={'login__askLink'}>Регистрация</Link>
          </p>
        </div>
      </main>
  )
}

export default Login;
