/**
 *
 * Asynchronously loads the component for MaintainTask
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
