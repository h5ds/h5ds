import { dynamic } from '../../utils';

const Register = dynamic(import('./Register'));

const routes = [{ path: 'register', exact: true, component: Register }];

export { routes };
