var express = require('express');
var router = express.Router();
var User = require('./../models/users')
var Products = require('./../models/products')
require('./../util/util')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*router.post("/changePwd",function (req,res,next) {
      var newPassword=req.body.newPassword;
      User.update({userId:req.cookies.userId},{"userPassword":newPassword},function (err,doc) {
          if(err){
            res.json({
              status:'999',
              msg:err.message,
              result:''
            })
          }else{
               res.json({
                 status:'100',
                 msg:'',
                 result:"suc"
               })
          }
      })
});*/

router.post("/changePwd",function (req,res,next) {
  var newPassword=req.body.newPassword
  User.findOne({userId:req.cookies.userId,userPassword:req.body.oldPassword},function (err,doc) {
    if(err){
      res.json({
        status:'404',
        msg:err.message,
        result:''
      })
    }else{
      if(!doc){
        res.json({
          status:'999',
          msg:'error',
          result:''
        })
      }else if(doc){
        User.update({userId:req.cookies.userId},{"userPassword":newPassword},function (err1,doc1) {
          if(err1){
            res.json({
              status:'404',
              msg:err1.message,
              result:''
            })
          }else{
            res.json({
              status:'800',
              msg:"",
              result:'suc'
            })
          }
        })
      }
      /*res.json({
        status:'888',
        msg:'',
        result:'suc'
      })*/
    }
  })
})
router.post("/register",function (req,res,next) {
  User.findOne({userName:req.body.reguserName},function (err,user) {
    if(err){
      res.json({
        status:'failed',
        msg:err.message
      })
    }else{
      if(user){
        res.json({
          status:'false',
          result:'用户已注册'
        })
      }else{
        var platform= '144';
        var random1 = Math.floor(Math.random()*10);
        var random2 = Math.floor(Math.random()*10);

        var sysDate = new  Date().Format('yyMMddhhmmss');
        var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        var userId=platform+random1+sysDate+random2
        var userModel = new User();
        userModel.userId=userId;
        userModel.userName=req.body.reguserName;
        userModel.userPassword=req.body.reguserPassword;
        userModel.orderList=Array;
        userModel.cartList=[];
        userModel.dizhiList=[];
        userModel.save(function (err1,user1) {
          if(err1){
            res.json({
              status:'123',
              result:'fail new model'
            })
          }else{
            res.json({
              status:'456',
              result:'new user suc'
            })
          }

        })
      }
    }
  })
});
router.post("/login",function (req,res,next) {
  User.findOne({userName:req.body.userName,userPassword:req.body.userPassword},function (err,userlog) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(!userlog){
        res.json({
          status:'444',
          msg:'',
          result:'用户不存在'
        })
      }
      if(userlog){
        router.post("/tocart",function (req,res,next) {
          var userId = req.cookies.userId;goodsId=req.body.goodsId;goodsNum=req.body.goodsNum
          var User = require('../models/users');
          User.findOne({userId:userId},function (err,userDoc) {
            if(err){
              res.json({
                status:'1',
                msg:err.message
              })
            }else{
              console.log("userDoc:"+userDoc)
              if(userDoc){
                let checkedexist = '';
                userDoc.cartList.forEach(function (item) {
                  if (item.goodsId == goodsId && goodsNum==''){
                    checkedexist = item;
                    item.goodsNumber++;
                  }
                  if(item.goodsId == goodsId && goodsNum!=''){
                    checkedexist=item;
                    item.goodsNumber=item.goodsNumber+goodsNum;
                  }
                });
                if(checkedexist){
                  userDoc.save(function (err2,doc2) {
                    if(err2){
                      console.log(err2.message)
                    }else{
                      res.json({
                        status:'0',
                        result:'suc'
                      })
                    }
                  })
                }else{
                  Products.findOne({goodsId:goodsId},function (err1,doc) {
                    if(err1){
                      res.json({
                        status:'1',
                        msg:err1.message
                      })
                    }else{
                      if(doc){
                        console.log("123")
                        newobj={
                          goodsNumber:goodsNum!=''?parseInt(goodsNum):1,
                          selected:1,
                          goodsId:doc.goodsId,
                          goodsName:doc.goodsName,
                          goodsImg:doc.goodsImg,
                          goodsPrice:doc.goodsPrice
                        }
                        userDoc.cartList.push(newobj);
                        userDoc.save(function (err2,doc3) {
                          if(err2){
                            console.log(err2.message)
                          }else{
                            res.json({
                              status:"0",
                              result:'suc123'
                            })
                          }
                        })
                      }
                    }
                  });
                }
              }
            }
          })
        });
        res.cookie("userId",userlog.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",userlog.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        res.json({
          status:'0',
          result:{
            userName:userlog.userName
          }
        })
        console.log(userlog)
      }
    }
  })
})

