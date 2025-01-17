import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname and __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/public')));

// Serve the OnlineFriendshopsScenario.json file
app.get('/OnlineFriendshipsScenario.json', (req, res) => {
    const filePath = path.join(__dirname, '../OnlineFriendshipsScenario.json');
    res.sendFile(filePath);
});

app.get('/CommunityInvolvementScenario.json', (req, res) => {
    const filePath = path.join(__dirname, '../CommunityInvolvementScenario.json');
    res.sendFile(filePath);
});

app.get('/SchoolDynamicsScenario.json', (req, res) => {
    const filePath = path.join(__dirname, '../SchoolDynamicsScenario.json');
    res.sendFile(filePath);
});

// Handle default route (for single-page apps or fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});