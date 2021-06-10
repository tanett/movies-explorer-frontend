import React, {useState} from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";

import SearchResult from "../SearchResult/SearchResult";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import {CurrentUserContext} from "../../context/CurrentUserContext";


function Movies(props) {
  const user = React.useContext(CurrentUserContext);
  const [movies, setMovies] = useState([]);
  const [updateMovies, setUpdateMovies] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedFilms, setSavedFilms] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [isShort, setIsShort] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [showedFilms, setShowedFilms] = React.useState([...searchRes]);
  const [isPageLoader, setIsPageLoader] = React.useState(false);

  React.useEffect(
      () => {
        const userId = user.user._id
        setIsPageLoader(true);
        Promise.all([moviesApi.getFilms(), mainApi.getSavedFilms()])
            .then(data => {
              setMovies(data[0]);
              return data[1];
            })
            .then(
                (data) => {
                  const myFilms = data.filter(film => film.owner === userId)
                  setSavedFilms(myFilms);
                }
            )
            .catch(err => console.log(err));


        const update = movies.map(film => {
          const sf = savedFilms.find((movie) => movie.movieId === film.id);
          console.log(sf);
          return sf ? sf : film
        });
        setUpdateMovies([...update]);


        if (localStorage.getItem("searchRes")) {
          const prevSearch = JSON.parse(localStorage.getItem("searchRes"));
          console.log(prevSearch);
          setSearchRes(prevSearch.searchRes);
          setSearchQuery(prevSearch.searchQuery);
          setFilteredSearch(prevSearch.searchRes.filter(film => film.duration <= 40));
          setIsShort(false);
          setShowedFilms([...prevSearch.searchRes]);
        }
        setIsPageLoader(false);
      }, []
  );

// Сохранение и удаление
  const handleSaveClick = (movie) => {
    setIsPageLoader(true);
    mainApi.saveFilm(movie)
        .then(res => {
          if (res.owner) {
            setSavedFilms([...savedFilms, res]);
            const newMovies = updateMovies.map((film) => {
              if (film.id === res.movieId) {
                return res
              } else {
                return film
              }
            });
            setUpdateMovies([...newMovies]);
            const newSavM = searchRes.map((film) => {
              if (film.id === res.movieId) {
                return res
              } else {
                return film
              }
            });
            setSearchRes([...newSavM])
          } else new Error("Invalid Response");
        })

        .catch(err => {
          props.tooltip(err.message)
          console.log(err)
        })
        .finally(() => setIsPageLoader(false));


  };
  const handleDeleteSavedFilms = (item) => {
    setIsPageLoader(true);
    mainApi.deleteFilm(item._id)
        .then(() => {
          setSavedFilms(() => savedFilms.filter((film) => film._id !== item._id));

          const newMovies = movies.map((film) => {
            const sf = savedFilms.find((movie) => movie.movieId === film.id);

            return sf ? sf : film
          });

          setUpdateMovies([...newMovies]);
          const initItem = movies.find(film => film.id === item.movieId);
          const newSavM = searchRes.map((film) => {
            if (film.movieId === initItem.id) {
              return initItem
            } else {
              return film
            }
          });
          setSearchRes([...newSavM])
        })
        .catch(err => {
          props.tooltip(err.message)
          console.log(err)
        })
        .finally(() => setIsPageLoader(false));
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
        const update = movies.map(film => {
          const sf = savedFilms.find((movie) => movie.movieId === film.id);

          return sf ? sf : film
        });
        setUpdateMovies([...update]);
      }, [searchRes, isShort]
  );

  console.log(savedFilms);
  console.log(updateMovies);

  return (
      <section className={"movies"}>
        <div className={"movies__wrap"}>
          <SearchForm onSubmitSearch={handleSearchSubmit} searchQuery={searchQuery}
                      onShortFilm={onShortFilterClick}
                      isShort={isShort}/>

          <SearchResult searchRes={searchRes} searchCount={searchCount}>
            {isPageLoader && <Preloader/>}
            {showedFilms.length > 0 &&
            <MoviesCardList items={showedFilms}
                            savedFilms={savedFilms}
                            onDelMovieClick={handleDeleteSavedFilms}
                            onSaveMovieClick={handleSaveClick}
                            path={'/movies'}/>}
          </SearchResult>
        </div>
      </section>
  );
}

export default Movies;
