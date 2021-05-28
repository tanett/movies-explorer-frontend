import {
  Link
} from "react-router-dom";

import React from "react";
import './Profile.css';

function Profile() {
  const inputLists = Array.from(document.querySelectorAll('input'));
  const handleEditClick = () => {
    inputLists.forEach((input) => input.disabled = false);
    console.log(inputLists);
    inputLists[0].focus();
  }

  return (
      <main className={'profile'}>
        <div className={'profile__wrap'}>

          <h1 className={'profile__title'}>
            Привет, {"user.name"}!
          </h1>
          <form className={'profile__form'}>
            <div className={'profile__inputWrap'}>
              <label for={'name'} className={'profile__inputLabel'}>
                Имя
                <input className={'profile__formInput'} type={'text'} id={'name'} placeholder={'user.name'} disabled/>
              </label>
              <span className={'profile__errorInput profile__errorInput__name'}>Что-то пошло не так...</span>
              <label htmlFor={'email'} className={'profile__inputLabel'}>
                E-mail
                <input className={'profile__formInput'} type={'email'} id={'email'} placeholder={'user.email'}
                       disabled/>
              </label>
              <span className={'profile__errorInput profile__errorInput__email '}>Что-то пошло не так...</span>

            </div>

          </form>
          <div className={'profile__btnWrap'}>
            <button className={'profile__edit'} type={'button'} onClick={handleEditClick}>Редактировать</button>

            <Link to={'/'} className={'profile__logOut'}>Выйти из аккаунта</Link>

          </div>
        </div>
      </main>
  )
}

export default Profile;
