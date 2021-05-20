import {
  Switch, Route, useParams, Link, NavLink
} from "react-router-dom";

import React from "react";
import './Promo.css';

function Promo(props) {

  return (
      <section className='promo'>
        <div className='section__wrap promo__wrap'>
          <div className={'promo__wrapTitle'}>
            <h1 className='promo__title'>Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.</h1>
            <p className={'promo__subtitle'}>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <Link to='#' className='promo__btn'>Узнать&nbsp;больше</Link>
          </div>
          <div className={'promo__pict'} alt='Цифровой мир'></div>
        </div>
      </section>
  )
}

export default Promo;
