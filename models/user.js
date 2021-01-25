const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, index: true, unique: true, required: true },
        emailId: { type: String, index: true, unique: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        roles: { type: String, default: 'user', enum: ['user', 'moderator', 'admin'] },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);