import express from express
const router = express.Router();
const questionsData1 = require('../../client/public/OnlineFriendshopsScenario.json'); 
const questionsData2 = require('../../client/public/SchoolDynamicsScenario.json'); 
const questionsData3 = require('../../client/public/CommunityInvolvementScenario.json'); 

// API to fetch questions
router.get('/OnlineFriendshopsScenario', (req, res) => {
    console.log('Serving questions data:', questionsData1);
    res.json(questionsData1);
});

router.get('/OnlineFriendshopsScenario', (req, res) => {
    console.log('Serving questions data:', questionsData2);
    res.json(questionsData2);
});

router.get('/OnlineFriendshopsScenario', (req, res) => {
    console.log('Serving questions data:', questionsData3);
    res.json(questionsData3);
});

module.exports = router;