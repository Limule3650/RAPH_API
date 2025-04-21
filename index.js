const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const {
  API_KEY,
  GITHUB_USERNAME,
  REPO_NAME,
  BRANCH
} = process.env;

// Middleware auth
app.use((req, res, next) => {
  const key = req.query.key;
  if (key !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Liste des outils
app.get('/tools', async (req, res) => {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/tools?ref=${BRANCH}`;
    const response = await axios.get(url);
    const tools = response.data.map(file => ({
      name: file.name,
      download_url: file.download_url
    }));
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des fichiers." });
  }
});

// Téléchargement d'un outil
app.get('/tools/:filename', async (req, res) => {
  const { filename } = req.params;
  const fileUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH}/tools/${filename}`;
  try {
    const file = await axios.get(fileUrl);
    res.send(file.data);
  } catch (err) {
    res.status(404).json({ error: "Fichier introuvable." });
  }
});

app.listen(port, () => {
  console.log(`Limule Api ready on http://localhost:${port}`);
});