import React from "react";
import './Portfolio.css';


function AboutMe() {
  return (
      <section className='portfolio'>
        <div className='section__wrap portfolio__wrap'>
          <h2 className='section__title portfolio__title'>Портфолио</h2>
          <ul className='portfolio__links'>
            <li className='portfolio__linksItem'><a href={'https://tanett.github.io/how-to-learn/'}
                                                    className='portfolio__link' target={'_blank'} rel="noreferrer">Статичный
              сайт</a></li>
            <li className='portfolio__linksItem'><a href={'https://tanett.github.io/russian-travel/'}
                                                    className='portfolio__link' target={'_blank'} rel="noreferrer">Адаптивный
              сайт</a></li>
            <li className='portfolio__linksItem'><a href={'https://tanett.github.io/react-mesto-auth/'}
                                                    className='portfolio__link' target={'_blank'} rel="noreferrer">Одностраничное
              приложение</a></li>
          </ul>
        </div>
      </section>
  )
}

export default AboutMe;
