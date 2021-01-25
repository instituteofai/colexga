/**
 *
 * Asynchronously loads the component for Practice
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
