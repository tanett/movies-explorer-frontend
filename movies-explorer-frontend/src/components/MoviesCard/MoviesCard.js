import React from "react";
import './MoviesCard.css';
import shot from  '../../images/no-image-2 (1).jpg';

function MoviesCard(props) {
  //let initialSavedState ;//= (window.location.path !== '/saved-movies') ? (props.checkSaving ? props.checkSaving(props.dataMovie) : false) : true;
//   if (window.location.path === '/movies') {
//     initialSavedState = props.checkSaving(props.dataMovie) > -1;
//   }
//   if (window.location.path === '/saved-movies') {
//     initialSavedState = true
//   }
// console.log(initialSavedState);

  const [isSaved, setIsSaved] = React.useState(props.dataMovie.isSaved);


  const handleSaveClick = () => {
    props.onSaveClick(props.dataMovie);
    if (props.path !== '/saved-movies') {
      setIsSaved(!isSaved);
    }

  }
  const handleDeleteClick = () => {
    props.onDelClick(props.dataMovie.movieId);
    setIsSaved(false);
  }
  const timeHour = ~~(props.dataMovie.duration / 60);
  const timeMin = props.dataMovie.duration % 60;
  const imageSrcforSaved = props.dataMovie.thumbnail ||shot;
  const imageSrcforAll = (props.dataMovie.image? `https://api.nomoreparties.co${
      props.dataMovie.image.formats?.thumbnail.url || props.dataMovie.image.formats?.small.url || props.dataMovie?.image.url
  }`: shot)
  return (
      <figure className={'moviesCard'}>
        <a className="moviesCard__poster-wrap" href={props.dataMovie.trailerLink} target={'_blank'}>
          <img className="moviesCard__poster" alt={props.dataMovie.nameRU} src={
            (window.location.path !== '/saved-movies')? imageSrcforAll:imageSrcforSaved} title={props.dataMovie.description}/>
        </a>
        <figcaption className="moviesCard__title ">
          <h2 className="moviesCard__item-name">{props.dataMovie.nameRU}</h2>

          <p className="moviesCard__time">{`${timeHour}ч ${timeMin}м`}</p>

        </figcaption>
        <button className={`moviesCard__Btn  ${isSaved ? props.saveBtnClassName : "moviesCard__Btn_save"}`}
                type="button" title="Сохранить"
                onClick={isSaved ? handleDeleteClick : handleSaveClick}>{isSaved ? "" : "Сохранить"}</button>
      </figure>
  )
}

export default MoviesCard;
