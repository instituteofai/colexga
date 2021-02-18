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
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import About from 'containers/About/Loadable';
import Practice from 'containers/Practice/Loadable';
import Task from 'containers/Task/Loadable';
import Register from 'containers/Register/Loadable';
import AdminDashboard from 'containers/AdminDashboard/Loadable';
import MaintainTask from 'containers/MaintainTask/Loadable';
import TaskDetails from 'containers/TaskDetails/Loadable';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import Header from '../../components/Header';
import Home from '../Home';
import saga from './saga';
import reducer from './reducer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Colexga" defaultTitle="Colexga">
        <meta
          name="description"
          content="A platform to write essays and get its evaluation"
        />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/practice" component={Practice} />
        <Route exact path="/task/*" component={Task} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/admin/:id/:taskId" component={TaskDetails} />
        <Route exact path="/admin/:id" component={MaintainTask} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
