import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoose = require('mongoose');
const app = express();
// connect to MongoDB
const dbURI = "mongodb+srv://group2:group123@malak.mnc9x.mongodb.net/StaySharpDB?retryWrites=true&w=majority&appName=Malak";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
// Middleware
app.use(cors());
app.use(express.json());

// Static files for the client
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Catch-all route for the main HTML
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});