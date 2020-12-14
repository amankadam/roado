const mongoose =require("mongoose");

const UniqueUserSchema =new mongoose.Schema({
  uniqueId:{
    type:String
  },
    words:[
      {type:mongoose.Schema.Types.ObjectId,ref:'Word'}
    ]

});
module.exports=mongoose.model('UniqueUser',UniqueUserSchema);
