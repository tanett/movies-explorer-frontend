import React from "react";
import "./MoviesCard.css";
import shot from "../../images/no-image-2 (1).jpg";

function MoviesCard(props) {


  const [isSave, setIsSave] = React.useState('');
  const [srcImg, setSrcImg] = React.useState("");

  React.useEffect(

      () => {

        if (props.path === "/movies") {
          setSrcImg(props.dataMovie.image ? `https://api.nomoreparties.co${
                  props.dataMovie.image.formats?.thumbnail.url || props.dataMovie.image.formats?.small.url
              }` || props.dataMovie?.image : shot);
          setIsSave(props.dataMovie.isSaved);
        } else {
          setSrcImg(props.dataMovie.thumbnail || shot);
          setIsSave(true);
        }

      }, []
  );

  const handleSaveClick = () => {

     props.onSaveClick(props.dataMovie);
     if (props.path !== "/saved-movies" ) {
       setIsSave(true);
     }
    setIsSave(!isSave);
  };
  const handleDeleteClick = () => {
    props.onDelClick(props.dataMovie);
    setIsSave(!isSave);
  };

  const timeHour = ~~(props.dataMovie.duration / 60);
  const timeMin = props.dataMovie.duration % 60;


  return (
      <figure className={"moviesCard"}>
        <a className="moviesCard__poster-wrap" href={props.dataMovie.trailerLink} target={"_blank"} rel="noreferrer">
          <img className="moviesCard__poster" alt={props.dataMovie.nameRU} src={srcImg}
               title={props.dataMovie.description}/>
        </a>
        <figcaption className="moviesCard__title ">
          <h2 className="moviesCard__item-name"
              onClick={() => console.log(props.dataMovie)}>{props.dataMovie.nameRU}</h2>

          <p className="moviesCard__time">{`${timeHour}ч ${timeMin}м`}</p>

        </figcaption>
        <button
            className={`moviesCard__Btn  ${(props.path === '/movies')? (isSave? "moviesCard__Btn_active":"moviesCard__Btn_save"):"moviesCard__Btn_delete"}`}
            type="button" title={isSave ? "Удалить" : "Сохранить"}
            onClick={isSave ? handleDeleteClick : handleSaveClick}>{isSave ? "" : "Сохранить"}</button>
      </figure>
  );
}

export default MoviesCard;
