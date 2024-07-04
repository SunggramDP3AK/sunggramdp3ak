// server.js - Kode sisi server

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCT2xu39-AfZKv1KDI3isG5xDZkm9kZoPw",
  authDomain: "projectdp3ak.firebaseapp.com",
  projectId: "projectdp3ak",
  storageBucket: "projectdp3ak.appspot.com",
  messagingSenderId: "602000338998",
  appId: "1:602000338998:web:f33f8953b3690c67efa897"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Initialize Express app
const app = express();

// Proxy middleware configuration
app.use('/api', createProxyMiddleware({ 
  target: 'https://firebasestorage.googleapis.com', 
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

// Route to fetch files
app.get('/files', async (req, res) => {
  try {
    const querySnapshot = await db.collection("files").get();
    const files = querySnapshot.docs.map(doc => doc.data());
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define the server port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));