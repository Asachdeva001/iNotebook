const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../MiddleWare/fetchUser')

const JWT_SECRET = 'HarryIsAGoodB$oy';

// create a user using Post api/auth/creatuser

router.post("/createUser/", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),//Custom msg
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Email already registered!! Enter other Email' });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });//.then(user=>res.json(user)).catch((err)=>res.json({error : 'Email already registered!! Enter other Email',message :err.message}));
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ AuthToken: authtoken });
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// login a user using Post api/auth/loginuser

router.post("/loginUser/", [
    body('email').isEmail(),
    body('password','Password cannot be blank').isLength({ min: 5 }),
    ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Kindly login with correct credentials"})
        }
        const passwordComp = await bcrypt.compare(password,user.password);
        if(!passwordComp){
            return res.status(400).json({error:"Kindly login with correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ AuthToken: authtoken });
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Get a user /api/auth/getUser
router.post("/getUser/", fetchUser,async (req, res) => {

    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router