# Common Mistakes

Voici les erreurs les plus frequentes sur ce projet.

## Frontend visuel

- utiliser un fond blanc pur au lieu d'un creme doux
- utiliser des couleurs hors palette
- mettre trop de boutons dans le hero
- oublier que la navbar desktop finale est sombre et alignee a gauche

## Mobile

- laisser trop de liens visibles dans la barre
- oublier le menu hamburger
- ne pas adapter le hero a la hauteur visible
- couper les produits dans le carousel

## Produits

- laisser un grand titre sur la page produits au lieu de garder seulement `Collection`
- afficher la description dans les cartes produit
- afficher plus que photo + nom dans le carousel homepage

## Detail produit

- utiliser une police differente pour le nom
- dupliquer le mouvement
- ne pas distinguer la categorie et la marque avec des couleurs d'accent

## Checkout

- miniature produit avec vide blanc autour
- ville en champ texte au lieu d'une liste
- champs obligatoires sans retour visuel

## Backend et integration

- commencer le backend avant d'avoir les pages visibles
- brancher MongoDB avant de bien comprendre les donnees
- connecter l'API trop tot alors que l'interface n'est pas encore stable

## Bon reflexe

Construire dans cet ordre:

1. structure HTML
2. style CSS
3. interactions JavaScript
4. React + Tailwind
5. backend
6. connexion finale
