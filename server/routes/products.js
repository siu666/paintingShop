var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Products =require("../models/products");

mongoose.connect('mongodb://127.0.0.1:27017/paintshop');

mongoose.connection.on("connected",function () {
  console.log( "mongodb connected suc")

})
mongoose.connection.on("err",function () {
  console.log( "mongodb connected failed")

})
mongoose.connection.on("disconnected",function () {
  console.log( "mongodb connected dis")

});
router.get('/',function (req,res,next) {
  res.send('response suc')
})
router.get("/products",function (req,res,next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let paintStyle = req.param("paintStyle");
  let skip=(page-1)*pageSize;
  let morethan=parseInt(req.param("morethan"));
  let lessthan=parseInt(req.param("lessthan"));
  let sort = req.param("sort");
  let inputContent=String(req.param("inputContent"));

  let type = '';
  let params ={};
  if(paintStyle!='0') {

    switch (paintStyle){
      case '1':type='油画';break;
      case '2':type='素描';break;
      case '3':type='油墨';break;

    }
    params={
      goodsType:type
    }
  }
  if(req.param("morethan") || req.param("lessthan")){
    params={
      goodsPrice:{
        $gt:morethan,
        $lte:lessthan
      }

    }
    console.log(typeof(morethan))
  }
  if(req.param("inputContent")){
    params={
      goodsName:{$regex:inputContent}
    }

  }

  let paintModel = Products.find(params);
  /*console.log("123123"+paintModel)*/
  paintModel.sort({'goodsPrice':sort}).skip(skip).limit(pageSize);
  paintModel.exec(params,(function (err,doc) {
    if(err){
      console.log(err.msg)
    }else{
      res.json({
        /*status:'0',*/
        count:doc.length,
        list:doc})
    }
  })
  )

});



module.exports= router;
