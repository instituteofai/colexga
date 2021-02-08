/* eslint-disable no-underscore-dangle */
/**
 *
 * TaskDetails
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTaskDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import EditTask from '../../components/EditTask';
import { addTask, loadTask, updateTask } from './actions';

export function TaskDetails({ dispatch, match, taskDetails }) {
  useInjectReducer({ key: 'taskDetails', reducer });
  useInjectSaga({ key: 'taskDetails', saga });

  const { id: testId, taskId } = match.params;

  const handleAddNew = (questionType, allowedTimeInSeconds, question) => {
    dispatch(addTask(testId, { question, questionType, allowedTimeInSeconds }));
  };

  const handleUpdate = (questionType, allowedTimeInSeconds, question) => {
    dispatch(
      updateTask(testId, taskId, {
        question,
        questionType,
        allowedTimeInSeconds,
      }),
    );
  };

  if (taskDetails.error) {
    return <div>Error!</div>;
  }

  if (taskId === 'new') {
    return (
      <div>
        <EditTask onSave={handleAddNew} />
      </div>
    );
  }

  // If this component is loaded after a new task is created, the details of the task will be in the state
  // Otherwise, we need to fetch the task details from the backend
  if (!taskDetails.task._id || taskDetails.task._id !== taskId) {
    dispatch(loadTask(testId, taskId));
  } else {
    return (
      <div>
        <EditTask
          currentType={taskDetails.task.questionType}
          currentDuration={taskDetails.task.allowedTimeInSeconds}
          currentQuestion={taskDetails.task.question}
          onSave={handleUpdate}
        />
      </div>
    );
  }
}

TaskDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  taskDetails: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  taskDetails: makeSelectTaskDetails(),
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
)(TaskDetails);
