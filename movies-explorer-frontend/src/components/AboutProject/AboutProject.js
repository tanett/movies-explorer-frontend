import React from "react";
import './AboutProject.css';

function AboutProject(props) {

  return (
      <section className='aboutProject' id={'about'}>
        <div className='section__wrap aboutProject__wrap'>
          <h2 className='section__title aboutProject__title'>О проекте</h2>
          <div className='aboutProject__articleWrap'>
            <article className='aboutProject__card'>
              <h3 className='aboutProject__cardTitle'>Дипломный проект включал 5 этапов</h3>
              <p className='aboutProject__cardText'>Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.</p>

            </article>
            <article className='aboutProject__card'>
              <h3 className='aboutProject__cardTitle'>На выполнение диплома ушло 5 недель</h3>
              <p className='aboutProject__cardText'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.</p>

            </article>
          </div>
          <div className='aboutProject__timeline'>
            <span className='aboutProject__timelineZone aboutProject__timelineZone_green'>1 неделя</span>
            <span className='aboutProject__timelineZone aboutProject__timelineZone_grey'>4 недели</span>
            <span className='aboutProject__timelineZone aboutProject__timelineZone_timelineName'>Back-end</span>
            <span className='aboutProject__timelineZone aboutProject__timelineZone_timelineName'>Front-end</span>
          </div>
        </div>
      </section>
  )

}

export default AboutProject;
