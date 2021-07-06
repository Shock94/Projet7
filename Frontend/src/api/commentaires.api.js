import { httpAuthClient } from './http-client';

export const createCommentaire = (articleId, contenu) => httpAuthClient.post(`/articles/${articleId}/commentaires`, { contenu });

export const getCommentaires = articleId => httpAuthClient.get(`/articles/${articleId}/commentaires`);

export const deleteCommentaire = (articleId, commentaireId) => httpAuthClient.delete(`/articles/${articleId}/commentaires/${commentaireId}`);
