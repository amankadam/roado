const mongoose=require("mongoose");

const WordSchema=new mongoose.Schema({
  word:{
    type:String
  },
  etymologies:{
    type:String
  },
  description:{
    type:String
  },
  examples:{
    type:Array
  }
});
module.exports=mongoose.model('Word',WordSchema);
