const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
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

module.exports = mongoose.model("Story", storySchema);