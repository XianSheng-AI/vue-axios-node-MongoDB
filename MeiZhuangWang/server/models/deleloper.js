let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let developSchema=new Schema({
  "developName":String,
  "developMotto":String,
  "developPhone":String,
  "developImg":String,
});

module.exports=mongoose.model('develop',developSchema);
