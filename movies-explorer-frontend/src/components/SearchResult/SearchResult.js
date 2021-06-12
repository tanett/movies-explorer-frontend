import React from "react";
import "./SearchResult.css";

function SearchResult(props) {
  const titleSearch = (props.searchCount === 0  ) ? 'Вы еще ничего не искали' : props.searchRes.length===0?'По вашему запросу ничего не найдено.':'';
  return (
      <section className={'searchResult'}>
        {props.searchRes.length === 0 && <h2 className={'searchResult__title'}>{titleSearch}</h2>}
        {props.children}
      </section>
  )
}

export default SearchResult;
