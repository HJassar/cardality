const router = require('express').Router();

const Collections = [
    require('../models/card'),
    require('../models/story')
]
const { generateStory, seedCards } = require('../handlers/seed')

// admin function under /admin go here

// Big Red Button
router.get('/big-red-button', async (req, res) => {
    try {
        for (let Collection of Collections) {
            await Collection.deleteMany({})
        }
        res.send('You\'ve just dropped the whole DB!')
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

router.get('/seed-cards', async (req, res) => {
    seedCards(res);
})

router.get('/generate-story', async (req, res) => {
    try {
        generateStory();
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

module.exports = router;