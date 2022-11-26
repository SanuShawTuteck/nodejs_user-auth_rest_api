const bcrypt = require("bcrypt");
const db = require('../models');
const jwt = require("jsonwebtoken");

const User = db.User;

//Registration Function
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const data = await User.findOne({ where: { email: email } }); //Checking if user already exists
        if (data) {
            return res.status(400).json({
                error: "This Email Id already exists!!",
            });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 12);
            // save to DB
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name
            })

            await user.save();

            if (user.id) {
                return res.status(200).send({userId: user.id,name:user.name});
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    };
}