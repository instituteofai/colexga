/**
 *
 * Practice
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectPractice, {
  makeSelectError,
  makeSelectLoading,
  makeSelectTests,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import PracticeTestList from '../../components/PracticeTestList';
import NotifyBanner from '../../components/NotifyBanner';

import { makeSelectGlobalNotification, makeSelectUser } from '../App/selectors';
import { loadTests, selectTest } from './actions';
import { showGlobalNotification } from '../App/actions';

// export function Practice(props) {}
export function Practice({
  loading,
  error,
  tests,
  fetchTests,
  onSelectTest,
  user,
  globalNotification,
  notify,
}) {
  useInjectReducer({ key: 'practice', reducer });
  useInjectSaga({ key: 'practice', saga });

  useEffect(() => {
    // Fetch Tests when page loads
    if (!tests) fetchTests();
  }, []);

  const practiceTestListProps = {
    loading,
    error,
    tests,
    onSelectTest,
    user,
    notify,
  };

  return (
    <div>
      <Helmet>
        <title>Practice</title>
        <meta name="description" content="Description of Practice" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      {globalNotification.message && (
        <div>
          <NotifyBanner message={globalNotification.message} />
        </div>
      )}
      <br />
      <br />
      <PracticeTestList {...practiceTestListProps} />
    </div>
  );
}

Practice.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tests: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchTests: PropTypes.func,
  onSelectTest: PropTypes.func,
  showGlobalNotification: PropTypes.func,
  globalNotification: PropTypes.object,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  notify: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  practice: makeSelectPractice(),
  tests: makeSelectTests(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  user: makeSelectUser(),
  globalNotification: makeSelectGlobalNotification(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTests: () => dispatch(loadTests()),
    onSelectTest: testId => {
      dispatch(selectTest(testId));
    },
    notify: notification => {
      dispatch(showGlobalNotification(notification));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Practice);
