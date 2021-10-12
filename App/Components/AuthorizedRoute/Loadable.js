/**
 *
 * Asynchronously loads the component for AuthorizedRoute
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
