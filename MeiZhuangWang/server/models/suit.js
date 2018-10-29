let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let suitSchema = new Schema({

  "status": String,
  "msg": String,
  "productSId": String,
  "suitprod": [
    {
      "productName": String,
      "productOldPrice": String,
      "productPrice": String,
      "productId": String,
      "productTip": String,
      "productImg": String
    }
  ]
});

module.exports = mongoose.model('suit', suitSchema);
