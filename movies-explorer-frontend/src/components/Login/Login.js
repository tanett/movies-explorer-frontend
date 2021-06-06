import {
  Link
} from "react-router-dom";

import React from "react";
import './Login.css';
import logo from '../../images/logo.svg';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
    inputValidation(e.target);
    changeButtonState(e.target.closest('form'))
  }
  const changePassword = (e) => {
    setPassword(e.target.value);
    inputValidation(e.target);
    changeButtonState(e.target.closest('form'))
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
    clearForm()
  }

  const clearForm = () => {
    setEmail('');
    setPassword('');
  }

  const hideError = (input) => {
    input.nextSibling.classList.remove(`register__errorInput_active`);
  }
  const showError = (input) => {
    input.nextSibling.classList.add(`register__errorInput_active`);
    input.nextSibling.textContent = input.validationMessage || "Что-то пошло не так";
  }

  const inputValidation = (input) => {
    if (input.checkValidity()) {
      hideError(input);
    } else {
      showError(input);
    }
  }

  const changeButtonState = (form) => {
    if (form.checkValidity()) {
      form.elements['submitButton'].disabled = false;
    } else {
      form.elements['submitButton'].disabled = true;
    }
  }


  return (
      <main className={'login'}>
        <div className={'login__wrap'}>
          <Link to={'/'} className={'login__logoLink'}>
            <img src={logo} className={'login__logo'} alt={'logo'} title={'На главную'}/>
          </Link>
          <h1 className={'login__title'}>
            Рады видеть!
          </h1>
          <form className={'login__form'} name={'form'} onSubmit={handleSubmitForm}>
            <div className={'login__inputWrap'}>
              <label htmlFor={'email'} className={'login__inputLabel'}>
                E-mail
              </label>
              <input className={'login__formInput'} type={'email'} id={'email'} name={'email'} required value={email}
                     onChange={changeEmail}/>
              <span className={'login__errorInput'}>Что-то пошло не так...</span>
              <label htmlFor={'password'} className={'login__inputLabel'}>
                Пароль
              </label>
              <input className={'login__formInput'} type={'password'} id={'password'} name={'password'} required
                     value={password} onChange={changePassword}/>
              <span className={'login__errorInput'}>Что-то пошло не так...</span>
            </div>
            <div className={'login__btnWrap'}>
              <button className={'login__formSubmit'} type={'submit'} name={'submitButton'}>Войти</button>
              <p className={'login__ask'}>
                Ещё не зарегистрированы?
                <Link to={'/signup'} className={'login__askLink'}>Регистрация</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
  )
}

export default Login;
