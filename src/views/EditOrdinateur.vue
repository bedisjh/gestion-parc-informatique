<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ImagePlus, Save } from '@lucide/vue'
import { ajouterOrdinateur, modifierOrdinateur, obtenirPhoto, trouverOrdinateur } from '../data/ordinateurStore.js'

const route = useRoute()
const router = useRouter()
const erreur = ref('')
const id = computed(() => typeof route.params.id === 'string' ? route.params.id : null)
const modeEdition = computed(() => id.value !== null)
const ordinateurExiste = computed(() => !id.value || Boolean(trouverOrdinateur(id.value)))
const formulaire = reactive({ modele: '', processeur: '', memoire: null, disque: null, carteGraphique: '', photo: '' })

watch(id, (ordinateurId) => {
  erreur.value = ''
  const ordinateur = ordinateurId ? trouverOrdinateur(ordinateurId) : undefined
  Object.assign(formulaire, ordinateur ? { ...ordinateur } : {
    modele: '', processeur: '', memoire: null, disque: null, carteGraphique: '', photo: '',
  })
}, { immediate: true })

function enregistrer() {
  const modele = formulaire.modele.trim()
  const processeur = formulaire.processeur.trim()
  const memoire = Number(formulaire.memoire)
  const disque = Number(formulaire.disque)

  if (!modele || !processeur) {
    erreur.value = 'Le modèle et le processeur sont obligatoires.'
    return
  }
  if (!Number.isFinite(memoire) || memoire <= 0 || !Number.isFinite(disque) || disque <= 0) {
    erreur.value = 'La mémoire et le stockage doivent être strictement positifs.'
    return
  }

  const donnees = {
    modele,
    processeur,
    memoire,
    disque,
    carteGraphique: formulaire.carteGraphique.trim(),
    photo: formulaire.photo.trim(),
  }

  if (id.value) {
    if (!modifierOrdinateur(id.value, donnees)) return
  } else {
    ajouterOrdinateur(donnees)
  }

  router.push('/ordinateurs')
}
</script>

<template>
  <main class="page-shell page-shell--form">
    <header class="topbar">
      <RouterLink class="brand" to="/ordinateurs" aria-label="Retour au parc informatique"><span class="brand__mark"><ImagePlus :size="19" :stroke-width="2" /></span><span class="brand__name">NORD<span class="brand__slash">/</span>IT</span></RouterLink>
      <div class="topbar__meta"><span class="status-dot"></span> Gestion du matériel</div>
      <span class="topbar__edition">{{ modeEdition ? 'MODIFICATION' : 'NOUVEL ÉQUIPEMENT' }}</span>
    </header>

    <section class="form-intro">
      <RouterLink class="back-link" to="/ordinateurs"><ArrowLeft :size="16" /> Retour à l’inventaire</RouterLink>
      <p class="eyebrow">{{ modeEdition ? 'Mettre à jour la fiche' : 'Enrichir votre inventaire' }}</p>
      <h1>{{ modeEdition ? 'Modifier l’ordinateur' : 'Ajouter un ordinateur' }}<span class="title-period">.</span></h1>
      <p class="form-intro__description">Renseignez les caractéristiques de l’équipement.</p>
    </section>

    <section v-if="!ordinateurExiste" class="not-found-state"><h2>Ordinateur introuvable</h2><p>Cette fiche n’existe plus dans l’inventaire.</p><RouterLink class="button button--primary" to="/ordinateurs">Revenir à la liste</RouterLink></section>

    <form v-else class="computer-form" novalidate @submit.prevent="enregistrer">
      <section class="form-section" aria-labelledby="identity-heading">
        <div class="form-section__heading"><span class="form-section__index">01</span><div><h2 id="identity-heading">Identification</h2><p>Modèle et configuration principale</p></div></div>
        <div class="form-fields">
          <label class="form-field form-field--wide"><span>Modèle <span class="required-mark">*</span></span><input v-model="formulaire.modele" name="modele" type="text" placeholder="Ex. Dell Latitude 5450" autocomplete="off" required /></label>
          <label class="form-field form-field--wide"><span>Processeur <span class="required-mark">*</span></span><input v-model="formulaire.processeur" name="processeur" type="text" placeholder="Ex. Intel Core Ultra 5" autocomplete="off" required /></label>
          <label class="form-field"><span>Mémoire vive <span class="required-mark">*</span></span><span class="input-with-unit"><input v-model.number="formulaire.memoire" name="memoire" type="number" min="0.01" step="any" placeholder="16" required /><span>Go</span></span></label>
          <label class="form-field"><span>Stockage <span class="required-mark">*</span></span><span class="input-with-unit"><input v-model.number="formulaire.disque" name="disque" type="number" min="0.01" step="any" placeholder="512" required /><span>Go</span></span></label>
          <label class="form-field form-field--wide"><span>Carte graphique</span><input v-model="formulaire.carteGraphique" name="carteGraphique" type="text" placeholder="Ex. Intel Graphics" autocomplete="off" /></label>
        </div>
      </section>

      <section class="form-section form-section--photo" aria-labelledby="photo-heading">
        <div class="form-section__heading"><span class="form-section__index">02</span><div><h2 id="photo-heading">Visuel</h2><p>Ajoutez une URL ou un chemin d’image</p></div></div>
        <label class="form-field form-field--wide"><span>Photo de l’ordinateur</span><input v-model="formulaire.photo" name="photo" type="text" placeholder="https://… ou /images/ordinateur.jpg" autocomplete="off" /></label>
        <div v-if="formulaire.photo" class="photo-preview"><img :src="obtenirPhoto(formulaire.photo)" alt="Aperçu de la photo de l’ordinateur" /><span>Aperçu</span></div>
      </section>

      <p v-if="erreur" class="form-error" role="alert">{{ erreur }}</p>
      <div class="form-actions"><RouterLink class="button button--quiet" to="/ordinateurs">Annuler</RouterLink><button class="button button--primary" type="submit"><Save :size="17" /> Enregistrer</button></div>
    </form>

    <footer class="page-footer page-footer--form"><span><span class="status-dot"></span> Données sauvegardées sur cet appareil</span><span>Parc informatique <span class="footer-slash">/</span> {{ modeEdition ? 'Modification' : 'Ajout' }}</span></footer>
  </main>
</template>