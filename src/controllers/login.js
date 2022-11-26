const bcrypt = require("bcrypt");
const db = require('../models');
const jwt = require("jsonwebtoken");

const User = db.User;

login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.send({status:"error",message:'Invalid credentials provided!'})    //no user found with this email
        }
        console.log("Here",email)

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.send({status:"error",message:'Invalid credentials provided!'});   //Password is incorrect
        }
        const token = jwt.sign(
            { userId: user.id, userName: user.name },
            process.env.SECRET_KEY || 'somesupersecretkey',
            {
                expiresIn: '5h'
            }
        )
        //console.log("token : "+token);
        return res.send({status:"success",data:{ userId: user.id, token: token, tokenExpiration: 5 }});
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error!", //Database connection error
        });
    };


},

module.exports = { login: login }