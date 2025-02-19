# Étape 1 : Utiliser une image de base Node.js
FROM node:18-alpine AS build

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du code
COPY . .

# Étape 6 : Construire l'application
RUN npm run build

# Étape 7 : Utiliser une image légère pour servir l'application
FROM nginx:alpine

# Étape 8 : Copier les fichiers construits dans le serveur Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Étape 9 : Exposer le port 80
EXPOSE 80

# Étape 10 : Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]