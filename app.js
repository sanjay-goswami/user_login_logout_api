const express = require("express");
const port = process.env.PORT || 3001;
require("./config/db");
const app = express();
const router = require("./router/route")

app.use(express.json());
app.use(router);
app.listen(port,(err)=>{
    if(err){
        console.log("internal error");
        process.exit(1);
    }
    else{
        console.log(`API is listening on  port ${port}`);
    }
});
