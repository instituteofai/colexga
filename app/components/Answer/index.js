/**
 *
 * Answer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Answer() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <div contentEditable suppressContentEditableWarning>
        Write here...
      </div>
    </div>
  );
}

Answer.propTypes = {};

export default Answer;
