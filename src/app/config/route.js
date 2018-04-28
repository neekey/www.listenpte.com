export function needToLogin(path = '') {
  return !path.includes('login') && !path.includes('signup');
}

export function needToNotLogin(path = '') {
  return path.includes('login') || path.includes('signup');
}
