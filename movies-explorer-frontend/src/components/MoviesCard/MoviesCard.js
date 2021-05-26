import {
  Link
} from "react-router-dom";

import React from "react";
import './MoviesCard.css';

function MoviesCard(props) {

  const handleDeleteClick = () => {
    console.log('delete movie')
  }
  return (
<figure className={'moviesCard'}>
  <div className="moviesCard__poster-wrap">
    <img className="moviesCard__poster" alt={props.dataCard.name} src={props.dataCard.link}/>
  </div>
  <figcaption className="moviesCard__title ">
    <h2 className="moviesCard__item-name">{props.dataCard.name}</h2>
    <div className="moviesCard__duration-container">
      <span className="moviesCard__time">{props.dataCard.time}</span>
    </div>
  </figcaption>
  <button className={'moviesCard__deleteBtn'} type="button" title="Удалить"
          onClick={handleDeleteClick}></button>
</figure>
  )
}
export default MoviesCard;
