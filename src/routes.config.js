import { dynamic } from './utils';
import { routes as homeRoutes } from './pages/home';
import { routes as loginRoutes } from './pages/login';
import { routes as registerRoutes } from './pages/register';
const NotFound = dynamic(import('./pages/common/not-found'));
const IndexLayout = dynamic(import('./layout/index-layout'));

const routes = [
  {
    path: '/',
    component: IndexLayout,
    meta: { auth: true },
    routes: [
      ...homeRoutes,
      ...loginRoutes,
      ...registerRoutes,
      {
        path: '*',
        // eslint-disable-next-line react/display-name
        component: NotFound
      }
    ]
  }
];

export { routes };
