import {configApi} from "./constants.js";
import shot from "../images/no-image-2 (1).jpg";

class MainApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = {
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": 'application/json',
      "Accept": 'application/json',
    };
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editUserInfo(valuesFromInput) {
    return fetch(`${this._baseUrl}/users/me `, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: valuesFromInput.name,
            email: valuesFromInput.email
          })
        }
    ).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  saveFilm(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country === null ? "null" : movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image ? `https://api.nomoreparties.co${movie?.image.url}` : shot,
        trailer: movie.trailerLink,
        thumbnail: movie.image ? `https://api.nomoreparties.co${
            movie.image.formats?.thumbnail.url || movie.image.formats?.small.url}` : shot,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN === "" ? movie.nameRU : movie.nameEN,
        movieId: movie.id,
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.statusText} `);
    })
  }

  deleteFilm(movieID) {
    return fetch(`${this._baseUrl}/movies/${movieID}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  changeSaveFilmStatus(film, hasSave) {
    if (hasSave) {
      return this.deleteFilm(film._id)
    } else {
      return this.saveFilm(film)
    }
  }

  getSavedFilms() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => console.log(err));
  }
}

const mainApi = new MainApi(configApi);

export default mainApi;
