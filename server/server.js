import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config(); // This should be at the very top of your file
import authRoutes from './routes/authRoutes.js';




console.log('Loaded ENV: from server', process.env.SECRET_KEY); // This should print your SECRET_KEY

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const dbURI =  "mongodb+srv://group2:group123@malak.mnc9x.mongodb.net/StaySharpDB?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

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
app.use(express.static(path.join(__dirname, '../client/src')));

// // Serve static files from the "client" directory
// app.use(express.static(path.join(__dirname, 'client')));

app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

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

// Mount authRoutes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});