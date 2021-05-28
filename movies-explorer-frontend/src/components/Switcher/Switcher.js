import React from "react";
import './Switcher.css';

function Switcher() {

  const [isActive, setIsActive] = React.useState(false);
  const handleChangeCheckbox = () => {
    setIsActive(!isActive);
  }


  return (
      <section className={'switcher'}>
        <button className={`switcher__btn ${isActive ? "switcher__btn_on" : "switcher__btn_off"}`}
                onClick={handleChangeCheckbox} id={'checkShortFilms'}/>
        <label className={'switcher__title'} htmlFor={'checkShortFilms'}>Короткометражки</label>
      </section>
  )

}

export default Switcher;
