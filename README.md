# Gestion du parc informatique

Application Vue 3 pour inventorier un parc d’ordinateurs. Les données restent dans le navigateur : aucun serveur ni base de données externe n’est utilisé.

## Installation et lancement

Prérequis : Node.js 20.19+ ou 22.12+.

```sh
npm install
npm run dev
```

Ouvrir l’URL locale affichée par Vite. Pour vérifier ou prévisualiser une version de production :

```sh
npm run build
npm run preview
```

## Fonctionnalités

- Liste de cinq ordinateurs exemples avec modèle, processeur, mémoire, stockage, carte graphique et illustration locale.
- Ajout et modification dans un même formulaire, avec validation du modèle, du processeur et des valeurs strictement positives pour la mémoire et le disque.
- Suppression après confirmation, recherche par modèle ou processeur, compteur et tri par mémoire vive.
- Sauvegarde automatique dans `localStorage` sous la clé `parc-informatique-v1`, restaurée au rechargement.
- Interface responsive et thème sombre.

## Organisation

```text
src/
	assets/images/             Illustrations locales des exemples
	components/OrdinateurCard.vue
	data/ordinateurStore.js    Données réactives et persistance locale
	router/index.js            Routes de l’application
	views/ListeOrdinateurs.vue
	views/EditOrdinateur.vue
	App.vue
	main.js
```

Routes : `/ordinateurs`, `/ordinateurs/ajouter` et `/ordinateurs/modifier/:id`.

## Compte rendu

`OrdinateurCard.vue` reçoit un ordinateur par prop et émet les événements de modification et de suppression. `ListeOrdinateurs.vue` gère la recherche, le tri, le compteur et la confirmation de suppression. `EditOrdinateur.vue` sert aux deux routes du formulaire; la route fournit l’identifiant en mode modification. Le store centralise les exemples, les opérations CRUD et la synchronisation avec `localStorage`.

Le principal point d’attention était de garder le formulaire commun synchronisé lors du changement de route, tout en préservant les données locales au rechargement. Les illustrations des exemples sont des SVG locaux afin que la démonstration ne dépende pas d’images distantes.

## Captures

- Liste des ordinateurs : `screenshots/liste-ordinateurs.png`
- Ajout avec formulaire vide : `screenshots/ajout-ordinateur.png`
- Modification avec champs préremplis : `screenshots/modification-ordinateur.png`
