var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema=new Schema({
     "totalList":Array,
     "userId":String,
     "orderId":String


});
module.exports = mongoose.model("Order",orderSchema);
