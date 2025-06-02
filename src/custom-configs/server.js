const Config = {
  API_URL: process.env.REACT_APP_API_URL,
  DOMAIN_URL: process.env.REACT_APP_DOMAIN_URL
};

const config = {
  ...Config,
  DEFAULT_REQUEST_TIMEOUT: 30000
};

export default config;
