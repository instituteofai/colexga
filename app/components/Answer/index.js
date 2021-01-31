/**
 *
 * Answer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import TextArea from './TextArea';
import Button from '../Button';

function Answer({ onSubmitAnswer }) {
  const [txtAreaValue, setTxtAreaValue] = React.useState('');
  return (
    <div>
      <div>
        <FormattedMessage {...messages.header} />
      </div>
      <div>
        <TextArea
          value={txtAreaValue}
          onChange={evt => setTxtAreaValue(evt.target.value)}
          placeholder="Type here..."
        />
      </div>
      <div>
        <Button onClick={() => onSubmitAnswer(txtAreaValue)}>Submit</Button>
      </div>
    </div>
  );
}

Answer.propTypes = {
  onSubmitAnswer: PropTypes.func,
};

export default Answer;
