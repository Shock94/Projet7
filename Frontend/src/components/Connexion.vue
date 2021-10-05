<template>
  <div class="blocPrincipal">
    <div class="info">
          Veuillez vous connecter si vous avez un compte Groupomania.<br>
          Sinon veuillez créer un compte.
    </div>
    <div v-if="messageSuccess" class="formSignup">
      <h1>Connexion réussie !</h1>
      <p><router-link to="/">Accueil</router-link></p>
    </div>
    <div v-if="!messageSuccess" class="formSignup">
      <form v-on:submit.prevent="submitForm">
        <div v-if="messageFailure">
          Echec : {{ messageFailure }}
        </div>
        <div class="email">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" required>
        </div>
        <div class="password">
          <label for="password">Password</label>
          <input v-model="form.password" type="password" required>
        </div>
        <div id="bouton">
          <button type="submit">LOGIN</button>
        </div>
      </form>
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
import * as authApi from '../api/auth.api';
import { router } from '../router';
import { setUserToken } from '../user-token';

export default {
  name: 'Connexion',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      messageFailure: null,
      messageSuccess: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const { email, password } = this.form;
        const resp = await authApi.login(email, password);

        this.submitFormHandleSuccess(resp);
      } catch (err) {
        this.submitFormHandleFailure(err);
      }
    },
    submitFormHandleFailure(err) {
      this.messageSuccess = null;
      this.messageFailure = err.response ? err.response.data.error : err.message;
    },
    submitFormHandleSuccess(resp) {
      const { token, userId } = resp.data;
      this.messageFailure = null;
      this.messageSuccess = `User ID: ${userId} - Token: ${token}`;
      setUserToken(token);
      router.push('/');
    },
  },
};
</script>

<style>

.blocPrincipal {
    display: flex;
    justify-content: center;
    height: 300px;
    width: 100%;
}

.formSignup {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70%;
}

form {
    width: 70%;
}

label, input {
    margin-bottom: 15px;
    font-size: large;
}

.email, .password {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.bouton input {
    border-radius: 10%;
    width: 15%;
}

p {
    display: flex;
    justify-content: center;
}

</style>