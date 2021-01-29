/**
 *
 * Task
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
import makeSelectTask, {
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadTask } from './actions';
import Question from '../../components/Question';
import Timer from '../../components/Timer';

export function Task({ loading, error, task, fetchTask }) {
  useInjectReducer({ key: 'task', reducer });
  useInjectSaga({ key: 'task', saga });

  useEffect(() => {
    // Fetch task when page loads
    if (!task) fetchTask();
  }, []);

  const questionProps = {
    loading,
    error,
    task,
  };

  return (
    <div>
      <Helmet>
        <title>Task</title>
        <meta name="description" content="Description of Task" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <Timer {...questionProps.task} />
      <Question {...questionProps} />
      <h3>Your Resposne:</h3>
      <div>Write here...</div>
      <div>
        <button type="button">Submit</button>
      </div>
    </div>
  );
}

Task.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  task: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchTask: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  task: makeSelectTask(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTask: () => dispatch(loadTask()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Task);
