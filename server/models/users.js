var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPassword":String,
  "orderList":Array,
  "cartList":[
    {
      "goodsId": String,
      "goodsName":String,
      "goodsPrice":String,
      "goodsImg":String,
      "selected":Number,
      "goodsNumber":Number

    }
  ],
  "dizhiList":[{
    "dizhiId" : String,
    "receiver" : String,
    "streetName" : String,
    "postCode" : Number,
    "phone" : Number,
    "isDefault" : Boolean

  }]
})
module.exports = mongoose.model("User",userSchema);
