var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var goodsSchema = new Schema ({
  "goodsId":String,
  "goodsName":String,
  "goodsPrice":Number,
  "goodsImg":String,
  "goodsType":String

})
module.exports= mongoose.model('Product',goodsSchema);