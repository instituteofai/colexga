/**
 *
 * NotifyBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';

function NotifyBanner({ message }) {
  if (!message) {
    return null;
  }
  if (message) {
    console.log('message aaya: ', message);
  }
  return <h3>{message}</h3>;
}

NotifyBanner.propTypes = {
  message: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default NotifyBanner;
