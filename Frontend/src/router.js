import { createRouter, createWebHistory } from 'vue-router';

import { hasUserToken } from './user-token';

import Connexion from './components/Connexion.vue';
import Inscription from './components/Inscription.vue';
import Articles from './components/Articles.vue';
import CreerArticle from './components/CreerArticle.vue';
import Article from './components/Article.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/articles', name: 'Accueil' },
    { path: '/inscription', component: Inscription, name: 'Inscription' },
    { path: '/connexion', component: Connexion, name: 'Connexion' },
    { path: '/articles', component: Articles, name: 'Articles' },
    { path: '/articles/creer', component: CreerArticle, name: 'CreerArticle' },
    { path: '/articles/:id', component: Article, name: 'Article' },
  ],
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = hasUserToken();
  const isPageRestricted = to.name !== 'Connexion' && to.name !== 'Inscription';

  // Si page réservée aux utilisateurs connectés et a pas de token: on redirige vers la connexion
  if (isPageRestricted && !isAuthenticated) {
    next({ name: 'Connexion' });
  // Si page réservée aux visiteurs (utilisateurs non-connectés) et a un token: on redirige vers l'accueil
  } else if (!isPageRestricted && isAuthenticated) {
    next({ name: 'Accueil' });
  } else {
    next();
  }
});
