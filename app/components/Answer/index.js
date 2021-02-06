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

function Answer({ onSubmitAnswer, answerText, updateAnswerText }) {
  return (
    <div>
      <div>
        <FormattedMessage {...messages.header} />
      </div>
      <div>
        <TextArea
          value={answerText}
          onChange={evt => updateAnswerText(evt.target.value)}
          placeholder="Type here..."
        />
      </div>
      <div>
        <Button onClick={() => onSubmitAnswer()}>Submit</Button>
      </div>
    </div>
  );
}

Answer.propTypes = {
  onSubmitAnswer: PropTypes.func,
  answerText: PropTypes.string,
  updateAnswerText: PropTypes.func,
};

export default Answer;
