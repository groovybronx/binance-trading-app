const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Ajouter bcrypt pour le hachage des mots de passe

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

// Modèle utilisateur
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Route d'inscription
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hacher le mot de passe
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Créer un nouvel utilisateur
  const newUser = new User({ username, hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});