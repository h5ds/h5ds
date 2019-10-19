import Loadable from 'react-loadable';
import Loading from '../components/loading';

export function dynamic(compPromise) {
  return Loadable({
    loader: () => compPromise,
    loading: Loading
  });
}
