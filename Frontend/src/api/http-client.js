import axios from 'axios';

import { getUserToken } from '../user-token';

export const BACK_URL = 'http://localhost:3000';

export const setAuthorizationTransformer = (data, headers) => {
  const token = getUserToken();

  if (!token) {
    throw new Error(`User has no token`);
  }

  headers['Authorization'] = `Bearer ${token}`;

  return JSON.stringify(data);
};

export const httpClient = axios.create({
  baseURL: BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const httpAuthClient = axios.create({
  baseURL: BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: setAuthorizationTransformer,
});
