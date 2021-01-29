/**
 *
 * Question
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import LoadingIndicator from '../LoadingIndicator';

function Question({ loading, error, task }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>Error occured!</div>;
  }
  let content = <div />;

  if (task !== false) {
    content = (
      <div>
        <h2>Task:</h2>
        <h3>{task.question}</h3>
      </div>
    );
  }
  return content;
}

Question.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  task: PropTypes.any,
};

export default Question;
