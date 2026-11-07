import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/ordinateurs' },
    {
      path: '/ordinateurs',
      name: 'ordinateurs',
      component: () => import('../views/ListeOrdinateurs.vue'),
    },
    {
      path: '/ordinateurs/ajouter',
      name: 'ajouter-ordinateur',
      component: () => import('../views/EditOrdinateur.vue'),
    },
    {
      path: '/ordinateurs/modifier/:id',
      name: 'modifier-ordinateur',
      component: () => import('../views/EditOrdinateur.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/ordinateurs' },
  ],
})