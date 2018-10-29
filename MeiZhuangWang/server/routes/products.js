var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Products = require("./../models/products");  //加载商店商品信息数据库模型
var suit = require("./../models/suit");          //加载化妆品套装信息数据库模型
var develops = require("./../models/deleloper");    //加载开发者信息数据库模型
var User = require("./../models/user");          //加载登陆用户信息
var sellwell = require("./../models/sellwell");    //加载畅销商品数据库模型
require("./../util/util");               //加载工具类

//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/MeiZhuangWang");
mongoose.connection.on("connected", function () {
  console.log("数据库(MongoDB)连接成功!")
});
mongoose.connection.on("error", function () {
  console.log("数据库(MongoDB)连接失败!")
});
mongoose.connection.on("disconnected", function () {
  console.log("数据库(MongoDB)连接已断开!")
});

//业务请求接口

//官方产品--接口
router.post('/product', function (req, res, next) {
  // console.log(789)
  Products.findOne({productSId:"007"}, function (err, doc) {
    // console.log(doc.prod);
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
        result: doc.prod
      })
    }
  })
  // Products.findOne({productSId:"007"}, function (err, doc) {
  //   console.log(doc);
  //   if (err) {
  //     res.json({
  //       status: '1',
  //       msg: err.message,
  //       result: ''
  //     })
  //   } else {
  //     res.json({
  //       status: '0',
  //       msg: '',
  //       result: doc.prod
  //     })
  //   }
  // })
});
//美妆套装 suit接口
router.post('/suits', function (req, res, next) {
  suit.findOne({productSId:"009"}, function (err, doc) {
    // console.log(doc);
    // console.log(doc.status);
    // console.log(doc.msg);
    // console.log(doc.productSId);
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
        result: doc.suitprod
      })
    }
  })
});

//畅销商品接口

router.post('/sellWell', function (req, res, next) {
  sellwell.findOne({productSId:"008"}, function (err, doc) {
    // console.log(doc);
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.sellprod
      })
    }
  })
});

//开发者信息接口
router.post('/develops', function (req, res, next) {
  develops.find({}, function (err, doc) {
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
        result: doc
      })
    }
  })
});
//登陆接口
router.post('/login', function (req, res, next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  };
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '账号或密码不对！',
        result: ''
      })
    } else {
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: "/",
          maxAge: 1000 * 60 * 60
        });
        res.cookie('userName', doc.userName, {
          path: "/",
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
});
//登出接口
router.post("/logout", function (req, res, next) {
  res.cookie("userId", "", {
    path: "/",
    maxAge: "-1"
  });

  res.json({
    status: '0',
    msg: '',
    result: ''
  })
});
//cookie中有存userId(检查登陆)
router.get("/checkLogin", function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: '1',
      msg: '未登陆',
      result: ''
    })
  }
});

//加入购物车接口

