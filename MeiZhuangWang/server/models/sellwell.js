let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let sellwellSchema = new Schema({

  "status": String,
  "msg": String,
  "productSId": String,
  "sellprod": [{
      "productName": String,
      "productOldPrice": String,
      "productPrice": String,
      "productId": String,
      "productTip": String,
      "productImg": String
    }]
});
module.exports = mongoose.model("sellwell", sellwellSchema);
