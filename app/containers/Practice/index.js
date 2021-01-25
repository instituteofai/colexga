/**
 *
 * Practice
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPractice from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Practice() {
  useInjectReducer({ key: 'practice', reducer });
  useInjectSaga({ key: 'practice', saga });

  return (
    <div>
      <Helmet>
        <title>Practice</title>
        <meta name="description" content="Description of Practice" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <br />
      <Link to="/task/ielts">IELTS</Link>
    </div>
  );
}

Practice.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  practice: makeSelectPractice(),
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
)(Practice);
