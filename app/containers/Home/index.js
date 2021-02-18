/**
 *
 * Home
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import NotifyBanner from '../../components/NotifyBanner';
import { makeSelectGlobalNotification, makeSelectUser } from '../App/selectors';
import { getUser } from '../App/actions';

export function Home({ globalNotification, user, loadUser }) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  useEffect(() => {
    if (!user) loadUser();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      {globalNotification.message && (
        <div>
          <NotifyBanner message={globalNotification.message} />
        </div>
      )}
      {user && (
        <div>
          <h3>User is authenticated</h3>
          <button
            type="button"
            onClick={() => window.open('/api/auth/logout', '_self')}
          >
            Logout
          </button>
        </div>
      )}
      {!user && (
        <button
          type="button"
          onClick={() => window.open('/api/auth/google', '_self')}
        >
          Google Login
        </button>
      )}
    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  globalNotification: PropTypes.object,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loadUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  globalNotification: makeSelectGlobalNotification(),
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

export default compose(
  withConnect,
  memo,
)(Home);
