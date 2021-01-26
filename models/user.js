const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, index: true, unique: true, required: true },
        emailId: { type: String, index: true, unique: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        // 💡 Sneha: roles should be an array of String, so type: [String], because multiple roles may exist at the same time
        // this way, you can unlock certain features depending on the added role.
        roles: { type: String, default: 'user', enum: ['user', 'moderator', 'admin'] }, 
        password: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);