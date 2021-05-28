import React from "react";
import './MoviesCard.css';

function MoviesCard(props) {
  const [isSaved, setIsSaved] = React.useState(!!props.dataMovie.owner);
  const handleSaveClick = () => {
    props.onSaveClick(props.dataMovie);
    if (window.location.path !== '/saved-movies') {
      setIsSaved(!isSaved);
    }
  }


  return (
      <figure className={'moviesCard'}>
        <div className="moviesCard__poster-wrap">
          <img className="moviesCard__poster" alt={props.dataMovie.nameRU} src={props.dataMovie.image}/>
        </div>
        <figcaption className="moviesCard__title ">
          <h2 className="moviesCard__item-name">{props.dataMovie.nameRU}</h2>

          <p className="moviesCard__time">{props.dataMovie.duration}</p>

        </figcaption>
        <button className={`moviesCard__Btn  ${isSaved ? props.saveBtnClassName : "moviesCard__Btn_save"}`}
                type="button" title="Сохранить"
                onClick={handleSaveClick}>{isSaved ? "" : "Сохранить"}</button>
      </figure>
  )
}

export default MoviesCard;
