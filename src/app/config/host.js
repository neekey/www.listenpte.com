export const LOCAL_SERVER_HOST = 'http://localhost:5000';
export const SERVER_HOST = process.env.NODE_ENV ?
  (process.env.SERVER_HOST || LOCAL_SERVER_HOST) : LOCAL_SERVER_HOST;
