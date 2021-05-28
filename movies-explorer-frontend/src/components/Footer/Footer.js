import React from "react";
import './Footer.css';

function Footer() {
  return (
      <footer className={'footer'}>
        <div className={'footer__wrap section__wrap'}>
          <h4 className={'footer__title'}>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
          <div className={'footer__flexWrap'}>
            <p className={'footer__copy'}>&copy;2021</p>
            <ul className='footer__links'>
              <li className={'footer__linkItem'}><a href={'https://praktikum.yandex.ru/'} className={'footer__link'}
                                                    rel='noreferrer' target={'_blank'}>Яндекс.Практикум</a></li>
              <li className={'footer__linkItem'}><a href={'https://github.com/tanett'} className={'footer__link'}
                                                    rel='noreferrer' target={'_blank'}>Github</a></li>
              <li className={'footer__linkItem'}><a href={'https://www.facebook.com/'} className={'footer__link'}
                                                    rel='noreferrer' target={'_blank'}>Facebook</a></li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer;
