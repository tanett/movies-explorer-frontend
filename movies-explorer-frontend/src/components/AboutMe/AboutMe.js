import React from "react";
import './AboutMe.css';
import Photo from '../../images/imgpreview-min.jpg';

function AboutMe() {
  return (
      <section className='aboutMe'>
        <div className='section__wrap aboutMe__wrap'>
          <h2 className='section__title aboutMe__title'>Студент</h2>
          <article className='aboutMe__card'>
            <div className='aboutMe__wrapCard'>
              <h3 className='aboutMe__cardTitle'>Татьяна</h3>
              <p className='aboutMe__cardSubtitle'>Фронтенд-разработчик</p>
              <p className='aboutMe__cardText'>Я родилась в Алтайском крае, живу в Санкт-Петербурге. Училась на
                инженера.<br/>
                Я люблю слушать музыку, кататься на велосипеде и гулять с семьей.<br/>С 2019 года
                работала в компании «Анкор». <br/>После того, как прошла курс по веб-разработке, начала заниматься
                фриланс-заказами и
                ушла с постоянной работы.</p>

              <ul className='aboutMe__socialLinks'>
                <li className='aboutMe__socialLinksItem'><a href={'https://www.facebook.com/'}
                                                            className='aboutMe__socialLink' target={'_blank'}
                                                            rel="noreferrer">Facebook</a></li>
                <li className='aboutMe__socialLinksItem'><a href={'https://github.com/tanett'}
                                                            className='aboutMe__socialLink' target={'_blank'}
                                                            rel="noreferrer">Github</a></li>
              </ul>
            </div>
            <img className='aboutMe__photo' src={Photo} alt='Татьяна'/>
          </article>
        </div>
      </section>
  )
}

export default AboutMe;
