/*
 * Task Messages
 *
 * This contains all the text for the Task container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Task';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Your task',
  },
  notifySubmission: {
    id: `${scope}.notifySubmission`,
    defaultMessage: 'Your response has been submitted successfully!',
  },
});
