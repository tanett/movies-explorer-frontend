import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const [numbAddedFilms, setNumbAddedFilms] = React.useState(3);
  const [countShowedFilms, setCountShowedFilms] = React.useState(12);
  React.useEffect(
      () => {
        const handleResize=()=> {
          setTimeout(() => {
            const width = document.documentElement.clientWidth;
            if (width > 768) {setNumbAddedFilms(4)} else {setNumbAddedFilms(2)}
          }, 500)
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

  const handleClickMore = () => {
    if (countShowedFilms + numbAddedFilms > props.items.length) {
      setCountShowedFilms(props.items.length);
    } else setCountShowedFilms(countShowedFilms + numbAddedFilms);
    console.log('i will show more films')
  }
  const saveBtnClassName = (window.location.pathname === '/saved-movies') ? "moviesCard__Btn_delete" : "moviesCard__Btn_active";

  return (
      <>
        <section className={'moviesCardList'}>
          {props.items.slice(0, countShowedFilms).map((movie) => (
                  <MoviesCard dataMovie={movie} key={movie._id} saveBtnClassName={saveBtnClassName}
                              onDelClick={props.onDelMovieClick} checkSaving={props.checkSaving}
                              onSaveClick={props.onSaveMovieClick}/>
              )
          )}
        </section>
        {(props.items.length > 12) &&
        <button className={'moviesCardList__moreCard'} type={'button'} onClick={handleClickMore}>Ещё</button>}
      </>
  )
}

export default MoviesCardList;
