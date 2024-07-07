// server.js - Kode sisi server

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDyW_ZdGwef3GjD-k3zOsZuAg7nVOWBArI",
  authDomain: "projectsunggram.firebaseapp.com",
  projectId: "projectsunggram",
  storageBucket: "projectsunggram.appspot.com",
  messagingSenderId: "1014861551014",
  appId: "1:1014861551014:web:421161502f6aa83ca5ab67",
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