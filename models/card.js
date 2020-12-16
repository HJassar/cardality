const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
    {
        text: String,
        isApproved: { type: Boolean, default: "true" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);