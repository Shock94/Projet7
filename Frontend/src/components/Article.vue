<template>
    <div class="blocPrincipal">
        <div v-if="loading" class="article">
            Loading...
        </div>
        <div v-if="error" class="article">
            Erreur : {{ error }}
        </div>
        <div v-if="!loading && !error" class="article">
            <div class="titre1">
                {{ article.titre }}
            </div>
            <div v-if="canRemoveArticle()">
                <button type="button" v-on:click="removeArticle()">Supprimer</button>
            </div>
            <div class="image1">
                 <img :src="getArticleImageUrl(article.image_url)" alt="">
            </div>
            <div class="texte1">
                {{ article.contenu }}
            </div>
        </div>
        <div v-if="commentaires.length" class="article">
            <div v-for="commentaire in commentaires" :key="commentaire.id" class="blocCommentaire">
                <div v-if="canRemoveCommentaire(commentaire)">
                    <button type="button" v-on:click="removeCommentaire(commentaire)">Supprimer</button>
                </div>
                <div class="commentaire">
                    {{ commentaire.user.email.split("@")[0] }}  : {{ commentaire.contenu }}
                </div>
            </div>
        </div>
        <div class="article">
            <form v-on:submit.prevent="submitForm">
                <div class="texte">
                    <label for="texte">Commentaire</label>
                    <textarea v-model="newComment" placeholder="Commentaire" rows=15 cols=40 required></textarea>
                </div>
                <div class="bouton">
                    <button type="submit">Créer mon Commentaire</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import * as articlesApi from '../api/articles.api';
import * as commentairesApi from '../api/commentaires.api';
import { getUserTokenPayload } from '../user-token';
import { router } from '../router';
import { BACK_URL } from '../api/http-client';

export default {
  name: 'Articles',
  data() {
    return {
      loading: true,
      error: '',
      article: null,
      commentaires: [],
      notFound: false,
      newComment: '',
    };
  },
  beforeMount() {
      const articleId = this.$route.params.id;

      articlesApi.getArticleById(articleId)
        .then(resp => {
          const article = resp.data;

          this.article = article;
          this.loading = false;
    
          return commentairesApi.getCommentaires(article.id);
        })
        .then(resp => {
          const commentaires = resp.data;

          this.commentaires = commentaires;
        })
        .catch(err => {
          this.loading = false;

          if (err && err.response && err.response.status === 404) {
              this.notFound = true;
          } else {
              this.error = err.message;

              console.error(err);
          }
        });
  },
  methods: {
    getArticleImageUrl(imageUrl) {
        return BACK_URL + '/images/' + imageUrl;
    },
    canRemoveArticle() {
        const { userId } = getUserTokenPayload();

        return this.article && this.article.userId === userId;
    },
    canRemoveCommentaire(commentaire) {
        const { userId } = getUserTokenPayload();

        return commentaire.userId === userId;
    },
    async removeArticle() {
        await articlesApi.deleteArticleById(this.article.id);

        router.push('/');
    },
    async removeCommentaire(commentaire) {
        await commentairesApi.deleteCommentaire(this.article.id, commentaire.id);

        this.commentaires = this.commentaires.filter(({ id }) => id !== commentaire.id);
    },
    async submitForm() {
        const articleId = this.$route.params.id;

      try {
        const contenu = this.newComment;

        const resp = await commentairesApi.createCommentaire(articleId, contenu);

        const { userId, email } = getUserTokenPayload();

        this.commentaires = [
            ...this.commentaires,
            {
                id: resp.data.commentaireId,
                contenu,
                createAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                articleId,
                userId,
                user: { id: userId, email },
            },
        ];
      } catch (err) {
        // TODO gérer l'erreur
        console.error(err);
      }
    },
  }
};
</script>

<style>

a {
    text-decoration: none;
}

.blocPrincipal {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    border: 5px solid brown;
}

.article {
    border: 6px green solid;
    width: 80%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;

}

.titre1 {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    border-bottom: 3px solid grey;
}

.image1 {
    height: 200px;
}

.texte1 {
    border: 3px solid black;
    height: auto;
    justify-content: flex-start;
    align-items: center;
}

.blocCommentaire {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid black;
    height: auto;
}

.commentaire {
    height: 50px;
}

</style>