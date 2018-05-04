import { useRouterHistory } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

export default useRouterHistory(createHistory)({
  basename: `${document.location.protocol}//${document.location.host}`,
});
