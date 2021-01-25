/**
 *
 * Task
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
import makeSelectTask from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Task() {
  useInjectReducer({ key: 'task', reducer });
  useInjectSaga({ key: 'task', saga });

  return (
    <div>
      <Helmet>
        <title>Task</title>
        <meta name="description" content="Description of Task" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <div>
        <h3>Task:</h3>
        <h4>
          Some film companies spend millions of dollars on the production of a
          single movie. Is it necessary to spend a lot of money to make a good
          What factors contribute to the success of a movie? Give reasons for
          your answer and include any relevant examples from your own knowledge
          experience.
        </h4>
      </div>
      <h3>Your Resposne:</h3>
      <div contentEditable="true">Write here...</div>
      <div>
        <button type="button">Submit</button>
      </div>
    </div>
  );
}

Task.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  task: makeSelectTask(),
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
)(Task);
