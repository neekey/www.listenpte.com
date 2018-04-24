export function needToLogin(path = '') {
  return !path.includes('login');
}
