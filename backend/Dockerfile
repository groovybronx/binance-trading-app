FROM node:18-alpine

# Installer les dépendances système nécessaires
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8000
CMD ["npm", "start"]