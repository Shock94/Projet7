<template>
  <div class="blocPrincipal">
    <div class="info">
      Veuillez vous inscrire si vous n'avez pas encore crée de compte chez Groupomania. <br>
      Sinon veuillez vous connecter.
    </div>
    <div v-if="messageSuccess" class="formSignup">
      <h1>Bienvenu {{ form.email }} !</h1>
      <p>{{ messageSuccess }}</p>
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
          <button type="submit">SIGN UP</button>
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

export default {
  name: 'Inscription',
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
        const resp = await authApi.signUp(email, password);

        this.submitFormHandleSuccess(resp);
      } catch (err) {
        this.submitFormHandleFailure(err);
      }
    },
    submitFormHandleFailure(err) {
      this.messageSuccess = null;
      this.messageFailure = err.response ? err.response.data.error : err.message;
    },
    submitFormHandleSuccess() {
      this.messageFailure = null;
      this.messageSuccess = 'Félicitation pour votre inscription.';
    },
  },
};
</script>

<style>

.blocPrincipal {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

.info {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.5em;
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
  font-size: x-large;
  display: flex;
  justify-content: center;
}

button {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  color: brown;
}

</style>