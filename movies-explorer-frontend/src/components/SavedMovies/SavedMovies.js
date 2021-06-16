import React, {useState} from "react";
import './SavedMovies.css';

import SearchForm from "../SearchForm/SearchForm";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";
import SearchResult from "../SearchResult/SearchResult";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import {LoggedInContext} from "../../context/LoggedInContext";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const user = React.useContext(CurrentUserContext);
  const loggedIn = React.useContext(LoggedInContext);
  const [sMovie, setSmovie] = React.useState([]);
  const [searchRes, setSearchRes] = React.useState([]);
  const [searchCount, setSearchCount] = React.useState(0);
  const [isShort, setIsShort] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [showedFilms, setShowedFilms] = React.useState([]);
  const [isPageLoader, setIsPageLoader] = React.useState(false);

  React.useEffect(
      () => {
        const userId = JSON.parse(localStorage.getItem('user')).user._id;
        setIsPageLoader(true);
        mainApi.getSavedFilms().then(res => {
          if (res) {
            const myFilms = res.filter(film => film.owner === userId);
            setSmovie(myFilms);
            setSearchRes(myFilms);
            setShowedFilms(myFilms);
            return myFilms
          } else {
            props.tooltip("Что-то пошло не так")
          }
        })

            .catch(err => {
              props.tooltip(err.message)
              console.log(err)
            }).finally(() => setIsPageLoader(false));;
      }, []
  )

  const handleDeleteClick = (movie) => {
    mainApi.deleteFilm(movie._id)
        .then((res) => {
          const newSF = sMovie.filter((film) => film._id !== movie._id);
          setShowedFilms(newSF);
          setSmovie(newSF);
          props.tooltip(res.message);
        })
        .catch(err => {
          props.tooltip("Что-то пошло не так");
          console.log(err)
        })
  }

  // поиск и фильтрация
  const handleSearchSubmit = (searchString) => {
    setIsShort(false);
    let resRU = sMovie.filter((item) => item.nameRU.toLowerCase()
        .includes(searchString.toLowerCase()));
      let resEn = sMovie.filter((item) => {
      if (item.nameEN !== null) {
        return item.nameEN.toLowerCase()
            .includes(searchString.toLowerCase())
      }
    });
    let res = new Set([...resRU, ...resEn]);
    setSearchRes([...res]);
    setSearchCount(searchCount + 1);
    setShowedFilms([...res]);
    checkFilter();

  };

  const checkFilter = () => {
    if (isShort) {
      const filter =showedFilms.filter(film => film.duration <= 40);
      setFilteredSearch([...filter]);
      setShowedFilms([...filter]);
    } else {
      setShowedFilms([...searchRes]);
    }
  };

  const onShortFilterClick = () => {
    setIsShort(!isShort);
    checkFilter();

  };
  React.useEffect(
      () => {
        checkFilter();
      }, [searchRes, isShort]
  );

  return (
      <div className={'page'}>
        <Header loggedIn={loggedIn}/>
        <div className={'main'}>
          <main className={'movies'}>
            <div className={'movies__wrap'}>
              <SearchForm onSubmitSearch={handleSearchSubmit} searchQuery={''} onShortFilm={onShortFilterClick}
                          isShort={isShort}/>
              {isPageLoader && <Preloader/>}
              {sMovie.length === 0 && <h2 className={'searchResult__title'}>Вы еще не добавили не одного фильма</h2>}
              {searchCount > 0 && <SearchResult searchRes={showedFilms} searchCount={searchCount}>
                {searchRes.length > 0 &&
                <MoviesCardList items={showedFilms} onDelMovieClick={handleDeleteClick} path={'/saved-movies'}
                />}
              </SearchResult>}
              {searchCount === 0 && <MoviesCardList items={showedFilms} onDelMovieClick={handleDeleteClick}
              />}
            </div>
          </main>
        </div>
        <Footer/>
      </div>
  )
}

export default SavedMovies;
