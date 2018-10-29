let express = require('express');
let router = express.Router();
let Products = require("./../models/products");  //加载商店商品信息数据库模型
let suit = require("./../models/suit");          //加载化妆品套装信息数据库模型
let develops = require("./../models/deleloper");    //加载开发者信息数据库模型
let User = require("./../models/user");          //加载登陆用户信息
let sellwell = require("./../models/sellwell");    //加载畅销商品数据库模型

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//购物车获取商品
router.post('/cartList', function (req, res, next) {
  // console.log(789)
  let userId = req.cookies.userId;
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.cartList
      })
    }
  })
});

//编辑商品个数
router.post("/editnum", function (req, res, next) {
  let editObj = {
    userId: req.cookies.userId,
    productId: req.body.productId,
    productNum: req.body.productNum,
    checked: req.body.checked
  };
  // console.log(editObj.userId);
  // console.log(editObj.productId);
  // console.log(editObj.productNum);
  console.log(editObj.checked);
  User.update({
    userId: editObj.userId,
    'cartList.productId': editObj.productId
  }, {
    'cartList.$.productNum': editObj.productNum,
    'cartList.$.checked': editObj.checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: 'err'
      })
    } else {
      console.log(editObj.checked);
      if (doc) {
        console.log(doc);
        res.json({
          status: '0',
          msg: '',
          result: doc
        })
      }

    }
  })
});

//购物车商品删除
router.post("/removedata", function (req, res, next) {

  let remObj = {
    productId: req.body.productId,
    userId: req.cookies.userId
  };
  User.update({userId: remObj.userId}, {$pull: {'cartList': {'productId': remObj.productId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
});

//全选商品
router.post("/editCheckAll", function (req, res, next) {
  let check = req.body.checked;
  let userId = req.cookies.userId;
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        doc.cartList.forEach(function (item) {
          item.checked = check;
        });
        doc.save(function (err2) {
          if (err2) {
            res.json({
              status: '1',
              msg: err2.message,
              result: 'err'
            })
          }
        })
      }
    }
  })
});

//购物地址接口
router.get("/addressList", function (req, res, next) {
  let userId = req.cookies.userId;
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: 'err'
      })
    } else {
      res.json({
        status: '0',
        msg: 'suc',
        result: doc.addressList
      })
    }
  })
});

//设置默认地址
router.post("/setDefault", function (req, res, next) {
  let addressId = req.body.addressId;
  let userId = req.cookies.userId;
  if (!addressId) {
    res.json({
      status: '1',
      msg: err.message,
      result: 'err'
    })
  } else {
    User.findOne({userId: userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '10001',
          msg: err.message,
          result: 'err'
        })
      } else {
        if (doc) {
          let addressList = doc.addressList;
          addressList.forEach(function (item) {
            if (item.addressId == addressId) {
              item.isDefault = true;
            } else {
              item.isDefault = false;
            }
          });

          doc.save(function (err1) {
            if (err1) {
              res.json({
                status: '10003',
                msg: 'err1',
                result: 'err1'
              })
            } else {
              res.json({
                status: '0',
                msg: 'suc',
                result: ''
              })
            }
          })
        }
      }
    })
  }
});

//删除地址
router.post("/deleAddress", function (req, res, next) {
  let addressId = req.body.addressId;
  let userId = req.cookies.userId;
  User.update({userId: userId}, {$pull: {'addressList': {addressId: addressId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
      })
    } else {
      res.json({
        status: '0',
        msg: 'suc',
        result: ''
      })
    }
  })
});

//添加新地址

router.post("/newAddress", function (req, res, next) {
  let newObj = req.body.params;
  let userId = req.cookies.userId;

  User.update({userId: userId}, {$addToSet: {"addressList": newObj}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
      })
    } else {
      res.json({
        status: '0',
        msg: 'suc',
        result: ''
      })
    }
  })
});

//PAY支付页面数据初始化
router.get("/payInit", function (req, res, next) {
  let userId = req.cookies.userId;
  let YZM = req.param("YZM");
  let total = 0;
  console.log(YZM);


  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
      })
    } else {
      if (doc) {
        doc.cartList.forEach(function (item) {
          if (item.checked === '1') {
            total += item.productNum * parseInt(item.productPrice);
          }
        });

        res.json({
          status: '0',
          msg: 'suc',
          result: {
            total: total,
          }
        })
      }
    }
  })
});

//YZM验证码写入数据库
router.post("/YZMinfo", function (req, res, next) {
  let YZM = req.body.YZM;
  let userId = req.cookies.userId;

  User.update({userId:userId},{$set:{"orderList.0.YZM":YZM}},function (err, doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:'err'
      })
    }else{
      res.json({
        status:'0',
        msg:'suc',
        result:doc
      })
    }
  })
});

//支付创建订单
router.post("/sendPay", function (req, res, next) {

  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  // let YZM=req.body.YZM;

  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {

      if (doc) {
        let address = '', productList = [], orderTotal = 0;
        //获取收货地址
        doc.addressList.forEach(function (item) {
          if (item.addressId == addressId) {
            address = item;
          }
        });
        //获取购买商品列表//获取订单总金额
        doc.cartList.filter(function (item) {
          if (item.checked === '1') {
            productList.push(item);
            orderTotal += item.productNum * parseInt(item.productPrice);
          }
        });
        //开始创建订单
        let spa = '622';     //开发平台码

        let R1 = Math.floor(Math.random() * 10);    //得到0-9
        let R2 = Math.floor(Math.random() * 10);   //得到0-9

        let sysDate = new Date().Format('yyyyMMddhhmmss');     //当前系统时间
        let createDate = new Date().Format('yyyy-MM-dd-hh-mm-ss');   //当前系统时间
        let orderId = spa + R1 + sysDate + R2;                    //订单号

        let order = {
          orderId: orderId,
          orderTotal: orderTotal,
          addressInfo: address,
          orderList: productList,
          YZM:'',
          orderStatus: '0',
          createDate: createDate
        };
        doc.orderList.push(order);
        doc.save(function (err1) {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: 'err'
            })
          } else {
            res.json({
              status: '0',
              msg: 'suc',
              result: 'suc'
            })
          }
        })


      }

    }
  })
});

//YZM验证码进行校验

router.post("/payMon",function (req, res, next) {
  let YZM=req.body.YZM;
  let userId=req.cookies.userId;

  User.findOne({userId:userId},function (err, doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:'err'
      })
    }else{
        if(doc){
          if(doc.orderList[0].YZM==YZM){
            console.log("yes");
            return;
          }
          console.log("no")
        }
    }
  })
});

//订单成功页面数据
router.post("/success",function (req,res,next) {
  let userId=req.cookies.userId;
  User.findOne({userId:userId},function (err, doc) {
    let last=doc.orderList.length;
    // console.log(last)
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:'err'
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'suc',
          result:doc.orderList[last-1]
        })
      }
    }
  })
});


module.exports = router;










































































































































































