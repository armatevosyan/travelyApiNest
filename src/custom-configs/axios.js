import axios from 'axios';
import { isObjectHasLength } from '@/utils/constants';

const axiosApiInstance = axios.create();
const userData = JSON.parse(localStorage.getItem('userData') || JSON.stringify({}));

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  (config) => {
    try {
      const access_token = localStorage.getItem('accessToken');

      config.headers = {
        Authorization: `Bearer ${access_token}`
      };
      if (isObjectHasLength(userData) || window.location) {
        config.headers.Hostname =
          (window.location.hostname === 'localhost' && 'localhost') ||
          window.location.hostname.split('.').slice(0, -1).join('.').replace('-', '').replace('portal.', '') ||
          window.location.host.split('.').slice(0, -1).join('.').replace('-', '').replace('portal.', '');
        config.headers.Location = window.location.origin;
        // We don't need to set the Origin header
        // config.headers.Origin = window.location.origin;
        config.headers.Protocol = window.location.protocol;
        const subDomain = window.location.host.split('.')[0];
        if (subDomain && subDomain === 'portal') {
          config.headers.subDomain = window.location.hostname;
          config.headers.subDomainProtocol = subDomain;
        }
      }

      return config;
    } catch (e) {
      console.log(e);
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    const refreshToken = response.headers['refresh-token'];

    if (refreshToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshToken;
      localStorage.setItem('accessToken', refreshToken);
      axios.defaults.headers.common['refresh-token'] = '';
    }

    return response;
  },
  async function (error) {
    try {
      const originalRequest = error.config;
      if (error?.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = localStorage.getItem('refresh_token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        // OPEN IF NEEDED
        // return axiosApiInstance(originalRequest);
      }
      if (error?.response?.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        window.location.reload();
      }
      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export default axiosApiInstance;
