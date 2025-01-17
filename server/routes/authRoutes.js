import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // For hashing passwords
import User from '../models/user.js'; // Make sure the path to your user model is correct

const router = express.Router();

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


// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // Update the last visit time
        user.lastVisit = Date.now();
        await user.save();

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to log in.' });
    }
});


router.get('/test', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});


export default router;
