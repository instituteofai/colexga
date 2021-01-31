/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import About from 'containers/About/Loadable';
import Practice from 'containers/Practice/Loadable';
import Task from 'containers/Task/Loadable';
import Register from 'containers/Register/Loadable';
import AdminDashboard from 'containers/AdminDashboard/Loadable';

import GlobalStyle from '../../global-styles';
import Header from '../../components/Header';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Colexga" defaultTitle="Colexga">
        <meta
          name="description"
          content="A platform to write essays and get the scores"
        />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/practice" component={Practice} />
        <Route exact path="/task/*" component={Task} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