router.post("/logout",function (req,res,next) {
res.cookie("userId","",{
  path:'/',
  maxAge:-1
})
  res.json({
    status:'111',
    result:req.cookies.userId
  })

})

router.get("/iflogin",function (req,res,next) {
  if(req.cookies.userId){
    res.json({
       status:'0',
      msg:'',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:"123",
      msg:'当前未登录',
      result:''
    })
  }
});
   router.get("/getgwcCount",function (req,res,next) {
     if(req.cookies && req.cookies.userId){
       var userId= req.cookies.userId;
       User.findOne({userId:userId},function (err,doc) {
         if(err){
           res.json({
             status:'1',
             msg:err.message,
             result:''
           })
         }else{
           var cartList=doc.cartList;
           var gwcCount =0;
           cartList.map(function (item) {
             gwcCount += parseInt(item.goodsNumber);
           })
           res.json({
             status:'0',
             msg:'',
             result:gwcCount
           })
         }
       })
     }
   });


  router.get("/cartList",function (req,res,next) {
    var userId=req.cookies.userId;
    User.findOne({userId:userId},function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:'请先登陆',
          result:''
        })
      }else{
        res.json({
          status:'0',
          msg:'购物车列表加载',
          result:doc.cartList
        })
      }
    })
  })
router.post("/delete",function (req,res,next) {
  var userId=req.cookies.userId,goodsId=req.body.goodsId;
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
      'goodsId':goodsId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  });
});

