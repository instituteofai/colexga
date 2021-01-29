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
import { loadTests, selectTest } from './actions';
import PracticeTestList from '../../components/PracticeTestList';

// export function Practice(props) {}
export function Practice({ loading, error, tests, fetchTests, onSelectTest }) {
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
  };

  return (
    <div>
      <Helmet>
        <title>Practice</title>
        <meta name="description" content="Description of Practice" />
      </Helmet>
      <FormattedMessage {...messages.header} />
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
};

const mapStateToProps = createStructuredSelector({
  practice: makeSelectPractice(),
  tests: makeSelectTests(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTests: () => dispatch(loadTests()),
    onSelectTest: testId => {
      dispatch(selectTest(testId));
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
