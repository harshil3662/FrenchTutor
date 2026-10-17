import app from '../server.js';

export default function handler(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const apiPath = url.searchParams.get('vercelApiPath');

  if (apiPath === null) {
    return app(req, res);
  }

  url.searchParams.delete('vercelApiPath');
  const routePath = apiPath.split('/').map(encodeURIComponent).join('/');
  req.url = `/api/${routePath}${url.search}`;

  return app(req, res);
}
