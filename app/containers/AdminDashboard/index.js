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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createTest, loadTests } from './actions';

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
        <div key={e._id}>{e.name}</div>
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
