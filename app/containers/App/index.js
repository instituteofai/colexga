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
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import { getUser } from './actions';
import { makeSelectUser } from './selectors';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ loadUser, user }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  React.useEffect(() => {
    if (!user) loadUser();
  }, [user]);

  const headerProps = {
    user,
  };

  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Colexga" defaultTitle="Colexga">
        <meta
          name="description"
          content="A platform to write essays and get its evaluation"
        />
      </Helmet>
      <Header {...headerProps} />
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

App.propTypes = {
  loadUser: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUser: () => dispatch(getUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
