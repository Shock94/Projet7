<template>
  <nav class="blocHeader">
    <div class="logo">
      <img src="../../src/assets/Groupomania_Logo/icon-left-font.png" alt="Groupomania">
    </div>
    <div class="lienMenu">
      <ul>
        <li v-if="isAuthenticated"><router-link to="/articles/creer">Créer un article</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/">Accueil</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/inscription">Inscription</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/connexion">Connexion</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isAuthenticated: Boolean,
  },
}
</script>

<style>

a {
    text-decoration: none;
}

.blocHeader {
    display: flex;
    justify-content: center;
    border-bottom: 2px black solid;
    width: 100%;
    height: 150px;
}

.logo {
    margin-top: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 58%;
    margin-right: 5%;
}

.logo img {
    width: 100%;
    height: 100%;
    object-fit: cover; /*rend l'image plus net*/ 
}

.lienMenu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    font-size: x-large;
}

.lienMenu a {
    display: flex;
    align-items: center;
    color: black;
    margin-right: 15%;
}

ul {
    list-style-type: none;
    display: flex;
}

li {
    display: flex;
    margin-right: 15%;
}

@media all and (max-width: 1024px) {  /*Petit ecran*/
  .blocHeader {
    place-content: flex-start;
  }
}
</style>