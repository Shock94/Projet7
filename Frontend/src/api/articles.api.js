import { httpAuthClient } from './http-client';

export const createArticle = (titre, image, contenu) => httpAuthClient.post('/articles', { titre, image, contenu });

export const getArticles = () => httpAuthClient.get('/articles');

export const getArticleById = id => httpAuthClient.get(`/articles/${id}`);

export const deleteArticleById = id => httpAuthClient.delete(`/articles/${id}`);
