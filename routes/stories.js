const express = require("express");
const router = express.Router();
const Story = require("../models/story");
const Card = require("../models/card");

// Router = Stories

//Show all stories
router.get("/", (req, res) => {
  Story.find({}, (err, allStories) => {
    if (err) console.log(err);
    else {
      // console.log(allStories);
      const stories = allStories.map((s) => {
        return { storyId: s._id, name: s.name };
      });
      res.send(stories);
    }
  });
});

// Show a story
router.get("/:storyId", async (req, res) => {
  const storyId = req.params.storyId;
  const currentPage = req.query.page || 1;

  Story.findById(storyId, (err, currentStory) => {
    if (err) {
      return console.log(err);
    }
    console.log("currentStory", currentStory);

    const numberOfCards = currentStory.cards.length;
    console.log("numberOfCards", numberOfCards);
    const cardsPerPage = 10;
    const numberOfPages =
      numberOfCards % cardsPerPage > 0
        ? Math.floor(numberOfCards / cardsPerPage + 1)
        : Math.floor(numberOfCards / cardsPerPage);
    console.log(numberOfPages);

    const requestedCardIds =
      currentPage < numberOfPages
        ? [...currentStory.cards].slice(
            cardsPerPage * (currentPage - 1),
            cardsPerPage * currentPage
          )
        : [...currentStory.cards].slice(cardsPerPage * (currentPage - 1));

    const requestedCards = [];

    // console.log(requestedCardIds);

    async function pullTheText(cb) {
      for (let i = 0; i < requestedCardIds.length; i++) {
        await Card.findById(requestedCardIds[i], (err, card) => {
          requestedCards.push(card.text);
        });
        if (i == requestedCardIds.length - 1) {
          cb();
        }
      }
    }

    pullTheText(() => {
      res.send({ requestedCards, numberOfCards });
    });
  });
});

module.exports = router;
