const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { json } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECREAT ="youwillnevercrackit"

// Route 1 : create a user using POST:"/api/auth/createuser",no login required
router.post('/createuser',[
    body('name' , 'enter a valid name').isLength({ min: 3 }),
    body('email' , 'enter a valid email').isEmail(),
    body('password' , 'enter a valid password').isLength({ min: 6 }),

], async (req, res)=>
{
  //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email already exists 
    try {
    let user = await User.findOne({email:req.body.email});
    if (user) {
      return res.status(400).json({error:"sorry a user with this email already exists"});
    }
    const salt =await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash( req.body.password, salt) 
    //creat a user
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data =  {
        user:{
        id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECREAT);
     
      // res.json(user);
      res.json(authtoken);

    }
    //catch errors
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured"); 
    }
    })


    //Route 2: authenticate a user using POST:"/api/auth/login",no login required
    router.post('/login',[
      body('email' , 'enter a valid email').isEmail(),
      body('password', 'Password cannot be blank').exists(),
  
  ], async (req, res)=>
  {
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email , password} = req.body;
    try {
      let user= await User.findOne({email});
      if (!user) {
        return res.status(400).json({ errors:'Please enter a valid user credentials'});
      }
      const passCompare =await bcrypt.compare(password , user.password);
      if (!passCompare) {
        return res.status(400).json({ errors:'Please enter a valid password credentials'});
      }
      const data =  {
        user:{
        id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECREAT);
      res.json({authtoken});


    }   catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured2"); 
    }
  });

    //Route 3: get loggedin user details using POST:"/api/auth/userdetails",no login required
    router.post('/userdetails', fetchuser, async (req, res)=>
  {
  try {
    userId = req.user.id
    const user= await User.findById(userId).select("-password");
    res.send(user);
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error occured2"); 
  }
})

module.exports= router; 