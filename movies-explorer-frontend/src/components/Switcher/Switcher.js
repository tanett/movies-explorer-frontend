import React from "react";
import './Switcher.css';

function Switcher(props) {


  const handleChangeCheckbox = () => {
    props.onShortFilm();
  }


  return (
      <section className={'switcher'}>
        <button className={`switcher__btn ${props.isActive ? "switcher__btn_on" : "switcher__btn_off"}`}
                onClick={handleChangeCheckbox} id={'checkShortFilms'}/>
        <label className={'switcher__title'} htmlFor={'checkShortFilms'}>Короткометражки</label>
      </section>
  )

}

export default Switcher;
