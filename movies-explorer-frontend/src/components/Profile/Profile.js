import {
  Link
} from "react-router-dom";

import React from "react";
import './Profile.css';
import mainApi from "../../utils/MainApi";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function Profile(props) {
  const user = React.useContext(CurrentUserContext);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isPageLoader, setIsPageLoader] = React.useState(false);
  const [name, setName] = React.useState(user.user.name);
  const [email, setEmail] = React.useState(user.user.email);
  const formEl = document.querySelector('form');
  const elements = Array.from(formEl.elements);
  console.log(elements);
  const handleEditClick = () => {
    elements.forEach((el) => el.disabled = false);

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

  }
  const handleChangeName = (e) => {
    setName(e.target.value);
    inputValidation(e.target);
    changeButtonState(e.target.closest('form'))
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    inputValidation(e.target);
    changeButtonState(e.target.closest('form'))
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    mainApi.editUserInfo({name, email})
        .then((res) => {
          setName(res.user.name);
          setEmail(res.user.email);

          setIsEditOpen(false);
        })
        .then(() => {
          //setBtnLoader('Сохранить')
          console.log('saved')
        })
        .catch((err) => console.log(err));
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
    if (form.checkValidity()) {
      form.elements['submitButton'].disabled = false;
    } else {
      form.elements['submitButton'].disabled = true;
    }
  }
  React.useEffect(
      () => {
        setIsPageLoader(true);
              // setEmail(user.email);
              // setName(user.name);
              setTimeout(()=>setIsPageLoader(false), 1000)
            }
      , [isEditOpen]
  )
  console.log(name);
  return (
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
              {isEditOpen &&
              <button className={'profile__edit profile__edit_submit'} type={'submit'}
                      name={'submitButton'}>Сохранить</button>}
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
