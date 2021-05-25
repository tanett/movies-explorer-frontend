import {
  Link
} from "react-router-dom";

import React from "react";
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
      <main className={'register'}>
        <div className={'register__wrap'}>
          <Link to={'/'} className={'register__logoLink '}>
            <img src={logo} className={'register__logo'} alt={'logo'} title={'На главную'}/>
          </Link>
          <h1 className={'register__title'}>
            Добро пожаловать!
          </h1>
          <form className={'register__form'}>
            <div className={'register__inputWrap'}>
              <label htmlFor={'name'} className={'register__inputLabel'}>
                Имя
              </label>
              <input className={'register__formInput'} type={'text'} id={'name'}/>
              <span className={'register__errorInput register__errorInput_name'}>Что-то пошло не так...</span>
              <label htmlFor={'email'} className={'register__inputLabel'}>
                E-mail
              </label>
              <input className={'register__formInput'} type={'email'} id={'email'}/>
              <span className={'register__errorInput register__errorInput_email'}>Что-то пошло не так...</span>
              <label htmlFor={'password'} className={'register__inputLabel'}>
                Пароль
              </label>
              <input className={'register__formInput'} type={'password'} id={'password'}/>
              <span className={'register__errorInput register__errorInput_password'}>Что-то пошло не так...</span>
            </div>
            <div className={'register__btnWrap'}>
              <button className={'register__formSubmit'} type={'submit'}>Зарегистрироваться</button>
              <p className={'register__ask'}>
                Уже зарегистрированы?
                <Link to={'/login'} className={'register__askLink'}>Войти</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
  )
}

export default Register;
