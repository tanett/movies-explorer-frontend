import {
  Link
} from "react-router-dom";

import React from "react";
import './Profile.css';

import {CurrentUserContext} from "../../context/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function Profile(props) {
  const user = React.useContext(CurrentUserContext);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isPageLoader, setIsPageLoader] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [equal, setEqual] = React.useState(true);
  const formEl = document.querySelector('form');
  const elements = Array.from(formEl.elements);

  const handleEditClick = () => {
    elements.slice(0, 2).forEach((el) => el.disabled = false);

    formEl.elements[0].focus();

    setIsEditOpen(true);

  }
  const handleCancelClick = () => {
    elements.forEach((el) => {
      el.disabled = true;
      if (el.name === 'name' || el.name === 'email') {
        hideError(el)
      }
    });
    setIsEditOpen(false);
    setName(user.user.name);
    setEmail(user.user.email);
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
    props.onEditSubmit(name, email);
    setIsEditOpen(false);

  }

  const hideError = (input) => {
    formEl.querySelector(`.profile__errorInput__${input.name}`).classList.remove(`profile__errorInput_active`);
  }
  const showError = (input) => {
    formEl.querySelector(`.profile__errorInput__${input.name}`).classList.add(`profile__errorInput_active`);
    formEl.querySelector(`.profile__errorInput__${input.name}`).textContent = input.validationMessage || "Что-то пошло не так";
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
  React.useEffect(
      () => {
        setIsPageLoader(true);
        setEmail(user.user.email);
        setName(user.user.name);
        setTimeout(() => setIsPageLoader(false), 1000)
      }
      , [user]
  )
  console.log(name);
  return (
      <main className={'profile'}>
        {isPageLoader && <Preloader/>}
        <div className={'profile__wrap'}>

          <h1 className={'profile__title'}>
            Привет, {name}!
          </h1>
          <form className={'profile__form'} onSubmit={handleSubmit} >
            <div className={'profile__inputWrap'}>
              <label htmlFor={'name'} className={'profile__inputLabel'}>
                <span>Имя</span>
                <input className={'profile__formInput'} type={'text'} id={'name'} placeholder={'имя'}
                       value={name} disabled name={'name'} required minLength={2} maxLength={30}
                       onChange={handleChangeName}/>

              </label>
              <span className={'profile__errorInput profile__errorInput__name'}>Что-то пошло не так...</span>
              <label htmlFor={'email'} className={'profile__inputLabel'}>
                <span>E-mail</span>
                <input className={'profile__formInput'} type={'email'} id={'email'} placeholder={'email'}
                       value={email} name={'email'} required onChange={handleChangeEmail}
                       disabled/>

              </label>
              <span className={'profile__errorInput profile__errorInput__email '}>Что-то пошло не так...</span>

              <button className={`profile__edit profile__edit_submit ${isEditOpen ? "" : "hidden"}`} type={'submit'}
                      name={'submitButton'} disabled>Сохранить
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
  )
}

export default Profile;
