const express=require("express");
require('dotenv').config();
const app=express();
app.use(express.json);
const port=process.env.port;

const {router}=require('./src/routes/userRouters');

app.use("/users",router);

app.listen(port,()=>{
    console.log("servidor online");
})