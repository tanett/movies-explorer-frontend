import {
  Switch, Route, useParams, Link, NavLink
} from "react-router-dom";

import React from "react";
import './Portfolio.css';


function AboutMe(props) {
  return (
      <section className='portfolio'>
        <div className='section__wrap portfolio__wrap'>
          <h2 className='section__title portfolio__title'>Портфолио</h2>


              <ul className='portfolio__links'>
                <li className='portfolio__linksItem'><Link  to={'#'} className='portfolio__link' >Статичный сайт</Link></li>
                <li className='portfolio__linksItem'><Link to={'#'} className='portfolio__link' >Адаптивный сайт</Link></li>
                <li className='portfolio__linksItem'><Link to={'#'} className='portfolio__link' >Одностраничное приложение</Link></li>
              </ul>



        </div>
      </section>
  )
}

export default AboutMe;
