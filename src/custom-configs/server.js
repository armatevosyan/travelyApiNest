// In development, empty API_URL uses package.json "proxy" to backend (no CORS). Set REACT_APP_API_URL to override.
const Config = {
  API_URL: process.env.REACT_APP_API_URL ?? (process.env.NODE_ENV === 'development' ? '' : ''),
  DOMAIN_URL: process.env.REACT_APP_DOMAIN_URL
};

const config = {
  ...Config,
  DEFAULT_REQUEST_TIMEOUT: 30000
};

export default config;
