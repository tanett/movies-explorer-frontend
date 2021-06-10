import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList(props) {

  const [numbAddedFilms, setNumbAddedFilms] = React.useState(null);
  const [countShowedFilms, setCountShowedFilms] = React.useState(null);


  React.useEffect(
      () => {
        const width = document.documentElement.clientWidth;
        if (width > 768) {
          setNumbAddedFilms(3);
          setCountShowedFilms(12)
        } else if (width >= 480) {
          setNumbAddedFilms(2);
          setCountShowedFilms(8)
        } else {
          setNumbAddedFilms(5);
          setCountShowedFilms(5)
        }
        console.log(width);
        const handleResize = () => {
          setTimeout(() => {
            const w = document.documentElement.clientWidth;
            if (w > 1210) {
              setNumbAddedFilms(3);
              setCountShowedFilms(12)
            } else if (w >= 600) {
              setNumbAddedFilms(2);
              setCountShowedFilms(8)
            } else {
              setNumbAddedFilms(5);
              setCountShowedFilms(5)
            }
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
                  <MoviesCard dataMovie={movie} key={movie.id || movie._id} saveBtnClassName={saveBtnClassName}
                              onDelClick={props.onDelMovieClick}
                              onSaveClick={props.onSaveMovieClick} path={props.path}/>
              )
          )}
        </section>
        {(props.items.length > countShowedFilms) &&
        <button className={'moviesCardList__moreCard'} type={'button'} onClick={handleClickMore}>Ещё</button>}
      </>
  )
}

export default MoviesCardList;
