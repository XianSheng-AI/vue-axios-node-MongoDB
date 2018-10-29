// {
//   status:"10086",
//     mes:"suc",
//   type:"admin",
//   admin:[
//   {
//     leName:"CAIXIANJIA007",
//     lePwd:"8208208820",
//     level:"SSS"
//   },
//   {
//     leName:"LABIXIAOXIN008",
//     lePwd:"5205205520",
//     level:"SS"
//   }
// ]
// }

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let adminSchema = new Schema({

  "status": String,
  "mes": String,
  "type": String,
  "admin": [
    {
      "leName": String,
      "lePwd": String,
      "level": String,
      "leimg":String
    }
  ]

});

//导出后台管理员模型

module.exports = mongoose.model("admin", adminSchema);
