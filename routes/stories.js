const express = require("express");
const router = express.Router();
const Story = require("../models/story");
const Card = require("../models/card");

//Show all stories
router.get('/home', (req, res) => {
    Story.find({}, (err, allStories) => {
        if (err) console.log(err);
        else {
            // console.log(allStories);
            const stories = allStories.map(s => {
                return { storyId: s._id, name: s.name }
            });
            res.send(stories);
        }
    });
});

module.exports = router;