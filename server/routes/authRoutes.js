import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // For hashing passwords
import User from '../models/user.js'; // Make sure the path to your user model is correct
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middlewares/authMiddleware.js';



const SECRET_KEY = process.env.SECRET_KEY;
console.log('Loaded ENV:', process.env.SECRET_KEY); // This should print your SECRET_KEY
const router = express.Router();

router.get('/game', authenticateToken, (req, res) => {
    const userData = {
        id: req.user.id,
        username: req.user.username,
    };

    res.status(200).json({ message: 'Welcome to the game!', user: userData });
});

// Signup route
router.post('/signup', async (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user in the database
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during signup:', error);

        if (error.code === 11000) {
            // Duplicate username error (MongoDB)
            return res.status(400).json({ error: 'Username already exists.' });
        }

        res.status(500).json({ error: 'Failed to register user.' });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password." });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password." });
        }

        // Generate a JWT
        const SECRET_KEY = process.env.SECRET_KEY;
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "2h" });

        // Respond with the token
        res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "An error occurred during login." });
    }
});

export default router;

