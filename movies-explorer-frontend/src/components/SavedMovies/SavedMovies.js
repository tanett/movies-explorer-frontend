import React from "react";
import './SavedMovies.css';
import {savedMovies} from "../../utils/constants";
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from "../SearchForm/SearchForm";
import Switcher from "../Switcher/Switcher";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";
import SearchResult from "../SearchResult/SearchResult";

function SavedMovies() {
  const [sMovie, setSmovie] = React.useState([]);
  const [searchRes, setSearchRes] = React.useState([]);
  const [searchCount, setSearchCount] = React.useState(0);
React.useEffect(
    ()=>{
      mainApi.getSavedFilms().then(res => {
        if(res){
          setSmovie(res)
        }
      }).catch(err => console.log(err));
    }, []
)
  const handleSearchSubmit = (searchString) => {

    let resRU = sMovie.filter((item) => item.nameRU.includes(searchString));

    setSearchRes([...resRU]);
    console.log(sMovie);
    console.log(searchString);
    console.log(resRU);
    setSearchCount(searchCount + 1);
  }

  const handleDeleteClick = (movie) => {
    console.log('delete film');
    mainApi.deleteFilm(movie.movieId).then(res => {
      setSmovie(sMovie.filter((film) => film.movieId !== movie.movieId))
    })
        .catch(err => console.log(err))
  }

  return (
      <main className={'movies'}>
        <div className={'movies__wrap'}>
          <SearchForm onSubmitSearch={handleSearchSubmit}/>
          <Switcher/>
          {sMovie.length===0 && <h2>Вы еще не добавили не одного фильма</h2>}
          {searchCount > 0 && <SearchResult searchRes={searchRes} searchCount={searchCount}>
            {searchRes.length > 0 &&
            <MoviesCardList items={searchRes} onDelMovieClick={handleDeleteClick}
            />}
          </SearchResult>}
          {searchCount===0 &&  <MoviesCardList items={sMovie} onDelMovieClick={handleDeleteClick}
          />}
        </div>
      </main>

  )
}

export default SavedMovies;
