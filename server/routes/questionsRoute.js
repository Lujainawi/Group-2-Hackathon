const express = require('express');
const router = express.Router();
const questionsData = require('../data/questions.json'); // נתיב מתוקן

// API to fetch questions
router.get('/questions', (req, res) => {
    console.log('Serving questions data:', questionsData);
    res.json(questionsData);
});

module.exports = router;