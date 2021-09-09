const mongooose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongooose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Username should be unique"],
        validate(value){
            if(!validator.isEmail(value))
            throw new Error("Invalid Email");
        },
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    token:{
        type:String,
        default:null
    }
},{versionKey:false});

userSchema.methods.generateAuthToken = async function(){
    try{
        const token =await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.token = token;
        return token;
    }catch (err){
        console.log(err);
    }
}

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

const User = mongooose.model("User",userSchema);

module.exports = User;
