/**
 *
 * About
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAbout from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function About() {
  useInjectReducer({ key: 'about', reducer });
  useInjectSaga({ key: 'about', saga });

  return (
    <div>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Description of About" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

About.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  about: makeSelectAbout(),
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
)(About);
