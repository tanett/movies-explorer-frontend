import React from "react";
import './SearchForm.css';

function SearchForm(props) {

  const [inputSearch, setInputSearch] = React.useState('');
  const handleInputChange = (e) => {
    setInputSearch(e.target.value);
  }
const onSubmit = (e) => {
    e.preventDefault();
  props.onSubmitSearch(inputSearch)
}
React.useEffect( ()=> {
  setInputSearch(props.searchQuery)
}, []);
  return (
      <form className={'section__wrap search'} onSubmit={e=>onSubmit(e)}>
        <label className={'search__icn'} htmlFor={'search__input'} title={'Поиск фильма'}>Search</label>
        <input className={'search__input'} id={'searchInput'}
               placeholder={'Фильм'} type={'text'} value={inputSearch} onChange={handleInputChange} required  />
        <button className={'search__sbmBtn'} type={'submit'}/>
      </form>
  )

}

export default SearchForm;
