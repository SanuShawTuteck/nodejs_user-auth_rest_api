const bcrypt = require("bcrypt");
const db = require('../models');
const jwt = require("jsonwebtoken");

const User = db.User;

getUser = async (req, res) => {
    try {
        const { userId: Uid } = req.user;
        const user = await User.findOne({ where: { id: Uid } })

        if (!user) {
            return res.send({ status: "error", message: 'Invalid credentials provided!' })    //no user found with this email
        }
        return res.send({status:"success",data:{name:user.name,email:user.email}})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error!", //Database connection error
        });
    };


},

    module.exports = { getUser: getUser }