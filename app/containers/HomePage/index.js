/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import messages from './messages';

const Wrapper = styled.div`
  background: papayawhip;
`;

export default function HomePage() {
  return (
    <Wrapper>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </Wrapper>
  );
}
