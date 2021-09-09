const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI =  process.env.MONGO_URI;
mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},(err)=>{
    if(err){
        console.log("Connection not established");
        console.log(err);
        process.exit(1);
    }
    else{
        console.log("Connection Successful"); 
    }
}); 