var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var Orders =require("./../models/orders");
var User=require("./../models/users")

router.get('/',function (req,res,next) {
  res.send('respond with a resource')

});
/*再到查询订单详情，通过获取前端传过来的orderId值，再从后端返回数据结构给前端，前端再通过解析返回的集合数据进行渲染就可以查看订单的详情了*/
router.get('/getorderInfo',function (req,res,next) {
  var orderId=req.param("orderId")
  Orders.findOne({orderId:orderId},function (err,doc) {
    if(err){
      res.json({
        status:'123',
        msg:err.message,
        result:''
      })
    }else if(doc){
          res.json({
            status:'456',
            msg:'',
            result:doc
          })
    }
  })
})
router.post('/changeSta',function (req,res,next) {
    var orderId=req.body.orderId,changeSta=req.body.status;
    console.log(changeSta)
       Orders.update({orderId:req.body.orderId,"totalList.orderId":req.body.orderId},{"totalList.$.orderStatus":req.body.status},function (err,doc) {
         if(err){
           res.json({
             status:'123',
             msg:err.message,
             result:''
           })
         }else{
           res.json({
             status:'888',
             msg:'',
             result:'suc'
           })
         }
       })
})

router.get('/getAllorder',function (req,res,next) {
       Orders.find({},function (err,doc) {
         if(err){
           res.json({
             status:'1230',
             msg:err.message,
             result:''
           })
         }else{
          if(doc){
            res.json({
              status:'0',
              msg:'',
              result:doc
            })
          }

         }
       })
});

router.post('/createOrder',function (req,res,next) {
  var  userId=req.cookies.userId,dingdantotal=req.body.dingdantotal,dizhiId=req.body.dizhiId;
  Orders.findOne({},function (err,doc) {
    if(err){
      res.json({
        status:'123',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        var dizhi='',goodsList=[];
        User.findOne({userId:userId},function (err1,doc1) {
          if(err1){
            res.json({
              status:'450',
              msg:err1.message,
              result:''
            })
          }else{
            if(doc1){
              doc1.cartList.filter((item)=>{
                if(item.selected==1){
                      goodsList.push(item)
                }
              })
              doc1.dizhiList.forEach((item)=>{
                if(dizhiId==item.dizhiId){
                  dizhi=item
                }
              });
              var platform= '622';
              var r1 = Math.floor(Math.random()*10);
              var r2 = Math.floor(Math.random()*10);

              var sysDate = new  Date().Format('yyMMddhhmmss');
              var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
              var orderId=platform+r1+sysDate+r2;
              var order={
                userId:userId,
                orderId:orderId,
                dingdantotal:dingdantotal,
                dizhiInfo:dizhi,
                goodsList:goodsList,
                orderStatus:'1',
                createDate:createDate
              };
              doc.totalList.push(order);
              var orderModel = new Orders();
              orderModel.userId=userId,
                orderModel.orderId=orderId,
                orderModel.totalList=order
              console.log(order)

              orderModel.save(function (err2,doc2) {
                if(err2){
                  res.json({
                    status:'777',
                    msg:err.message,
                    result:''
                  })
                }else{
                  res.json({
                    status:"888",
                    msg:'',
                    result:{
                      orderId:orderId,
                      dingdantotal:dingdantotal
                    }
                  })
                }
              })

            }
          }
        })
      }
    }
  })
});
router.get("/orderDetail",function (req,res,next) {
  var userId= req.cookies.userId,orderId=req.param("orderId");
  Orders.findOne({orderId:orderId},function (err,userInfo) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(userInfo){
        console.log(orderId)
      var totalList = userInfo.totalList;
        console.log(totalList)
      console.log("123")
      if(totalList.length>0){
        var dingdantotal = '';
        totalList.forEach((item)=>{
             dingdantotal=item.dingdantotal
        })
        console.log(dingdantotal)
        if(dingdantotal>0){
          res.json({
            status:'0',
            msg:'',
            result:{
              orderId:orderId,
              dingdantotal:dingdantotal
            }
          })
        }/*else{
          res.json({
            status:'1008611',
            msg:'无此订单',
            result:''
          });
        }*/

      }/*else{
        res.json({
          status:'10086',
          msg:'当前用户未创建订单',
          result:''
        });
      }*/
    }}
  })
});
router.get('/getUser',function (req,res,next) {
  var userId=req.cookies.userId;
  User.find({userId:userId},function (err,doc) {
       if(err){
         res.json({
           status:'123'
         })
       }else{
         res.json({
           result:doc
         })
       }
  })
});
router.get("/getorderList",function (req,res,next) {
  var userId = req.cookies.userId;
  Orders.find({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
      if(doc){

        res.json({
          status:'0',
          msg:'',
          result:doc
        });
      }
      var arr=[];
      doc.forEach((item)=>{

        arr.push(item.orderId)
      })
      console.log(arr)
      console.log(typeof  doc)
    }
  })
});



module.exports= router;
