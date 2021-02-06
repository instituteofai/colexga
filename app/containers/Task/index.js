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
  makeSelectAnsNotification,
  makeSelectAnswer,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  loadTask,
  saveAnswer,
  updateAnswer,
  updateTimerValue,
} from './actions';
import Question from '../../components/Question';
import Timer from '../../components/Timer';
import Answer from '../../components/Answer';
import NotifyBanner from '../../components/NotifyBanner';
import LoadingIndicator from '../../components/LoadingIndicator';

export function Task({
  loading,
  error,
  task,
  fetchTask,
  answerText,
  updateAnswerText,
  onSubmitAnswer,
  answerNotification,
  updateTimer,
}) {
  useInjectReducer({ key: 'task', reducer });
  useInjectSaga({ key: 'task', saga });

  useEffect(() => {
    // Fetch task when page loads
    if (!task) fetchTask();
  }, []);

  if (!task) return <LoadingIndicator />;

  const questionProps = {
    loading,
    error,
    task,
  };

  const answerProps = {
    onSubmitAnswer,
    answerText,
    updateAnswerText,
  };

  const timerProps = {
    allowedTimeInSeconds: task.allowedTimeInSeconds,
    updateTimer,
    onSubmitAnswer,
  };

  return (
    <div>
      <Helmet>
        <title>Task</title>
        <meta name="description" content="Description of Task" />
      </Helmet>
      <div>
        {answerNotification && (
          <div>
            <NotifyBanner message={answerNotification} />
          </div>
        )}
        <FormattedMessage {...messages.header} />
        <hr />
        <Timer {...timerProps} />
        <Question {...questionProps} />
        <Answer {...answerProps} />
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
  updateAnswerText: PropTypes.func,
  onSubmitAnswer: PropTypes.func,
  answerText: PropTypes.string,
  answerNotification: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  answerError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateTimer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  task: makeSelectTask(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  answerText: makeSelectAnswer(),
  answerNotification: makeSelectAnsNotification(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchTask: () => dispatch(loadTask()),
    onSubmitAnswer: () => {
      dispatch(saveAnswer());
    },
    updateAnswerText: answerText => dispatch(updateAnswer(answerText)),
    updateTimer: seconds => dispatch(updateTimerValue(seconds)),
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
