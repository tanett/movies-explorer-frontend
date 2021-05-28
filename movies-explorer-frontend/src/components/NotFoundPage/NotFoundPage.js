import {
  Link
} from "react-router-dom";

import React from "react";
import './NotFoundPage.css';


function NotFoundPage() {
  return (
      <main className={'notFoundPage'}>
        <h1 className={'notFoundPage__title'}>404</h1>
        <p className={'notFoundPage__subtitle'}>Страница не найдена</p>
        <Link to={'/'} className={'notFoundPage__link'}>Назад</Link>
      </main>
  )

}

export default NotFoundPage;
