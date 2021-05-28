import React from "react";
import './SavedMovies.css';
import {savedMovies} from "../../utils/constants";
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from "../SearchForm/SearchForm";
import Switcher from "../Switcher/Switcher";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
  const [sMovie, setSmovie] = React.useState(savedMovies);
  const handleDeleteClick = (movie) => {
    setSmovie(sMovie.filter(m => movie.movieId !== m.movieId));
  }


  return (
      <main className={'movies'}>
        <div className={'movies__wrap'}>
          <SearchForm/>
          <Switcher/>
          <MoviesCardList items={sMovie} onDelMovieClick={handleDeleteClick}/>
        </div>
      </main>

  )
}

export default SavedMovies;
