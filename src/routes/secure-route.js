const express=require('express');
const router = express.Router();

const {getUser} = require("../controllers/userInfo");

router.get('/user' , getUser); // POST request to login the user
router.get('/' , (res)=>res.sendStatus(202)); // POST request to login the user


module.exports = router