/* eslint-disable no-underscore-dangle */
/**
 *
 * PracticeTestList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../LoadingIndicator';
import { notificationType } from '../../containers/App/constants';

function PracticeTestList({
  loading,
  error,
  tests,
  onSelectTest,
  user,
  notify,
}) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>Error occured!</div>;
  }
  const notification = {
    type: notificationType.SUCCESS,
    message: 'Please login to attempt the task!',
  };
  let content = <div />;

  if (tests !== false) {
    content = tests.tests.map(test => (
      <div key={test._id}>
        {user ? (
          <Link to={`/task/${test._id}`} onClick={() => onSelectTest(test._id)}>
            {test.name}
          </Link>
        ) : (
          <Link
            to={`/task/${test._id}`}
            onClick={event => {
              event.preventDefault();
              // alert('Please login to attempt the task!');
              notify(notification);
            }}
          >
            {test.name}
          </Link>
        )}
      </div>
    ));
  }

  return content;
}

PracticeTestList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tests: PropTypes.any,
  onSelectTest: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  notify: PropTypes.func,
};

export default PracticeTestList;
