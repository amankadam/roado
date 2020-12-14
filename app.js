const express =require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const path=require("path");
app.use(express.static(path.join(__dirname,"client","build")))
app.use(cors());
require("dotenv").config();
app.use(express.json());
mongoose.connect('mongodb+srv://upi:XSs3K5yXOwb5I2AL@cluster0.odlmg.mongodb.net/upiDatabse?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false });
const port=process.env.PORT || 8080;
const userRouter=require('./routes/user');
app.use('/user',userRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});
app.listen(port,()=>{
  console.log('server started..'+port);
});
