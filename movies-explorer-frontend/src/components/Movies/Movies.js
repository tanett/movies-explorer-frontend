import React from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Switcher from "../Switcher/Switcher";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {movies} from "../../utils/constants";

function Movies() {
const handleSaveClick = (movie) => {
  console.log('save');
}

  return (
      <section className={'movies'}>
        <div className={'movies__wrap'}>
          <SearchForm/>
          <Switcher/>
          <MoviesCardList items={movies} onDelMovieClick = {handleSaveClick}/>
        </div>
      </section>
  )
}

export default Movies;
