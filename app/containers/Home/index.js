/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
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
import UserSubmissionList from '../../components/UserSubmissionList';
import {
  makeSelectGlobalNotification,
  makeSelectUser,
  makeSelectUserSubmissions,
} from '../App/selectors';

export function Home({ globalNotification, user, userSubmissions }) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  const userSubmissionListProps = {
    userSubmissions,
  };

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
          <h3>Welcome {user.displayName}</h3>
        </div>
      )}
      <h3>Your Submissions:</h3>
      <UserSubmissionList {...userSubmissionListProps} />
    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  globalNotification: PropTypes.object,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  userSubmissions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  globalNotification: makeSelectGlobalNotification(),
  user: makeSelectUser(),
  userSubmissions: makeSelectUserSubmissions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
