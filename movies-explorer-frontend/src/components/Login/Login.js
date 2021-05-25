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
          <Link to={'/'} className={'login__logoLink'}>
            <img src={logo} className={'login__logo'} alt={'logo'} title={'На главную'}/>
          </Link>
          <h1 className={'login__title'}>
            Рады видеть!
          </h1>
          <form className={'login__form'}>
            <div className={'login__inputWrap'}>
              <label for={'email'} className={'login__inputLabel'}>
                E-mail
              </label>
              <input className={'login__formInput'} type={'email'} id={'email'}/>
              <span className={'login__errorInput'}>Что-то пошло не так...</span>
              <label for={'password'} className={'login__inputLabel'}>
                Пароль
              </label>
              <input className={'login__formInput'} type={'password'} id={'password'}/>
              <span className={'login__errorInput'}>Что-то пошло не так...</span>
            </div>
            <div className={'login__btnWrap'}>
              <button className={'login__formSubmit'} type={'submit'}>Войти</button>
              <p className={'login__ask'}>
                Ещё не зарегистрированы?
                <Link to={'/register'} className={'login__askLink'}>Регистрация</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
  )
}

export default Login;
