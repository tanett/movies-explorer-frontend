import {
  Link
} from "react-router-dom";

import React from "react";
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const changeName = (e) => {
    setName(e.target.value);
    inputValidation(e.target);
    changeButtonState(e.target.closest('form'))
  };
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
    clearForm()
  }

  const clearForm = (e) => {
    setName('');
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
      <main className={'register'}>
        <div className={'register__wrap'}>
          <Link to={'/'} className={'register__logoLink '}>
            <img src={logo} className={'register__logo'} alt={'logo'} title={'На главную'}/>
          </Link>
          <h1 className={'register__title'}>
            Добро пожаловать!
          </h1>
          <form className={'register__form'} onSubmit={handleSubmitForm} name={'form'}>
            <div className={'register__inputWrap'}>
              <label htmlFor={'name'} className={'register__inputLabel'}>
                Имя
              </label>
              <input className={'register__formInput'} type={'text'} id={'name'} required minLength={2} maxLength={30}
                     value={name} onChange={changeName}/>
              <span className={'register__errorInput register__errorInput_name'}>Что-то пошло не так...</span>
              <label htmlFor={'email'} className={'register__inputLabel'}>
                E-mail
              </label>
              <input className={'register__formInput'} type={'email'} id={'email'} name={'email'} required value={email}
                     onChange={changeEmail}/>
              <span className={'register__errorInput register__errorInput_email'}>Что-то пошло не так...</span>
              <label htmlFor={'password'} className={'register__inputLabel'}>
                Пароль
              </label>
              <input className={'register__formInput'} type={'password'} id={'password'} required name={'password'}
                     value={password} onChange={changePassword} minLength={4} maxLength={30}/>
              <span className={'register__errorInput register__errorInput_password'}>Что-то пошло не так...</span>
            </div>
            <div className={'register__btnWrap'}>
              <button className={'register__formSubmit'} type={'submit'} name={'submitButton'}
              >Зарегистрироваться
              </button>
              <p className={'register__ask'}>
                Уже зарегистрированы?
                <Link to={'/signin'} className={'register__askLink'}>Войти</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
  )
}

export default Register;