router.post("/changeNum",function (req,res,next) {
  var userId=req.cookies.userId,
    goodsId=req.body.goodsId,
    goodsNumber=req.body.goodsNumber,
    selected=req.body.selected;
  User.update({"userId":userId,"cartList.goodsId":goodsId},{
    "cartList.$.goodsNumber":goodsNumber,
    "cartList.$.selected":selected,
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else {
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  })
});
router.post("/editCheckAll",function (req,res,next) {
  var userId=req.cookies.userId,
      checkAll = req.body.checkAll?"1":"0";
     User.findOne({"userId":userId},function (err,user) {
       if(err){
         res.json({
           status:'1',
           msg:err.message,
           result:''
         });
       }else {
         if(user){
           user.cartList.forEach((item)=>{
             item.selected= checkAll
           })
           user.save(function (err1,doc) {
             if(err1){
               res.json({
                 status:'1',
                 msg:err.message,
                 result:''
               });
             }else {
               res.json({
                 status:'0',
                 msg:'',
                 result:'suc'
               });
             }
           })
         }

       }
     } )
});
router.get("/dizhiList",function (req,res,next) {
    var userId = req.cookies.userId;
    User.findOne({"userId":userId},function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else{
        res.json({
          status:'0',
          msg:'',
          result:doc.dizhiList
        })
      }
    })
});
router.post("/addDiZhi",function (req,res,next) {
  var userId=req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      var platform= 'dizhi';
      var random1 = Math.floor(Math.random()*10);
      var random2 = Math.floor(Math.random()*10);

      var sysDate = new  Date().Format('yyMMddhhmmss');
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      var dizhiId=platform+random1+sysDate+random2
      var newAddreess ={
        dizhiId:dizhiId,
        receiver:req.body.receiver,
        postCode:req.body.postCode,
        phone:req.body.phone,
        streetName:req.body.streetName,
        isDefault:false,
      }
      doc.dizhiList.push(newAddreess);
      doc.save(function (err1,doc1) {
        if(err1){
          res.json({
            status:'1111',
            msg:err1.message,
            result:''
          })
        }else{
          res.json({
            status:"000",
            msg:'',
            result:''
          })
        }
      })
    }
  })
})
/*设置默认接口setDefault，这个接口只要先从前端拿到当前的地址Id，后端拿到数据之后，循环遍历当前地址列表下所有的的isDefault字段，通过匹配当前传到后端的Id
* 然后去改变当前isDefault的布尔值，再把其他的isDefault值改为false即可，再通过save函数保存就行了，前端再自动刷新。*/
router.post("/setDefault",function (req,res,next) {
  var userId = req.cookies.userId,
    dizhiId=req.body.dizhiId;
  if(!dizhiId){
    if(err){
      res.json({
        status:'1111',
        msg:'dizhiId is null',
        result:''
      });
    }
  }else{
    User.findOne({"userId":userId},function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        var dizhiList = doc.dizhiList;
        dizhiList.forEach((item)=>{
          if(item.dizhiId==dizhiId){
            item.isDefault=true;
          }else {
            item.isDefault=false;
          }
        });
        doc.save(function (err1,doc1) {
          if(err){
            res.json({
              status:'1',
              msg:err.message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:''
            })
          }
        })
      }
    });
  }
});
router.post("/delDiZhi",function (req,res,next) {
  var userId= req.cookies.userId,dizhiId=req.body.dizhiId;
  User.update({
    userId:userId
  },{
    $pull:{
      'dizhiList':{
        'dizhiId':dizhiId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else {
        res.json({
          status:'0',
          msg:'',
          result:''
        });
    }
  });
});
/*生成订单的接口createOrder 这个接口需要首先获取当前的用户Id,生成的订单总金额，还有当前的地址Id，然后首先通过循环遍历当前地址id的所有地址信息，还有循环遍历当前购物车所有selected值为选中
* 状态的所有商品作为订单列表要保存的字段之一，然后同时给订单号做唯一匹配的Id号，还有订单生成时间，再通过保存userId,然后再通过新建集合push保存到书库，生成订单列表。*/
router.post("/createOrder",function (req,res,next) {
  var userId=req.cookies.userId,dingdantotal=req.body.dingdantotal,dizhiId=req.body.dizhiId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
           var dizhi='',goodsList=[];
          doc.dizhiList.forEach((item)=>{
              if(dizhiId==item.dizhiId){
                dizhi=item;
              }
          })
      doc.cartList.filter((item)=>{
            if(item.selected=="1"){
              goodsList.push(item);

            }
      });
          var platform= '622';
          var r1 = Math.floor(Math.random()*10);
          var r2 = Math.floor(Math.random()*10);

          var sysDate = new  Date().Format('yyMMddhhmmss');
          var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
          var orderId=platform+r1+sysDate+r2
          var order={
            userId:userId,
            orderId:orderId,
            dingdantotal:dingdantotal,
            dizhiInfo:dizhi,
            goodsList:goodsList,
            orderStatus:'1',
            createDate:createDate
          };
          doc.orderList.push(order);
          doc.save (function (err1,doc1) {
            if(err1){
              res.json({
                status:'1',
                msg:err.message,
                result:''
              });
            }else{
              res.json({
                status:'0',
                msg:'',
                result:{
                  orderId:order.orderId,
                  dingdantotal:order.dingdantotal
                }
              })
            }
          })
    }
  })
});
router.get("/orderDetail",function (req,res,next) {
var userId= req.cookies.userId,orderId=req.param("orderId");
User.findOne({userId:userId},function (err,userInfo) {
  if(err){
    res.json({
      status:'1',
      msg:err.message,
      result:''
    });
  }else{
    var orderList =  userInfo.orderList;
    if(orderList.length>0){
         var dingdantotal = '';
         orderList.forEach((item)=>{
              if(item.orderId==orderId){
                dingdantotal=item.dingdantotal;
              }
         });
         if(dingdantotal>0){
           res.json({
             status:'0',
             msg:'',
             result:{
               orderId:orderId,
               dingdantotal:dingdantotal
             }
           })
         }else{
           res.json({
             status:'1008611',
             msg:'无此订单',
             result:''
           });
         }

    }else{
      res.json({
        status:'10086',
        msg:'当前用户未创建订单',
        result:''
      });
    }
  }
})
});
router.get("/getorderList",function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
       if(doc){
         let orderList = doc.orderList
        res.json({
          status:'0',
          msg:'',
          result:orderList
        });
    }
    }
  })
});
module.exports = router;
