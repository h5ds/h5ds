import { dynamic } from '../../utils';

const Editor = dynamic(import('./Editor'));

const routes = [{ path: '', exact: true, component: Editor }];

export { routes };
