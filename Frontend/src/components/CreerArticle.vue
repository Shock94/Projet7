<template>
    <div class="blocPrincipal1">
        <div class="blocArticle">
            <div class="formArticle">
                <div v-if="messageSuccess" class="formSignup">
                    <h1>Création réussie !</h1>
                    <p>{{ messageSuccess }}</p>
                </div>
                <form v-if="!messageSuccess" v-on:submit.prevent="submitForm">
                    <div v-if="messageFailure">
                        Echec : {{ messageFailure }}
                    </div>
                    <div class="titre">
                        <label for="titre">Titre</label>
                        <input v-model="form.titre" required>
                    </div>
                    <div class="image">
                        <label for="image">Image</label>
                        <input type="file" @change="onSelectImage">
                        <span v-if="imageTypeNotSupported">Format image incorrect: {{ imageTypeNotSupported }}</span>
                        <img v-if="form.image" alt="Image Preview" :src="form.image" width="300" height="200">
                    </div>
                    <div class="texte">
                        <label for="texte">Texte</label>
                        <textarea v-model="form.texte" placeholder="Votre contenu" rows=15 cols=40 required></textarea>
                    </div>
                    <div class="bouton">
                        <button type="submit" :disabled="isFormSubmitDisabled()">Créer mon Article</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import * as articlesApi from '../api/articles.api';
import { router } from '../router';

export default {
  name: 'CreerArticle',
  data() {
    return {
      form: {
        titre: '',
        texte: '',
        image: '',
      },
      imageTypeNotSupported: null,
      messageFailure: null,
      messageSuccess: null,
    };
  },
  methods: {
    isFormSubmitDisabled() {
        return !this.form.titre || !this.form.texte || !this.form.image;
    },
    async onSelectImage(event) {
        const imageFile = event.target.files[0];

        if (!imageFile) {
            return;
        }

        if (imageFile && !['image/jpeg', 'image/png'].includes(imageFile.type)) {
            this.imageTypeNotSupported = imageFile.type;
            return;
        }

        this.imageTypeNotSupported = null;

        const imageAsBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });

        this.form.image = imageAsBase64;
    },
    async submitForm() {
        if (this.isFormSubmitDisabled()) {
            return;
        }

        try {
            const { titre, image, texte } = this.form;
            const resp = await articlesApi.createArticle(titre, image, texte);

            this.submitFormHandleSuccess(resp);
        } catch (err) {
            this.submitFormHandleFailure(err);
        }
    },
    submitFormHandleFailure(err) {
      this.messageSuccess = null;
      this.messageFailure = err.response ? err.response.data.error : err.message;
      console.log('FAILURE', err);
    },
    submitFormHandleSuccess(resp) {
        const { articleId } = resp.data;
        this.messageFailure = null;
        this.messageSuccess = `Article ID: ${articleId}`;
        router.push('/');
    },
  },
};
</script>

<style>

a {
    text-decoration: none;
}

.blocPrincipal1 {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
}

form {
    width: 100%;
}

.formArticle {
    width: 100%;
}

label, input {
    margin-bottom: 15px;
    font-size: large;
}

.titre, .image, .texte {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.texte {
    height: 250px;
}

.bouton button {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    border: 1px solid black;
    width: 50%;
}

button {
    margin-top: 10px;
    border-radius: 15px;
}

</style>