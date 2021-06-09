import React, { useState } from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";

import SearchResult from "../SearchResult/SearchResult";
import mainApi from "../../utils/MainApi";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [updateMovies, setUpdateMovies] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedFilms, setSavedFilms] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [isShort, setIsShort] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [showedFilms, setShowedFilms] = React.useState([...searchRes]);
  React.useEffect(
    () => {

      Promise.all([moviesApi.getFilms(), mainApi.getSavedFilms()])
        .then(data => {
          // setMovies(data[0]);
          setSavedFilms(data[1]);
          return data[0];
        })

        .then(res => {
          res.forEach(film => {
            (savedFilms.findIndex((movie) => movie.movieId === film.id) > -1) ? film.isSaved = true : film.isSaved = false;

            return film;
          });
          setUpdateMovies(res);

        })
        .catch(err => console.log(err));

      if (localStorage.getItem("searchRes")) {
        const prevSearch = JSON.parse(localStorage.getItem("searchRes"));
        console.log(prevSearch);
        setSearchRes(prevSearch.searchRes);
        setSearchQuery(prevSearch.searchQuery);
        setFilteredSearch(prevSearch.searchRes.filter(film => film.duration <= 40));
        setIsShort(false);
        setShowedFilms([...prevSearch.searchRes]);
      }
    }, []
  );

// Сохранение и удаление
  const handleSaveClick = (movie) => {

    mainApi.saveFilm(movie)
      .then(res => {
        if (res.owner) {
          setSavedFilms([...savedFilms, res]);
          movie.isSaved = true;
        } else new Error("Invalid Response");
      })

      .catch(err => console.log(err));
setUpdateMovies( [...updateMovies])

  };
  const handleDeleteSavedFilms = (item) => {
    const savedFilm = savedFilms.find(film => film.movieId = item.id);

    console.log(savedFilm);
    mainApi.deleteFilm(savedFilm._id)
      .then(res => {

        setSavedFilms(savedFilms.filter((film) => film.movieId !== item.id));
        updateMovies.find(film => film.id === item.id).isSaved = false;
      })
      .catch(err => console.log(err));
  };
// проверка на наличие в сохраненных
  const checkSaving = (movie) => {

    return (savedFilms.length > 0) ? (savedFilms.findIndex((film) => film.movieId === movie.id)) : false;
  };

// поиск и фильтрация
  const handleSearchSubmit = (searchString) => {
    console.log(updateMovies);
    let resRU = updateMovies.filter((item) => item.nameRU.toLowerCase()
      .includes(searchString.toLowerCase()));
    setSearchRes([...resRU]);
    localStorage.setItem("searchRes", JSON.stringify({
      searchQuery: searchString,
      searchRes: [...resRU]
    }));

    console.log(searchString);
    console.log(resRU);
    console.log(filteredSearch);
    setSearchCount(searchCount + 1);

    setShowedFilms([...resRU]);
    checkFilter();

  };

  const checkFilter = () => {
    if (isShort) {
      setFilteredSearch(searchRes.filter(film => film.duration <= 40));
      setShowedFilms([...filteredSearch]);
    } else {
      setShowedFilms([...searchRes]);
    }
  };

  const onShortFilterClick = () => {
    setIsShort(!isShort);
    checkFilter();
    console.log(showedFilms);
  };
  React.useEffect(
    () => {
      checkFilter();
    }, [searchRes, isShort]
  );

  console.log(savedFilms);
  console.log(updateMovies);

  return (
    <section className={"movies"}>
      <div className={"movies__wrap"}>
        <SearchForm onSubmitSearch={handleSearchSubmit} searchQuery={searchQuery}
                    onShortFilm={onShortFilterClick}
                    isShort={isShort} />

        <SearchResult searchRes={searchRes} searchCount={searchCount}>
          {showedFilms.length > 0 &&
          <MoviesCardList items={showedFilms}
                          savedFilms={savedFilms}
                          onDelMovieClick={handleDeleteSavedFilms}
                          onSaveMovieClick={handleSaveClick} checkSaving={checkSaving}
          path = {'/movies'}/>}
        </SearchResult>
      </div>
    </section>
  );
}

export default Movies;
