import {configApi} from "./constants.js";

class MoviesApi {
  constructor(config) {
    this._urlForSearch = config.urlForSearch;

  }

  getFilms() {
    return fetch(this._urlForSearch, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },

        }
    ).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

}
const moviesApi = new MoviesApi(configApi);

export default moviesApi;
