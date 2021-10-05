<template>
    <div class="blocPrincipal1">
      <div v-for="article in articles" :key="article.id" class="article">
        <div class="titre1">
          <router-link :to="{ name: 'Article', params: { id: article.id } }">
            {{ article.titre }}
          </router-link>
        </div>
        <div class="image1">
          <img :src="getArticleImageUrl(article.image_url)" alt="Image article"> 
        </div>
        <div class="texte1">
          {{ article.contenu }}
        </div>
      </div>
      <div class="blocFooter">
        <div class="footerImage">
          <img src="../../src/assets/Groupomania_Logo/icon-left-font.png" alt="logo">
        </div>
        <div class="textFooter">
          Copyright 2021
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

.blocPrincipal1 {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
}

.info1{
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.5em;
}

.article {
    /*border-top: 3px darkgrey solid;*/
    border-bottom: darkgrey 1px solid;
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
    border-bottom: 1px solid grey;
}

.image1 {
    height: 300px;
    width: 100%;
}

.image1 img {
  height: 100%;
  width: 100%;
  object-fit: cover; /*rend l'image plus net*/
}

.texte1 {
    /*border: 1px solid grey;*/
    height: auto;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 5px;
}

.blocFooter {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
}

.footerImage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 58%;
    margin-right: 5%;
}

.blocFooter img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.textFooter {
  font-size: large;
  font-weight: bold;
}


</style>