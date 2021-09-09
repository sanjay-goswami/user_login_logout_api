const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const verifyToken = require("../middleware/auth");
require("../middleware/auth");



router.post("/api/register",async (req,res)=>{
    const {name,email,password} = req.body;
    new_user =new User({name:name,email:email,password:password});
    const token = await new_user.generateAuthToken();
    new_user.save((err,data)=>{
        if(err)
        res.status(400).send({"success":0,"message":"Bad request"});
        else{
            res.status(201).send({
                "success":1,
                "token":token
            })
        }
    })
})


router.post("/api/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        User.findOne({email:email},async (err,data)=>{
            if(err)
            res.status(400).send({"login":"failed","message":"bad request"});
            else if(data == null)
            res.status(400).send({
                "login":"failed",
                "message":"Invalid email or password!"
            })
            else{
                const is_equal = await bcrypt.compare(password,data.password);
                if(is_equal){

                    res.status(200).send({
                        "login":"Success",
                        "token": data.token
                    })
                }
                else
                res.status(400).send({
                    "login":"Failed",
                    "message":"Invalid email or password!"
                })
            }
        })
    }
    catch{
        res.status(400).send({"login":"Failed","message":"Bad Request"});
    }
})

router.post("/api/change_password",verifyToken,async(req,res)=>{
    const  auth_token = req.headers.authorization.split(" ")[1];
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    User.findOne({_id:req.user._id},async (err,data)=>{
       if(err)
       {
           res.status(400).send({
               "login":"failed",
               "message":"bad request"
           });
       }
       const is_equal = await bcrypt.compare(old_password,data.password);
       if((data.token == auth_token) && is_equal ){
            data.password = new_password;
            const token = await data.generateAuthToken();
            data.save((err1,data1)=>{
                if(err)
                {
                    res.status(400).send({
                        "login":"failed",
                        "message":"bad request"
                    });
                }
                else
                res.status(201).send({"login":"success","message":"password changed successfully","token":token});
            });
       }
       else{
           res.status(400).send({
               "login":"failed",
               "message":"incorrect old password or token expired"
           })
       }
   })
})

module.exports = router;