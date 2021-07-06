import { httpClient } from './http-client';

export const signUp = (email, password) => httpClient.post('/api/signup', { email, password });

export const login = (email, password) => httpClient.post('/api/login', { email, password });
