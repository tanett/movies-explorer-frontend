import React, {useState} from "react";
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
  const [isShort, setIsShort] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [showedFilms, setShowedFilms] = React.useState([...searchRes]);

  React.useEffect(
      () => {
        mainApi.getSavedFilms().then(res => {
          if (res) {
            setSmovie(res)
          }
        }).catch(err => console.log(err));
      }, []
  )

  const handleDeleteClick = (movie) => {
    mainApi.deleteFilm(movie._id).then(res => {
      setSmovie(sMovie.filter((film) => film.movieId !== movie.movieId));

    })
        .catch(err => console.log(err))
  }
  // search
  const handleSearchSubmit = (searchString) => {
    let resRU = sMovie.filter((item) => item.nameRU.toLowerCase().includes(searchString.toLowerCase()));
    setSearchRes([...resRU]);
    localStorage.setItem('searchRes', JSON.stringify({searchQuery: searchString, searchRes: [...resRU]}));

    console.log(sMovie);
    console.log(searchString);
    console.log(resRU);
    console.log(filteredSearch);
    setSearchCount(searchCount + 1);

    setShowedFilms([...resRU]);
    checkFilter();

  }


  const checkFilter = () => {
    if (isShort) {
      setFilteredSearch(searchRes.filter(film => film.duration <= 40));
      setShowedFilms([...filteredSearch]);
    } else {
      setShowedFilms([...searchRes]);
    }
  }
  const onShortFilterClick = () => {
    setIsShort(!isShort);
    checkFilter();
    console.log(showedFilms)
  };
  React.useEffect(
      ()=>{
        checkFilter()
      },[searchRes, isShort]
  )

  return (
      <main className={'movies'}>
        <div className={'movies__wrap'}>
          <SearchForm onSubmitSearch={handleSearchSubmit} searchQuery={''} onShortFilm={onShortFilterClick}
                      isShort={isShort}/>
          {sMovie.length === 0 && <h2 className={'searchResult__title'}>Вы еще не добавили не одного фильма</h2>}
          {searchCount > 0 && <SearchResult searchRes={searchRes} searchCount={searchCount}>
            {searchRes.length > 0 &&
            <MoviesCardList items={searchRes} onDelMovieClick={handleDeleteClick} path = {'/saved-movies'}
            />}
          </SearchResult>}
          {searchCount === 0 && <MoviesCardList items={sMovie} onDelMovieClick={handleDeleteClick}
          />}
        </div>
      </main>

  )
}

export default SavedMovies;
