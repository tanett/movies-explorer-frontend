import React, {useContext, useState} from "react";
import {
  Switch, Route, useHistory, Redirect
} from "react-router-dom";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Switcher from "../Switcher/Switcher";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import {movies} from "../../utils/constants";
import SearchResult from "../SearchResult/SearchResult";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";
import {LoggedInContext} from "../../context/LoggedInContext";


function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedFilms, setSavedFilms] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [isShort, setIsShort] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState([...searchRes]);
  const history = useHistory();
  const isLogged = React.useContext(LoggedInContext);

  React.useEffect(
      () => {

        Promise.all([moviesApi.getFilms(), mainApi.getSavedFilms()])
            .then(data => {
              setMovies(data[0]);
              setSavedFilms(data[1])
            }).catch(err => console.log(err));
        if (localStorage.getItem('searchRes')) {
          const prevSearch = JSON.parse(localStorage.getItem('searchRes'));
          console.log(prevSearch);
          setSearchRes(prevSearch.searchRes);
          setSearchQuery(prevSearch.searchQuery);
        }

      }, []
  )

  const handleSearchSubmit = (searchString) => {
    let resRU = movies.filter((item) => item.nameRU.includes(searchString));
    setSearchRes([...resRU]);
    localStorage.setItem('searchRes', JSON.stringify({searchQuery: searchString, searchRes: [...resRU]}));

    console.log(movies);
    console.log(searchString);
    console.log(resRU);
    console.log(filteredSearch);
    setSearchCount(searchCount + 1);
  }
  const handleSaveClick = (movie) => {
    console.log('save');
    mainApi.saveFilm(movie).then(res => res.owner ? setSavedFilms(...savedFilms, res) : new Error("Invalid Response"))
        .catch(err => console.log(err))/// дописать логику сохранения и добавить логику удаления из сохраненных
  }
  const handleDeleteSavedFilms = (movie) => {
    console.log('delete film');
    mainApi.deleteFilm(movie.movieId).then(res => {
      setSavedFilms(savedFilms.filter((film) => film.movieId !== movie.movieId))
    })
        .catch(err => console.log(err))
  }
  const checkSaving = (movie) => {
    return (savedFilms.filter((film) => film.movieId === movie.movieId).length !== 0)
  }
  const shortFilter = React.useCallback(() => {
    searchRes.filter(film => +film.duration <= 40);
  }, [searchRes]);

  const onShortFilterClick = () => {
    setIsShort(!isShort);
    if (isShort) {
      setFilteredSearch(() => shortFilter())
    }
  }

  return (
      <section className={'movies'}>
        <div className={'movies__wrap'}>
          <SearchForm onSubmitSearch={handleSearchSubmit} searchQuery = {searchQuery}/>
          <Switcher onShortFilm={onShortFilterClick} isActive={isShort}/>
          <SearchResult searchRes={searchRes} searchCount={searchCount}>
            {searchRes.length > 0 &&
            <MoviesCardList items={isShort ? filteredSearch : searchRes}
                            savedFilms={savedFilms}
                            onDelMovieClick={handleDeleteSavedFilms}
                            onSaveMovieClick={handleSaveClick} checkSaving={checkSaving}/>}
          </SearchResult>
        </div>
      </section>
  )
}

export default Movies;
