import React, {useState} from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import SearchResult from "../SearchResult/SearchResult";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import {LoggedInContext} from "../../context/LoggedInContext";


function Movies(props) {

  const user = React.useContext(CurrentUserContext);
  const loggedIn = React.useContext(LoggedInContext);
  const [movies, setMovies] = useState([]);
  const [updateMovies, setUpdateMovies] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedFilms, setSavedFilms] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [isShort, setIsShort] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [showedFilms, setShowedFilms] = React.useState([]);
  const [isPageLoader, setIsPageLoader] = React.useState(false);

  React.useEffect(
      () => {

        setIsPageLoader(true);

        Promise.all([moviesApi.getFilms(), mainApi.getSavedFilms()])
            .then(data => {
              if(data[0] && data[1]) {
                setMovies(data[0]);
                setSavedFilms(data[1]);

                const userId = JSON.parse(localStorage.getItem("user")).user._id;
                const myFilms = data[1].filter(film => film.owner === userId);
                setSavedFilms(myFilms);

                const update = data[0].map(film => {
                  const sf = myFilms.find((movie) => movie.movieId === film.id);
                  sf ? film.isSaved = true : film.isSaved=false;
                  return film;
                });
                setUpdateMovies([...update]);
              } else throw new Error("Что-то пошле не так. Попробуйте обновить страницу")
            })

            .then(
                () => {console.log(updateMovies);
                  if (localStorage.getItem("searchRes")) {
                    const prevSearch = JSON.parse(localStorage.getItem("searchRes"));

                    setSearchRes(prevSearch.searchRes);
                    setSearchQuery(prevSearch.searchQuery);
                    setFilteredSearch(prevSearch.searchRes.filter(film => film.duration <= 40));
                    setIsShort(false);
                    setShowedFilms([...prevSearch.searchRes]);
                  }
                }
            )
            .catch(err => {
              props.tooltip(err.message);
              console.log(err)
            }).finally(() => setIsPageLoader(false));
      }, []
  );

// Сохранение и удаление
  const handleSaveClick = (movie) => {
debugger;
    setIsPageLoader(true);
    mainApi.saveFilm(movie)
        .then(res => {
          if (res.owner) {
            setSavedFilms([...savedFilms, res]);
            movie.isSaved = true;
           const sfIndx= updateMovies.findIndex((film=>film.id===movie.id));
           updateMovies[sfIndx].isSaved = true;
            // const newMovies = updateMovies.map((film) => {
            //   if (film.id === res.movieId) {
            //     return res
            //   } else {
            //     return film
            //   }
            // });
            // setUpdateMovies([...newMovies]);
            // const newSavM = searchRes.map((film) => {
            //   if (film.id === res.movieId) {
            //     return res
            //   } else {
            //     return film
            //   }
            // });
            // setSearchRes([...newSavM])
          } else throw new Error(res);
          setUpdateMovies([...updateMovies])
        })

        .catch(err => {
          props.tooltip(err || "Что-то пошло не так");
          console.log(err);
        })
        .finally(() => setIsPageLoader(false));
  };

  const handleDeleteSavedFilms = (item) => {
    setIsPageLoader(true);
    const idFromSavedFilms = savedFilms.find((el)=>el.movieId === item.id)._id;
    mainApi.deleteFilm(idFromSavedFilms)
        .then(() => {
          setSavedFilms(() => savedFilms.filter((film) => film.movieId !== item.id));
          const sfIndx= updateMovies.findIndex((film=>film.id===item.id ));
          updateMovies[sfIndx].isSaved = false;
          setUpdateMovies([...updateMovies]);
          // const newMovies = movies.map((film) => {
          //   const sf = savedFilms.find((movie) => movie.movieId === film.id);
          //   return sf ? sf : film
          // });
          //
          // setUpdateMovies([...newMovies]);
          // const initItem = movies.find(film => film.id === item.movieId);
          // const newSavM = searchRes.map((film) => {
          //   if (film.movieId === initItem.id) {
          //     return initItem
          //   } else {
          //     return film
          //   }
          // });
          // setSearchRes([...newSavM])

        })
        .catch(err => {
          props.tooltip(err.message)
          console.log(err)
        })
        .finally(() => setIsPageLoader(false));
  };

// поиск и фильтрация
  const handleSearchSubmit = (searchString) => {

    setIsShort(false);
    let resRU = updateMovies.filter((item) => item.nameRU.toLowerCase()
        .includes(searchString.toLowerCase()));
    let resEn = updateMovies.filter((item) => {
      if (item.nameEN !== null) {
        return item.nameEN.toLowerCase()
            .includes(searchString.toLowerCase())
      }
    });
    let res = new Set([...resRU, ...resEn]);
    setSearchRes([...res]);
    localStorage.setItem("searchRes", JSON.stringify({
      searchQuery: searchString,
      searchRes: [...res]
    }));
    setSearchCount(searchCount + 1);
    setShowedFilms([...res]);
    checkFilter();

  };

  const checkFilter = () => {
    if (isShort) {
      const filtered = searchRes.filter(film => film.duration <= 40)
      setFilteredSearch([...filtered]);
      setShowedFilms([...filtered]);
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
        const update = movies.map(film => {
          const sf = savedFilms.find((movie) => movie.movieId === film.id);
          return sf ? sf : film
        });
        setUpdateMovies([...update]);
      }, [searchRes, isShort]
  );

  return (
      <div className={'page'}>
        <Header loggedIn={loggedIn}/>
        <main className={'main'}>
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
        </main>
        <Footer/>
      </div>

  );
}

export default Movies;
