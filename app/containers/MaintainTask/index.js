/* eslint-disable no-underscore-dangle */
/**
 *
 * MaintainTask
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMaintainTask from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { loadTasks, deleteTask } from './actions';

export function MaintainTask({ match, dispatch, maintainTask }) {
  useInjectReducer({ key: 'maintainTask', reducer });
  useInjectSaga({ key: 'maintainTask', saga });

  useEffect(() => {
    const testId = match.params.id;
    dispatch(loadTasks(testId));
  }, []);

  return (
    <div>
      <Helmet>
        <title>MaintainTask</title>
        <meta name="description" content="Description of MaintainTask" />
      </Helmet>
      <button
        type="button"
        onClick={() => {
          dispatch(push(`${match.url}/new`));
        }}
      >
        Add New Task
      </button>
      {maintainTask.tasks.map(task => (
        <div key={task._id}>
          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              dispatch(deleteTask(match.params.id, task._id));
            }}
          >
            <span role="img" aria-label="cross">
              ❌
            </span>
          </button>
          <Link to={`${match.params.id}/${task._id}`}>{task.question}</Link>
        </div>
      ))}
    </div>
  );
}

MaintainTask.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  maintainTask: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  maintainTask: makeSelectMaintainTask(),
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
)(MaintainTask);
