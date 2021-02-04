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
import { addTask } from './actions';

export function TaskDetails({ dispatch, match }) {
  useInjectReducer({ key: 'taskDetails', reducer });
  useInjectSaga({ key: 'taskDetails', saga });

  const { id: testId, taskId } = match.params;

  const handleAddNew = (questionType, allowedTimeInSeconds, question) => {
    dispatch(addTask(testId, { question, questionType, allowedTimeInSeconds }));
  };

  // const handleUpdate = (type, duration, question) => {
  //   console.log('Updating existing task!');
  //   console.log(type, duration, question);
  // };

  if (taskId === 'new') {
    return (
      <div>
        <EditTask onSave={handleAddNew} />
      </div>
    );
  }

  // TODO: show EditTask component in "edit" mode
  // return (
  //   <div>
  //     {/* If taskId is "new", show blank fields */}

  //     {/* Else check if taskId exists in test. If it does, fill values in fields */}
  //     <EditTask onSave={handleUpdate} />
  //     {/* If taskId doesn't exist, show error message */}
  //   </div>
  // );
}

TaskDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
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
