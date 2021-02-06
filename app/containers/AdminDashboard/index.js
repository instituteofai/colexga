/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
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
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createTest, deleteTest, loadTests, updateTestActive } from './actions';

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

  const makeTableRow = test => (
    <tr key={test._id}>
      <td>
        <IconButton
          type="button"
          onClick={() => {
            dispatch(deleteTest(test._id));
          }}
        >
          <span role="img" aria-label="cross">
            ❌
          </span>
        </IconButton>
      </td>

      <td>
        <input
          type="checkbox"
          id={`active-test-${test._id}`}
          defaultChecked={test.active}
          onChange={changeEvent => {
            dispatch(updateTestActive(test._id, changeEvent.target.checked));
          }}
        />
      </td>

      <td>
        <Link to={`admin/${test._id}`}>{test.name}</Link>
      </td>
    </tr>
  );

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

      <table>
        <thead>
          <tr>
            <th>Delete</th>
            <th>Active</th>
            <th>Test Name</th>
          </tr>
        </thead>
        <tbody>{adminDashboard.tests.map(e => makeTableRow(e))}</tbody>
      </table>
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
