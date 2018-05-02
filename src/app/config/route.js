export const PATH_LOGIN = 'login';
export const PATH_SIGNUP = 'signup';
export const PATH_HOME = 'home';

export const PATHS_NOT_NEED_LOGIN = [
  PATH_LOGIN,
  PATH_SIGNUP,
];

export const PATHS_NOT_NEED_INITIAL_DATA = [
  PATH_LOGIN,
  PATH_SIGNUP,
];

export function pathnameMatchPath(pathname, path) {
  const normalisedPathname = pathname.startsWith('/') ?
    pathname.slice(1) : pathname;
  const normalisedPath = path.startsWith('/') ?
    path.slice(1) : path;
  if (normalisedPath === normalisedPathname) {
    return true;
  }
  return normalisedPathname.startsWith(normalisedPath);
}

export function needToLogin(pathname = '') {
  return !PATHS_NOT_NEED_LOGIN.find(path => pathnameMatchPath(pathname, path));
}

export function needInitialData(pathname = '') {
  return !PATHS_NOT_NEED_INITIAL_DATA.find(path => pathnameMatchPath(pathname, path));
}
