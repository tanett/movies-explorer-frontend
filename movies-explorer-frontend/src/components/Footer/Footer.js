

import React from "react";
import './Footer.css';

function Footer(props) {
  return (
      <footer className={'footer'}>
        <div className={'footer__wrap section__wrap'}>
          <h4 className={'footer__title'}>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
          <div className={'footer__flexWrap'}>
            <p className={'footer__copy'}>&copy;2021</p>
            <ul className='footer__links'>
              <li className={'footer__linkItem'}><a href='#' className={'footer__link'} rel='noreferrer'>Яндекс.Практикум</a></li>
              <li className={'footer__linkItem'}><a href={'#'} className={'footer__link'} rel='noreferrer'>Github</a></li>
              <li className={'footer__linkItem'}><a href={'#'} className={'footer__link'} rel='noreferrer'>Facebook</a></li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer;
