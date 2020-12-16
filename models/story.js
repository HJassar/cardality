const mongoose = require("mongoose");

const storySchema = new mongoose.model(
    {
        name: String,
        cards: [
            {
                cardId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Card"
                }
            }
        ]
    },
    { timestamps: true }
)