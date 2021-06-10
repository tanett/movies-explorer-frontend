import React from "react";
import "./SearchResult.css";

function SearchResult(props) {
  const titleSearch = (props.searchCount === 0 && window.location.path !== '/saved-movie') ? 'Вы еще ничего не искали' : 'По вашему запросу ничего не найдено.';
  return (
      <section className={'searchResult'}>
        {props.searchRes.length === 0 && <h2 className={'searchResult__title'}>{titleSearch}</h2>}
        {props.children}
      </section>
  )
}

export default SearchResult;
