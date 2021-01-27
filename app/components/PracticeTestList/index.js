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

function PracticeTestList({ loading, error, tests }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>Error occured!</div>;
  }
  let content = <div />;

  if (tests !== false) {
    content = tests.tests.map(test => (
      <div key={test._id}>
        <Link to={`/task/${test._id}`}>{test.name}</Link>
      </div>
    ));
  }

  return content;
}

PracticeTestList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tests: PropTypes.any,
};

export default PracticeTestList;
