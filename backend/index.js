const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Pour générer et vérifier les tokens JWT
const crypto = require('crypto'); // Pour le chiffrement des clés API

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
  encryptedApiKey: { type: String }, // Clé API chiffrée
  encryptedApiSecret: { type: String }, // Secret API chiffré
});

const User = mongoose.model('User', userSchema);

// Configuration pour le chiffrement des clés API
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Clé de chiffrement (à stocker dans .env pour la production)
const iv = crypto.randomBytes(16); // Vecteur d'initialisation

// Fonction pour chiffrer les données
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Fonction pour déchiffrer les données
function decrypt(text) {
  const iv = Buffer.from(text.iv, 'hex');
  const encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

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

// Route de connexion
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Trouver l'utilisateur dans la base de données
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Vérifier le mot de passe
  const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Générer un token JWT
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
});

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Route protégée (exemple)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Route pour stocker les clés API (exemple)
app.post('/store-keys', authenticateToken, async (req, res) => {
  const { apiKey, apiSecret } = req.body;

  // Chiffrer les clés API
  const encryptedApiKey = encrypt(apiKey);
  const encryptedApiSecret = encrypt(apiSecret);

  // Trouver l'utilisateur et mettre à jour ses clés API
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.encryptedApiKey = encryptedApiKey.encryptedData;
  user.encryptedApiSecret = encryptedApiSecret.encryptedData;
  await user.save();

  res.status(200).json({ message: 'API keys stored successfully' });
});

// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});