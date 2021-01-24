const express = require("express");
const router = express.Router();
const Story = require("../models/story");

router.get('/fromstory/:storyId', async (req, res) => {
    try {
        const storyId = req.params.storyId;
        const page = req.query.page - 1 || 0;
        const cardsPerPage = 6;
        const story = await Story
            .findById(storyId)
            .slice('cards', [page * cardsPerPage, cardsPerPage])
            .populate('cards', 'text')
        res.status(200).json(story.cards)
    } catch {
        res.status(500).json({ error: 'Cards not found' })
    }
})

module.exports = router;