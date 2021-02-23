/* eslint-disable no-underscore-dangle */
/**
 *
 * UserSubmissionList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function UserSubmissionList({ userSubmissions }) {
  let content = <div />;
  if (userSubmissions) {
    content = userSubmissions.map(submission => (
      <div key={submission._id}>
        <p>{submission.question}</p>
      </div>
    ));
  }
  return content;
}

UserSubmissionList.propTypes = {
  userSubmissions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default UserSubmissionList;
