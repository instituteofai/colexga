/**
 *
 * AdminDashboard
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import StyledComponent from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createTest, deleteTest, loadTests } from './actions';

const TestListItem = StyledComponent.div`
  border: 1px solid lightgray;
  margin: 4px 0;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const IconButton = StyledComponent.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;

  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
export function AdminDashboard({ dispatch, adminDashboard }) {
  useInjectReducer({ key: 'adminDashboard', reducer });
  useInjectSaga({ key: 'adminDashboard', saga });

  useEffect(() => {
    dispatch(loadTests());
  }, []);

  const [testName, setTestName] = useState('');

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Administrator Dashboard" />
      </Helmet>
      <input
        type="text"
        value={testName}
        onChange={e => setTestName(e.target.value)}
      />
      <button
        onClick={() => {
          setTestName('');
          dispatch(createTest(testName));
        }}
        type="button"
      >
        Add Test
      </button>

      {adminDashboard.tests.map(e => (
        // eslint-disable-next-line no-underscore-dangle
        <TestListItem key={e._id}>
          <IconButton
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              dispatch(deleteTest(e._id));
            }}
          >
            <span role="img" aria-label="cross">
              ❌
            </span>
          </IconButton>
          <div>{e.name}</div>
        </TestListItem>
      ))}
    </div>
  );
}

AdminDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminDashboard: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  adminDashboard: makeSelectAdminDashboard(),
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

export default compose(withConnect)(AdminDashboard);
