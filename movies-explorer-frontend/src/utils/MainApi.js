import {configApi} from "./constants.js";

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
      body: JSON.stringify(
          movie
      )
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
