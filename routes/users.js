const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");

//router = /user

//Register new User
router.post('/register', async (req, res) => {
    console.log('registering.....')
    try {
        const { username, email, firstName, lastName, password } = req.body;
        if (!password) throw new Error("Password cannot be empty");
        // 💡 Sneha: Check if email regex is email

        // 💡 Sneha: Check if username is alphanumeric, 6-12 characters

        // 💡 Sneha: Check if password is strong

        // 💡 Sneha: password2, and compare it to password (comparison before hashing is more efficient)


        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            userId: username,
            emailId: email,
            firstName,
            lastName,
            password: hash
        });
        await user.save();
        res.send(`user ${username} is created`);
    } catch (e) {
        let errMessage = "";
        const reDup = new RegExp(/(?:duplicate)/, "g");
        console.log(e.message)
        if (reDup.test(e.message)) {
            const reUser = new RegExp(/(?:userId_1)/, "g");
            const reEmail = new RegExp(/(?:emailId_1)/, "g");
            if (reUser.test(e.message)) errMessage = "Username already exists. Please select some other user name.";
            if (reEmail.test(e.message)) errMessage = "A Username with this email already exist.";
        }

        else if (reUserValid.test(e.message)) {
            const reUserValid = new RegExp(/(?:User\ validation\ failed)/, "g");
            const reNullAttr = new RegExp(/(?:userId|emailId|firstName|lastName)/, "g");
            if (reNullAttr.exec(e.message)) var nullAttr = reNullAttr.exec(e.message);
            errMessage = `${nullAttr} cannot be blank!`;
        }
        else errMessage = e.message;
        res.send(errMessage);
        // console.log(e);
    }
});


//Login existing User
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const error = new Error("username or password is wrong. Please try again!");
        const user = (await User.findOne({ userId: username }, { password: 1 }));
        if (!user) throw error;
        const hashPassword = user.password;
        const valid = await bcrypt.compare(password, hashPassword);
        if (!valid) throw error;
        else res.send(`${username} logged in successfully!`);
    } catch (e) {
        res.send(e.message);
        console.log(e);
    }
});


module.exports = router;