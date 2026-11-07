<script setup>
import { Cpu, HardDrive, MemoryStick, Pencil, Trash2 } from '@lucide/vue'
import { obtenirPhoto } from '../data/ordinateurStore.js'

defineProps({
  ordinateur: { type: Object, required: true },
})

const emit = defineEmits(['edit', 'remove'])
</script>

<template>
  <article class="computer-card">
    <div class="computer-card__photo">
      <img v-if="ordinateur.photo" :src="obtenirPhoto(ordinateur.photo)" :alt="`Illustration de ${ordinateur.modele}`" />
      <div v-else class="computer-card__photo-empty" aria-hidden="true"><Cpu :size="36" :stroke-width="1.5" /></div>
      <span class="computer-card__tag">POSTE {{ ordinateur.id.slice(-3) }}</span>
    </div>

    <div class="computer-card__content">
      <p class="eyebrow">Ordinateur portable</p>
      <h2 class="computer-card__model">{{ ordinateur.modele }}</h2>

      <dl class="computer-specs">
        <div class="computer-specs__row"><dt><Cpu :size="15" /> Processeur</dt><dd>{{ ordinateur.processeur }}</dd></div>
        <div class="computer-specs__row"><dt><MemoryStick :size="15" /> Mémoire</dt><dd>{{ ordinateur.memoire }} Go</dd></div>
        <div class="computer-specs__row"><dt><HardDrive :size="15" /> Stockage</dt><dd>{{ ordinateur.disque }} Go</dd></div>
        <div class="computer-specs__row computer-specs__row--graphics"><dt>Carte graphique</dt><dd>{{ ordinateur.carteGraphique || 'Non renseignée' }}</dd></div>
      </dl>

      <div class="computer-card__actions">
        <button class="button button--quiet" type="button" @click="emit('edit', ordinateur.id)"><Pencil :size="15" /> Modifier</button>
        <button class="button button--danger-quiet" type="button" :aria-label="`Supprimer ${ordinateur.modele}`" @click="emit('remove', ordinateur)"><Trash2 :size="15" /> Supprimer</button>
      </div>
    </div>
  </article>
</template>