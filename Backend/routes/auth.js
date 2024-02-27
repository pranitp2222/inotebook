const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'Harryisgoodboy';



router.post('/createuser', [
    body('name','Enter Correct Name With Minimum Of 3 Words').isLength({min:3}),
    body('email','Enter Proper Email').isEmail(),
    body('password','Enter Password With Minimum of 3 Words').isLength({min:4}),
], async (req, res) => {
    let success = false
    // const obj = {
    //     name : "Pranit",
    //     id : 1001
    // };
    // res.json(obj)
    // console.log(req.body);
    // const users = Users(req.body);
    // users.save()
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }
    let user = await Users.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success, error:"Sorry Email is already there"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await Users.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
    })

    const data = {
            id : user.id  
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    console.log(authtoken)
    success = true;
    res.json({authtoken,user,success})
    // .then(user => res.json(user))
    // .catch(err => {console.log(err) 
    // res.json({ err : "Please Enter Correct or Unique Email Address", message : err.message,})})
    //res.send(req.body)
})


router.post('/login', [
    body('email','Enter Proper Email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({success, errors: "Please login with correct Credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({errors: "Please login with correct Credentials"});
        }
        const data = {
                id : user.id  
        }
        const authToken = await jwt.sign(data,JWT_SECRET);
        console.log(authToken)
        console.log("login Sucessfully")
        success = true
        res.json({success, authToken})
    } catch (error) {
        console.log(error.message)
        return res.status(400).send("Internal Server Errors"); 
    }


})

router.post('/getuser', fetchuser, async (req, res) =>{
    try {
        const userId = req.user;
        //console.log(userId)
        const user = await Users.findById(userId).select("-password")
        res.send(user)
        
    } catch (error) {
        console.log(error.message)
        return res.status(400).send("Internal Server Errors"); 
        
    }
})
module.exports = router