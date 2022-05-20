const express = require('express');
const router = express.Router();

const Card = require('../models/Card');

// api/cards
router.post('/', async (req, res) => {
    try {
        const cards = await Card.getAll();
        console.log("CARDS: ", cards); // TODO: delete this
        res.json(cards);
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;