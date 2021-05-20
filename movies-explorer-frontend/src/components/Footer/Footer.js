import {
  Switch, Route, useParams, Link, NavLink
} from "react-router-dom";

import React from "react";
import './Footer.css';

function Footer(props) {
  return (
      <footer className={'footer'}>
        <div className={'footer__wrap'}>
  <h4 className={'footer__title'}>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
          <p className={'footer__copy'}>&copy;2021</p>
          <ul className='footer__links'>
            <li className={'footer__linkItem'}><Link to={'#'} className={'footer__link'}>Яндекс.Практикум</Link></li>
            <li className={'footer__linkItem'}><Link to={'#'} className={'footer__link'}>Github</Link></li>
            <li className={'footer__linkItem'}><Link to={'#'} className={'footer__link'}>Facebook</Link></li>

          </ul>
        </div>
      </footer>
  )
}

export default Footer;
