<template>
  <form method="POST" class="uk-form-inline" @submit.prevent="updateProject">
    <div
      uk-grid
      class="uk-child-width-1-2@m uk-grid-large uk-light uk-margin-large-bottom"
    >
      <div>
        <label for="title" class="uk-form-label">Titre du projet</label>
        <div class="uk-form-controls">
          <input
            v-model="project.title"
            required
            placeholder="Titre"
            type="text"
            name="title"
            class="uk-input"
          />
        </div>
      </div>
      <div>
        <label for="repository" class="uk-form-label">Dépôt du projet</label>
        <div class="uk-form-controls">
          <input
            v-model="project.repository"
            placeholder="dépôt"
            type="url"
            name="repository"
            class="uk-input"
          />
        </div>
        <p class="uk-text-muted">Ce champ est optionnel.</p>
      </div>
      <div>
        <label for="demo" class="uk-form-label">Demo du projet</label>
        <div class="uk-form-controls">
          <input
            v-model="project.demo"
            placeholder="démo"
            type="url"
            name="demo"
            class="uk-input"
          />
        </div>
        <p class="uk-text-muted">Ce champ est optionnel.</p>
      </div>
      <div>
        <label for="imageLink" class="uk-form-label"
          >Lien vers l’image d’exemple</label
        >
        <div class="uk-form-controls">
          <input
            v-model="project.imageLink"
            required
            placeholder="lien vers l’image"
            type="url"
            name="imageLink"
            class="uk-input"
          />
        </div>
      </div>
    </div>
    <label class="uk-form-label uk-light">Description du projet</label>
    <rich-editor v-model="project.description" />

    <div class="uk-margin-medium-top uk-text-center">
      <input
        type="submit"
        value="Ajouter le projet"
        class="uk-button uk-button-primary"
      />
    </div>
  </form>
</template>

<script>
import RichEditor from '~/components/utility/RichEditor'

export default {
  name: 'ChangeProjectForm',

  components: {
    RichEditor
  },

  props: {
    project: {
      type: Object,
      default() {
        return {
          title: '',
          repository: '',
          demo: '',
          imageLink: '',
          description: ''
        }
      }
    }
  },

  methods: {
    async updateProject() {
      try {
        await this.$axios.$put('/projects/' + this.project.id, this.project)
        this.project = {
          title: '',
          repository: '',
          demo: '',
          imageLink: '',
          description: ''
        }
        this.$uikit.notification('Projet modifié', { status: 'success' })
      } catch (err) {
        if (err.response.statusCode === 404) {
          this.$uikit.notification('Erreur, ressource non trouvé.', {
            status: 'danger'
          })
        } else if (err.response.statusCode === 500) {
          this.$uikit.notification('Erreur interne.', { status: 'danger' })
        } else {
          this.$uikit.notification('Erreur inconnue.', { status: 'danger' })
        }
      }
    }
  }
}
</script>
