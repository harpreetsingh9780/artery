/**
 *
 * Asynchronously loads the component for PersistProvider
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
