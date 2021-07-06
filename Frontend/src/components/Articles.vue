<template>
    <div class="blocPrincipal">
        <p>articles count: {{ articles.length }}</p>
        <div v-for="article in articles" :key="article.id" class="article">
            <div class="titre1">
              <router-link :to="{ name: 'Article', params: { id: article.id } }">
                {{ article.titre }}
              </router-link>
            </div>
            <div class="image1">
                 <img :src="getArticleImageUrl(article.image_url)" alt=""> 
            </div>
            <div class="texte1">
                {{ article.contenu }}
            </div>
        </div>
    </div>
</template>

<script>
import * as articlesApi from '../api/articles.api';
import { BACK_URL } from '../api/http-client';

export default {
  name: 'Articles',
  data() {
    return {
      articles: [],    
    };
  },
  beforeMount() {
    articlesApi.getArticles()
      .then(resp => {
        this.articles = resp.data;
      });
    //   .catch(err => {
    //     // TODO catcher l'erreur
    //   });
  },
  methods: {
    getArticleImageUrl(imageUrl) {
        return BACK_URL + '/images/' + imageUrl;
    },
  },
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

</style>