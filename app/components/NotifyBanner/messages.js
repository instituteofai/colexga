/*
 * NotifyBanner Messages
 *
 * This contains all the text for the NotifyBanner component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NotifyBanner';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NotifyBanner component!',
  },
});
