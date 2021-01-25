/*
 * Practice Messages
 *
 * This contains all the text for the Practice container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Practice';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Practice container!',
  },
});
