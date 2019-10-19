import { dynamic } from '../../utils';

const HomeIndex = dynamic(import('./home-index'));

const routes = [{ path: '/', exact: true, component: HomeIndex }];

export { routes };
