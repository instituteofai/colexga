/**
 *
 * EditTask
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function EditTask({ onSave, currentType, currentDuration, currentQuestion }) {
  const [type, setType] = useState(currentType || '');
  const [duration, setDuration] = useState(currentDuration || 1200);
  const [question, setQuestion] = useState(currentQuestion || '');

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <div>
        <label htmlFor="taskQuestionType">Question Type</label>
        <input
          type="text"
          id="taskQuestionType"
          value={type}
          onChange={e => setType(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="taskDuration">Duration</label>
        <input
          type="number"
          id="taskDuration"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="taskQuestion">Question</label>
        <textarea
          id="taskQuestion"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            onSave(type, duration, question);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

EditTask.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentType: PropTypes.string,
  currentDuration: PropTypes.number,
  currentQuestion: PropTypes.string,
};

export default EditTask;
