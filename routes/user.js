const express=require("express");
const userRouter=express.Router();
const UniqueUser=require("../models/UniqueUser");
const Word=require('../models/words');
const axios = require('axios');


userRouter.post('/save',(req,res)=>{
  const {uniqueId}=req.body;
const newUser=new UniqueUser({uniqueId});
newUser.save(e=>{
  if(e) res.status(500).json({msg:'Error'});
       else res.status(201).json({msg:'User Saved Successfully'});
});
});

userRouter.post('/saveword',(req,res)=>{

  const {uniqueId}=req.body;
  axios.get('https://od-api.oxforddictionaries.com/api/v2/entries/en-us/'+req.body.word,{
    headers:{
      'app_key':'7ea78031f939bdec80d90424f5de7181',
      'app_id':'24b5285a'
    }
  }).then((r)=>{

    UniqueUser.findOne({uniqueId},(e,u)=>{
      const description=r.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
      const examples=r.data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
      const etymologies=r.data.results[0].lexicalEntries[0].entries[0].etymologies;

      const word=new Word({
        word:req.body.word,
        etymologies:etymologies[0],
        examples:examples,
        description:description
      });
      word.save(e=>{
        if(e) res.status(500).json({msg:'Error'});
        else{
          console.log('hi');
              u.words.push(word);
              u.save(e=>{
                if(e) res.status(500).json({msg:'Error'});
            else {
              console.log('done');
              res.status(200).json({msg:'Successfull'});
            }
      });
    }});
  });

});
});




userRouter.post('/getwords',function(req,res){
  UniqueUser.find({uniqueId:req.body.uniqueId}).populate('words').exec((e,u)=>{
    if(e) res.status(500).json({msg:'Error'});
   else {
     res.status(200).json({u});
   }
  });
});
module.exports=userRouter;
