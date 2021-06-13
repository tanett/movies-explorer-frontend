import {
  Link
} from "react-router-dom";

import React from "react";
import './Profile.css';

import {CurrentUserContext} from "../../context/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

import Header from "../Header/Header";
import {LoggedInContext} from "../../context/LoggedInContext";

function Profile(props) {
  const user = React.useContext(CurrentUserContext);
  const loggedIn = React.useContext(LoggedInContext);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isPageLoader, setIsPageLoader] = React.useState(false);
  const [name, setName] = React.useState('');
  const [errName, setErrName] = React.useState('');
  const [errEmail, setErrEmail] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [equal, setEqual] = React.useState(true);


  React.useEffect(
      () => {
        const user = JSON.parse(localStorage.getItem('user')).user;
        setIsPageLoader(true);
        setEmail(user.email);
        setName(user.name);
        setTimeout(() => setIsPageLoader(false), 1000)
      }
      , []
  )

  //  ввод в форму


  const handleEditClick = () => {
    const formEl = document.querySelector('form');
    const elements = Array.from(formEl.elements);
    elements.slice(0, 2).forEach((el) => el.disabled = false);

    formEl.elements[0].focus();

    setIsEditOpen(true);

  }
  const handleCancelClick = () => {

    setIsEditOpen(false);
    setName(user.user.name);
    setEmail(user.user.email);
    setEqual(true);
  }
  const handleChangeName = (e) => {
    setName(e.target.value);
    inputValidation(e.target);
    name === user.user.name ? setEqual(false) : setEqual(true);
    changeButtonState(e.target.closest('form'))
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    inputValidation(e.target);
    email === user.user.email ? setEqual(false) : setEqual(true);
    changeButtonState(e.target.closest('form'))
  }
  const handleSubmit = (e) => {

    e.preventDefault();
    Array.from(e.target.elements).forEach(el=>el.disabled=true);
    props.onEditSubmit(name, email);
    setIsEditOpen(false);
    setEqual(true);

  }
// валидация
  const hideError = (input) => {

    setErrEmail('');
    setErrName('');
  }

  const showError = (input) => {

    if(input.name === 'name') {
      setErrName(input.validationMessage);
    }
    if(input.name==='email') {
      setErrEmail(input.validationMessage);
    }

  }

  const inputValidation = (input) => {
    if (input.checkValidity()) {
      hideError(input);
    } else {
      showError(input);
    }
  }

  const changeButtonState = (form) => {

    if (form.checkValidity() && equal) {
      form.elements['submitButton'].disabled = false;
    } else {
      form.elements['submitButton'].disabled = true;
    }
  }


  return (
      <div className={'page'}>
        <Header loggedIn={loggedIn}/>
        <div className={'main'}>
          <main className={'profile'}>
            {isPageLoader && <Preloader/>}
            <div className={'profile__wrap'}>

              <h1 className={'profile__title'}>
                Привет, {name}!
              </h1>
              <form className={'profile__form'} onSubmit={handleSubmit}>
                <div className={'profile__inputWrap'}>
                  <label htmlFor={'name'} className={'profile__inputLabel'}>
                    <span>Имя</span>
                    <input className={'profile__formInput'} type={'text'} id={'name'} placeholder={'имя'}
                           value={name} disabled={!isEditOpen}  name={'name'} required minLength={2} maxLength={30}
                           onChange={handleChangeName}/>

                  </label>
                  <span className={`profile__errorInput profile__errorInput__name ${errName? 'profile__errorInput_active':''}`}>{errName}.</span>
                  <label htmlFor={'email'} className={'profile__inputLabel'}>
                    <span>E-mail</span>
                    <input className={'profile__formInput'} type={'email'} id={'email'} placeholder={'email'}
                           value={email} name={'email'} required onChange={handleChangeEmail}
                           disabled={!isEditOpen}/>

                  </label>
                  <span className={`profile__errorInput profile__errorInput__email  ${errEmail? 'profile__errorInput_active':''}`}>Что-то пошло не так...</span>

                  <button className={`profile__edit profile__edit_submit ${isEditOpen ? "" : "hidden"}`} type={'submit'}
                          name={'submitButton'} disabled={!isEditOpen || equal}>Сохранить
                  </button>
                </div>

              </form>
              <div className={'profile__btnWrap'}>
                <button className={'profile__edit'} type={'button'}
                        onClick={isEditOpen ? handleCancelClick : handleEditClick}>{isEditOpen ? 'Отменить' : 'Редактировать'}</button>

                <Link to={'/'} className={'profile__logOut'} onClick={props.onLogout}>Выйти из аккаунта</Link>

              </div>
            </div>
          </main>
        </div>
      </div>
  )
}

export default Profile;
