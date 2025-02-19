// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware pour parser le JSON
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  // Remove deprecated options
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});
// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});