//畅销购买接口
router.post("/addWell", function (req, res, next) {
  let userId = "007";
  let productId = req.body.productId;

  User.findOne({userId: userId}, function (err, userdoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userdoc) {
        let repeatFlag = '';
        userdoc.cartList.forEach(function (item) {
          if (item.productId === productId) {
            repeatFlag = item;
            item.productNum++;
          }
        })

        if (repeatFlag) {
          userdoc.save(function (err2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          sellwell.findOne({"sellprod.productId":productId},{"sellprod.$":1}, function (err3, doc3) {
            if (err3) {
              res.json({
                status: '1',
                msg: err3.message
              })
            } else {
              let sellObj = {
                productId: doc3.sellprod[0].productId,
                productName: doc3.sellprod[0].productName,
                productPrice: doc3.sellprod[0].productPrice,
                productTip: doc3.sellprod[0].productTip,
                productImg: doc3.sellprod[0].productImg,
                productNum: 1,
                checked: "1",
              };
              console.log(sellObj.productName)
              userdoc.cartList.push(sellObj);
              userdoc.save(function (err4) {
                if (err4) {
                  res.json({
                    status: '1',
                    msg: err4.message
                  })
                } else {
                  res.json({
                    status: '0',
                    msg: '',
                    result: 'suc'
                  })
                }
              })
            }
          })
        }
      }
    }
  })
});
//套装购买接口
  router.post("/addSuit", function (req, res, next) {
    let userId="007";
    let productId = req.body.productId;
    User.findOne({userId:userId},function (err, userdoc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        if(userdoc){
          let repeatFlag='';
          userdoc.cartList.forEach(function (item) {
            if(item.productId===productId){
              repeatFlag=item;
              item.productNum++;
            }
          });

          if(repeatFlag){
            userdoc.save(function (err2) {
              if(err2){
                res.json({
                  status: '1',
                  msg: err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }else{
            suit.findOne({"suitprod.productId":productId},{"suitprod.$":1},function (err3, doc3) {
              if(err3){
                res.json({
                  status: '1',
                  msg: err3.message
                })
              }else{
                // console.log(doc3.productName)

                let sellObj={
                  productId: doc3.suitprod[0].productId,
                  productName: doc3.suitprod[0].productName,
                  productPrice: doc3.suitprod[0].productPrice,
                  productTip: doc3.suitprod[0].productTip,
                  productImg: doc3.suitprod[0].productImg,
                  productNum: 1,
                  checked: "1",
                };
                // console.log(doc3)
                // console.log(sellObj.productName)
                // console.log(sellObj.productPrice)
                // console.log(sellObj.productTip)
                // console.log(sellObj.productImg)
                userdoc.cartList.push(sellObj);
                userdoc.save(function (err4) {
                  if(err4){
                    res.json({
                      status: '1',
                      msg: err4.message
                    })
                  }else{
                    res.json({
                      status:'0',
                      msg:'',
                      result:'suc'
                    })
                  }
                })
              }
            })
          }
        }
      }
    })
});

  //加入购物车
router.post("/addCart", function (req, res, next) {
  let userId = "007";
  let productId = req.body.productId;
  User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {

      if (userDoc) {
        let repeatFlag = "";
        userDoc.cartList.forEach(function (item) {
          if (item.productId == productId) {
            repeatFlag = item;
            item.productNum++
          }
        });
        if (repeatFlag) {
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: "suc"
              })
            }
          })
        } else {
          // console.log(productId);
          Products.findOne({"prod.productId":productId},{"prod.$":1}, function (err1, doc1) {    //返回一条数据
            if (err) {
              res.json({
                status: '1',
                msg: err1.message
              })
            } else {
              if (doc1) {
                let newObj = { //新创建一个对象，实现转换mongoose不能直接增加属性的坑
                  productId: doc1.prod[0].productId,
                  productName: doc1.prod[0].productName,
                  productPrice: doc1.prod[0].productPrice,
                  productTip: doc1.prod[0].productTip,
                  productImg: doc1.prod[0].productImg,
                  productNum: 1,
                  checked: "1",
                };
                userDoc.cartList.push(newObj);
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: "suc"
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })
});

//主页购物车列表查询
router.post("/getCartList", function (req, res, next) {
  var userName = req.body.userName;
  User.findOne({userName: userName}, function (err, doc) {
    // console.log(doc);
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      // console.log(doc.cartList);
      res.json({
        status: '0',
        msg: 'suc',
        result: doc
      })
    }
  })
});
//主页购物车商品删除
router.post("/remData", function (req, res, next) {
  let productId = req.body.productId;
  let userId = req.cookies.userId;

  User.update({userId: userId}, {$pull: {'cartList': {'productId': productId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      // console.log(doc);
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
});

//编辑购物车
router.post("/editCart", function (req, res, next) {
  let editObj = {
    userId: req.cookies.userId,
    productId: req.body.productId,
    productNum: req.body.productNum,
  };

  User.update({
    userId: editObj.userId,
    'cartList.productId': editObj.productId
  }, {'cartList.$.productNum': editObj.productNum}, function (err, doc) {
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
        result: doc
      })
    }
  })
});





module.exports = router;
