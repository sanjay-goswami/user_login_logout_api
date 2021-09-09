const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
require("../middleware/auth");

// const  securepassword=async(value)=>{
//     return await bcrypt.hash(value,10);
// }

router.post("/api/signup",async (req,res)=>{
    // console.log(req.body);
    const {name,email,password} = req.body;
    // encrypted_password = await bcrypt.hash(password,10);
    const token = jwt.sign(email,"this is secret key");
    new_user =new User({name:name,email:email,password:password,token:token});
    new_user.save((err,data)=>{
        if(err)
        res.status(400).send(err);
        else
        res.status(201).send({
            "success":1,
            "token":token
        })
    })
})
router.post("/api/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        User.findOne({email:email},async (err,data)=>{
            if(err)
            res.status(400).send({"message":"bad request"});
            else if(data == null)
            res.status(400).send({
                "login":"failed",
                "message":"Incorrect mail"
            })
            else{
                const is_equal = await bcrypt.compare(password,data.password);
                if(is_equal){

                    var token = data.token;
                    console.log(data)
                    res.status(200).send({
                        "login":"Success",
                        "token": token
                    })
                }
                else
                res.status(400).send({
                    "login":"Failed",
                    "message":"Incorrect Password"
                })
            }
        })
    }
    catch{
        res.status(400).send({"message":"Bad Request"});
    }
    // res.send({"message":"authorized"});
})

router.get("/test/:hash",async (req,res)=>{
    input_hash = req.params.hash;
    text = "test123";
    const is_equal = await bcrypt.compare(text,input_hash);
    res.send({
        "simple_text":text,
        "is_equal":is_equal
    })
})

router.get("/user",(req,res)=>{
    // res.json(req);
    res.send(req.headers.authorization)
    console.log(req.auth);
    // User.find((err,data)=>{
    //     if(err)
    //     res.status(400).send({"success":0,"message":"Bad Request"})
    //     else
    //     res.status(200).send(data)
    // })
})

module.exports = router;