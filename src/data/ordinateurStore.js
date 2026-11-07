import { computed, ref } from 'vue'
import latitudePhoto from '../assets/images/latitude.svg?no-inline'
import thinkpadPhoto from '../assets/images/thinkpad.svg?no-inline'
import zenbookPhoto from '../assets/images/zenbook.svg?no-inline'
import precisionPhoto from '../assets/images/precision.svg?no-inline'
import elitebookPhoto from '../assets/images/elitebook.svg?no-inline'

const STORAGE_KEY = 'parc-informatique-v1'
const photosExemples = {
  'latitude.svg': latitudePhoto,
  'thinkpad.svg': thinkpadPhoto,
  'zenbook.svg': zenbookPhoto,
  'precision.svg': precisionPhoto,
  'elitebook.svg': elitebookPhoto,
}

const exemples = [
  { id: 'pc-001', modele: 'Dell Latitude 5450', processeur: 'Intel Core Ultra 5 135U', memoire: 16, disque: 512, carteGraphique: 'Intel Graphics', photo: 'latitude.svg' },
  { id: 'pc-002', modele: 'Lenovo ThinkPad T14', processeur: 'AMD Ryzen 7 PRO 7840U', memoire: 32, disque: 1000, carteGraphique: 'AMD Radeon 780M', photo: 'thinkpad.svg' },
  { id: 'pc-003', modele: 'ASUS Zenbook 14', processeur: 'Intel Core Ultra 7 155H', memoire: 16, disque: 1000, carteGraphique: 'Intel Arc Graphics', photo: 'zenbook.svg' },
  { id: 'pc-004', modele: 'Dell Precision 3590', processeur: 'Intel Core Ultra 7 165H', memoire: 32, disque: 1000, carteGraphique: 'NVIDIA RTX 1000 Ada', photo: 'precision.svg' },
  { id: 'pc-005', modele: 'HP EliteBook 840 G11', processeur: 'Intel Core Ultra 5 125U', memoire: 16, disque: 512, carteGraphique: 'Intel Graphics', photo: 'elitebook.svg' },
]

function isOrdinateur(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.modele === 'string'
    && typeof value.processeur === 'string'
    && typeof value.memoire === 'number'
    && typeof value.disque === 'number'
    && typeof value.carteGraphique === 'string'
    && typeof value.photo === 'string'
}

function lireOrdinateurs() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.every(isOrdinateur)) return parsed
    }
  } catch (error) {
    console.warn('Le parc enregistré est illisible. Les exemples sont chargés.', error)
  }

  return [...exemples]
}

export const ordinateurs = ref(lireOrdinateurs())
export const totalOrdinateurs = computed(() => ordinateurs.value.length)

export function obtenirPhoto(photo) {
  return photosExemples[photo] || photo
}

function sauvegarder() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordinateurs.value))
  } catch (error) {
    console.error('Impossible de sauvegarder le parc informatique.', error)
  }
}

export function ajouterOrdinateur(donnees) {
  ordinateurs.value.unshift({ ...donnees, id: crypto.randomUUID() })
  sauvegarder()
}

export function modifierOrdinateur(id, donnees) {
  const index = ordinateurs.value.findIndex((ordinateur) => ordinateur.id === id)
  if (index === -1) return false

  ordinateurs.value[index] = { ...donnees, id }
  sauvegarder()
  return true
}

export function supprimerOrdinateur(id) {
  ordinateurs.value = ordinateurs.value.filter((ordinateur) => ordinateur.id !== id)
  sauvegarder()
}

export function trouverOrdinateur(id) {
  return ordinateurs.value.find((ordinateur) => ordinateur.id === id)
}