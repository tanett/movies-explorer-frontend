import React from "react";
import './SearchForm.css';
import Switcher from "../Switcher/Switcher";

function SearchForm(props) {

  const [inputSearch, setInputSearch] = React.useState('');
  const [isShortActive, setIsShortActive] = React.useState('');
  const handleInputChange = (e) => {
    setInputSearch(e.target.value);
  }
  const handleChangeCheckbox = () => {
    props.onShortFilm();
  }
  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmitSearch(inputSearch)
  }

  React.useEffect(() => {
    setInputSearch(props.searchQuery)
  }, [props.searchQuery]);
  React.useEffect(() => {
    setIsShortActive(props.isShort)
  }, [props.isShort]);

  return (
      <>
        <form className={'section__wrap search'} onSubmit={e => onSubmit(e)}>
          <label className={'search__icn'} htmlFor={'search__input'} title={'Поиск фильма'}>Search</label>
          <input className={'search__input'} id={'searchInput'}
                 placeholder={'Фильм'} type={'text'} value={inputSearch} onChange={handleInputChange} required/>
          <button className={'search__sbmBtn'} type={'submit'}/>
        </form>
        <section className={'switcher'}>
          <button className={`switcher__btn ${isShortActive ? "switcher__btn_on" : "switcher__btn_off"}`}
                  onClick={handleChangeCheckbox} id={'checkShortFilms'}/>
          <label className={'switcher__title'} htmlFor={'checkShortFilms'}>Короткометражки</label>
        </section>

      </>
  )

}

export default SearchForm;
