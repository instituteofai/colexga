/**
 *
 * Timer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Timer({ allowedTimeInSeconds, updateTimer, onSubmitAnswer }) {
  const [timer, setTimer] = React.useState(allowedTimeInSeconds);
  const id = React.useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
  };

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer(time => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  React.useEffect(() => {
    // Update task state with timer values
    updateTimer(timer);
    if (timer === 0) {
      clear();
      // Time's up, Submit
      onSubmitAnswer();
    }
  }, [timer]);

  return (
    <div>
      <FormattedMessage {...messages.header} />
      &nbsp;
      {new Date(timer * 1000).toISOString().substr(11, 8)}
    </div>
  );
}

Timer.propTypes = {
  allowedTimeInSeconds: PropTypes.number,
  updateTimer: PropTypes.func,
  onSubmitAnswer: PropTypes.func,
};

export default Timer;
