import { dynamic } from '../../utils';

const Login = dynamic(import('./Login'));

const routes = [{ path: 'login', exact: true, component: Login }];

export { routes };
