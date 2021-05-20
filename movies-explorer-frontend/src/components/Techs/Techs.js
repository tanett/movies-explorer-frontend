import {
  Switch, Route, useParams, Link, NavLink
} from "react-router-dom";

import React from "react";
import './Techs.css';

function Techs(props) {
  return (
      <section className='techs'>
        <div className='section__wrap techs__wrap'>
          <h2 className='section__title techs__title'>Технологии</h2>
          <article className='techs__card'>
            <h3 className='techs__cardTitle'>7 технологий</h3>
            <p className='techs__cardText'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном
              проекте.</p>
          </article>
          <ul className='techs__listTechs'>
            <li className='techs__listTechsItem'>HTML</li>
            <li className='techs__listTechsItem'>CSS</li>
            <li className='techs__listTechsItem'>JS</li>
            <li className='techs__listTechsItem'>React</li>
            <li className='techs__listTechsItem'>Git</li>
            <li className='techs__listTechsItem'>Express.js</li>
            <li className='techs__listTechsItem'>mongoDB</li>
          </ul>
        </div>
      </section>
  )
}

export default Techs;
