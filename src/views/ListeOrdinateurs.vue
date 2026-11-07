<script setup>
import { computed, ref } from 'vue'
import { ArrowDownAZ, Laptop, Plus, Search, X } from '@lucide/vue'
import OrdinateurCard from '../components/OrdinateurCard.vue'
import { ordinateurs, supprimerOrdinateur, totalOrdinateurs } from '../data/ordinateurStore.js'

const recherche = ref('')
const tri = ref('modele')

const ordinateursFiltres = computed(() => {
  const terme = recherche.value.trim().toLocaleLowerCase('fr')
  return ordinateurs.value
    .filter((ordinateur) => `${ordinateur.modele} ${ordinateur.processeur}`.toLocaleLowerCase('fr').includes(terme))
    .sort((a, b) => {
      if (tri.value === 'memoire-desc') return b.memoire - a.memoire || a.modele.localeCompare(b.modele, 'fr')
      if (tri.value === 'memoire-asc') return a.memoire - b.memoire || a.modele.localeCompare(b.modele, 'fr')
      return a.modele.localeCompare(b.modele, 'fr')
    })
})

function confirmerSuppression(ordinateur) {
  if (window.confirm(`Supprimer « ${ordinateur.modele} » du parc ?`)) {
    supprimerOrdinateur(ordinateur.id)
  }
}
</script>

<template>
  <main class="page-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/ordinateurs" aria-label="Accueil du parc informatique">
        <span class="brand__mark"><Laptop :size="19" :stroke-width="2" /></span>
        <span class="brand__name">NORD<span class="brand__slash">/</span>IT</span>
      </RouterLink>
      <div class="topbar__meta"><span class="status-dot"></span> Gestion du matériel</div>
      <span class="topbar__edition">INVENTAIRE 2025</span>
    </header>

    <section class="intro-band">
      <div class="intro-band__inner">
        <div class="intro-band__copy">
          <p class="eyebrow eyebrow--light">Votre parc, en un coup d'œil</p>
          <h1>Parc informatique<span class="title-period">.</span></h1>
          <p class="intro-band__description">Suivez les équipements et gardez leurs caractéristiques à jour.</p>
        </div>
        <div class="inventory-total" aria-live="polite">
          <span class="inventory-total__number">{{ totalOrdinateurs }}</span>
          <span class="inventory-total__label">{{ totalOrdinateurs > 1 ? 'ordinateurs' : 'ordinateur' }}<br />en inventaire</span>
        </div>
        <RouterLink class="button button--accent intro-band__add" to="/ordinateurs/ajouter"><Plus :size="18" :stroke-width="2.5" /> Ajouter un ordinateur</RouterLink>
      </div>
    </section>

    <section class="inventory-section" aria-labelledby="inventory-heading">
      <div class="section-heading">
        <div><p class="eyebrow">Inventaire matériel</p><h2 id="inventory-heading">Les équipements <span class="section-count">{{ ordinateursFiltres.length }}</span></h2></div>
        <div class="inventory-controls">
          <label class="search-field"><Search :size="17" aria-hidden="true" /><input v-model="recherche" type="search" placeholder="Modèle ou processeur" aria-label="Rechercher par modèle ou processeur" /><button v-if="recherche" class="search-field__clear" type="button" aria-label="Effacer la recherche" @click="recherche = ''"><X :size="15" /></button></label>
          <label class="sort-field"><ArrowDownAZ :size="17" aria-hidden="true" /><select v-model="tri" aria-label="Trier les ordinateurs"><option value="modele">Modèle A à Z</option><option value="memoire-desc">Mémoire : décroissante</option><option value="memoire-asc">Mémoire : croissante</option></select></label>
        </div>
      </div>

      <div v-if="ordinateursFiltres.length" class="computer-grid">
        <OrdinateurCard v-for="ordinateur in ordinateursFiltres" :key="ordinateur.id" :ordinateur="ordinateur" @edit="$router.push(`/ordinateurs/modifier/${$event}`)" @remove="confirmerSuppression" />
      </div>
      <div v-else class="empty-state">
        <span class="empty-state__icon"><Search :size="24" /></span>
        <h3>{{ recherche ? 'Aucun résultat' : 'Le parc est vide' }}</h3>
        <p>{{ recherche ? 'Essayez un autre modèle ou processeur.' : 'Ajoutez un premier ordinateur pour commencer l’inventaire.' }}</p>
        <button v-if="recherche" class="button button--quiet" type="button" @click="recherche = ''">Effacer la recherche</button>
        <RouterLink v-else class="button button--primary" to="/ordinateurs/ajouter"><Plus :size="17" /> Ajouter un ordinateur</RouterLink>
      </div>
    </section>

    <footer class="page-footer"><span><span class="status-dot"></span> Données sauvegardées sur cet appareil</span><span>Parc informatique <span class="footer-slash">/</span> Vue d’ensemble</span></footer>
  </main>
</template>