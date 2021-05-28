import React from "react";
import './SearchForm.css';

function SearchForm() {

  const [inputSearch, setInputSearch] = React.useState('');
  const handleInputChange = (e) => {
    setInputSearch(e.target.value)
  }


  return (
      <form className={'section__wrap search'}>
        <label className={'search__icn'} htmlFor={'search__input'} title={'Поиск фильма'}>Search</label>
        <input className={'search__input'} id={'searchInput'}
               placeholder={'Фильм'} type={'text'} value={inputSearch} onChange={handleInputChange}/>
        <button className={'search__sbmBtn'} type={'submit'}/>
      </form>
  )

}

export default SearchForm;
