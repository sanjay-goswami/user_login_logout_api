const mongoose = require("mongoose");
// uri for development stage
const MONGO_URI =  "mongodb://localhost/session_api"
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