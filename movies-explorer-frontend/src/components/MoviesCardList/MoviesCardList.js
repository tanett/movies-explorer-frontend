import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const handleClickMore = () => {
    console.log('i will show more films')
  }
  const saveBtnClassName = (window.location.pathname === '/saved-movies') ? "moviesCard__Btn_delete" : "moviesCard__Btn_active";

  return (
      <>
        <section className={'moviesCardList'}>
          {props.items.slice(0, 12).map((movie) => {
            return (
                <MoviesCard dataMovie={movie} key={movie.id} saveBtnClassName={saveBtnClassName}
                            onSaveClick={props.onDelMovieClick}/>
            )
          })}
        </section>
        {(props.items.length > 12) &&
        <button className={'moviesCardList__moreCard'} type={'button'} onClick={handleClickMore}>Ещё</button>}
      </>
  )
}

export default MoviesCardList;
