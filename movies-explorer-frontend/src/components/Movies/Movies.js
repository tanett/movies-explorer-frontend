import React, {useCallback, useContext, useState} from "react";
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
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [showedFilms, setShowedFilms] = React.useState([...searchRes]);
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
          setFilteredSearch(prevSearch.searchRes.filter(film => film.duration <= 40));
          setIsShort(false);
          setShowedFilms([...prevSearch.searchRes])
        }

      }, []
  )

  const handleSearchSubmit = (searchString) => {
    let resRU = movies.filter((item) => item.nameRU.toLowerCase().includes(searchString.toLowerCase()));
    setSearchRes([...resRU]);
    localStorage.setItem('searchRes', JSON.stringify({searchQuery: searchString, searchRes: [...resRU]}));

    console.log(movies);
    console.log(searchString);
    console.log(resRU);
    console.log(filteredSearch);
    setSearchCount(searchCount + 1);

    setShowedFilms([...resRU]);
    checkFilter();

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
      <section className={'movies'}>
        <div className={'movies__wrap'}>
          <SearchForm onSubmitSearch={handleSearchSubmit} searchQuery={searchQuery} onShortFilm={onShortFilterClick}
                      isShort={isShort}/>

          <SearchResult searchRes={searchRes} searchCount={searchCount}>
            {showedFilms.length > 0 &&
            <MoviesCardList items={showedFilms}
                            savedFilms={savedFilms}
                            onDelMovieClick={handleDeleteSavedFilms}
                            onSaveMovieClick={handleSaveClick} checkSaving={checkSaving}/>}
          </SearchResult>
        </div>
      </section>
  )
}

export default Movies;
