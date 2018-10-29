let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({//{type:String}也可以
  "userId": String,
  "userName": String,
  "userPwd": String,
  "orderList": Array,
  "cartList": [
    {
      "productName": String,
      "productOldPrice": String,
      "productPrice": String,
      "productId": String,
      "productTip": String,
      "productImg": String,
      "checked": String,
      "productNum": String,
      "ImgUrl": String,
    }
  ],
  "addressList": [
    {
      "addressId" : String,
      "userName" : String,
      "province" : String,
      "streeName" : String,
      "postCode" : String,
      "tel" : String,
      "isDefault" : Boolean
    }
  ],
});
//导出数据模型
module.exports = mongoose.model("user", userSchema);
