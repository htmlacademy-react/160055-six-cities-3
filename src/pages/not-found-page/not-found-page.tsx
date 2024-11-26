import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFoundPageComp(): JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>404 Страница не найдена</title>
      </Helmet>
      <Header />
      <p>404 Not Found</p>
      <p>Перейти на <Link to="/">главную</Link> страницу.</p>
      <Footer />
    </React.Fragment>
  );
}

const NotFoundPage = memo(NotFoundPageComp);

export default NotFoundPage;
