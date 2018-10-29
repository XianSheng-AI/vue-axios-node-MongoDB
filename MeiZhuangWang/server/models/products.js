let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({//{type:String}也可以
  "status": String,
  "msg": String,
  "productSId": String,
  "prod": [
    {
      "productName": String,
      "productOldPrice": String,
      "productPrice": String,
      "productId": String,
      "productTip": String,
      "productImg": String,
    }
  ],
});
//导出数据模型
module.exports = mongoose.model("product", userSchema);



















