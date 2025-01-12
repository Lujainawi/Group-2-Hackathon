import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.js';

const app = express();

// Connect to MongoDB
const dbURI =  "mongodb+srv://group2:group123@malak.mnc9x.mongodb.net/StaySharpDB?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/public'));




// POST route for signup
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists!' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        console.log('User registered successfully!');
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during signup.' });
    }
});

// POST route for login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
        console.log('User registered successfully!');
        res.status(200).json({ message: 'Login successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
