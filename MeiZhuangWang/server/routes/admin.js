let express = require('express');
let router = express.Router();
let Products = require("./../models/products");  //加载商店商品信息数据库模型
let suit = require("./../models/suit");          //加载化妆品套装信息数据库模型
let develops = require("./../models/deleloper");    //加载开发者信息数据库模型
let User = require("./../models/user");          //加载登陆用户信息
let sellwell = require("./../models/sellwell");    //加载畅销商品数据库模型
let leUser = require("./../models/admin");    //加载后台管理员数据库模型


require("./../util/util");               //加载工具类
let formidable = require("formidable");            //文件上传模块
let fs = require('fs');
let path = require("path");
let url = require("url");
let util = require("util");

//测试接口
// router.get('/', function (req, res, next) {
//   res.send('admin');
// });


//后台管理接口
//登陆用户信息
router.post("/leUser", function (req, res, next) {
  let luser = req.cookies.leName;
  leUser.findOne({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: 'err'
      })
    } else {
      if (doc) {
        // let leName='',leimg='',arr={};
        let arr = {};

        doc.admin.forEach(function (item) {
          if (item.leName === luser) {

            arr = {
              leName: item.leName,
              leimg: item.leimg
            };
            console.log(arr);
            res.json({
              status: '0',
              msg: 'SUC',
              result: arr
            })
          }
        });
        // if(!leName){
        //   res.json({
        //     status:'1',
        //     msg:'NOLE',
        //     result:'NO'
        //   })
        // }

      }
    }
  })
});


//官方产品接口

router.post("/goods", function (req, res, next) {
  // let Obj={
  //   productId: doc.productId,
  //   productName: doc.productName,
  //   productPrice: doc.productPrice,
  //   productOldPrice:doc.productOldPrice,
  //   productTip: doc.productTip,
  //   productImg: doc.productImg,
  //   productNum: String,
  //   checked: doc.checked,
  //   uploadTime:"2018-06-22",
  //   uploads:"蔡先佳"
  // };

  Products.findOne({productSId: "007"}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: 'err'
      })
    } else {
      // console.log(doc)
      res.json({
        status: '0',
        msg: 'suc',
        result: doc.prod
      })
    }
  })
});

//美妆套装接口
router.post("/suits", function (req, res, next) {
  suit.findOne({}, function (err, doc) {
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
        result: doc.suitprod
      })
    }
  })
});

//畅销接口
router.post("/sellwell", function (req, res, next) {

  sellwell.findOne({}, function (err, doc) {
    // console.log(doc)
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
        result: doc.sellprod
      })
    }
  })
});

//上传商品
// router.post("/uploadgoods",function (req, res, next) {
//   let form = new formidable.IncomingForm();
//
//   form.parse(req, function(err, fields, files) {
//     console.log(fields)
//     console.log(files)
//   });
//   res.end("成功！1");
//
//   return;
// });

// exports.doPost=function(req,res){
//   let form = new formidable.IncomingForm();
//
//   form.parse(req, function(err, fields, files) {
//     console.log(fields)
//     console.log(files)
//   });
//   res.end("成功！1");
//
//   return;
// }
//
// var form = new formidable.IncomingForm();
// var post = {},
//   file = {};
// // form.uploadDir = '/tmp';  //文件上传 临时文件存放路径
//
// form.on('error', function(err) {
//     console.log(err); //各种错误
//   })
//   //POST 普通数据 不包含文件 field 表单name value 表单value
//   // .on('field', function(field, value) {
//   //   if (form.type == 'multipart') {  //有文件上传时 enctype="multipart/form-data"
//   //     if (field in post) { //同名表单 checkbox 返回array 同get处理
//   //       if (util.isArray(post[field]) === false) {
//   //         post[field] = [post[field]];
//   //       }
//   //       post[field].push(value);
//   //       return;
//   //     }
//   //   }
//   //   post[field] = value;
//   // })
//   .on('file', function(field, file) { //上传文件
//     file[field] = file;
//   })
//   .on('end', function() {
//     fn(); //解析完毕 做其他work
//   });
// form.parse(request); //解析request对象

//官方上传商品
router.post("/uploadgoods", function (req, res, next) {
  console.log('开始文件上传....');
  var form = new formidable.IncomingForm();
  //设置编辑
  form.encoding = 'utf-8';
  // //设置文件存储路径
  form.uploadDir = "./static/img/shop-list/";
  // //保留后缀
  form.keepExtensions = true;
  // //设置单文件大小限制
  form.maxFieldsSize = 2 * 1024 * 1024;
  // //form.maxFields = 1000;  设置所以文件的大小总和

  form.parse(req, function (err, fields, files) {
    // console.log(fields.productId);
    //接收表单数据


    // console.log(files.thumbnail.name);
    // console.log(files.files.name);
    // console.log(files);
    // console.log(fields);
    // console.log(files.thumbnail.path);
    // console.log('文件名:'+files.thumbnail.name);
    let t = (new Date()).getTime();
    // //生成随机数
    let ran = parseInt(Math.random() * 8999 + 10000);
    // //拿到扩展名
    let extname = path.extname(files.thumbnail.name);
    //
    // path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
    let oldpath = path.normalize(files.thumbnail.path);
    //新的路径
    let newfilename = t + ran + extname;

    let par = {
      "productId": fields.productId,
      "productOldPrice": fields.productOldPrice,
      "productPrice": fields.productPrice,
      "productTip": fields.productTip,
      "productName": fields.productName,
      "productImg": newfilename,
      // "productImg":files.thumbnail.name,
      "createDate": new Date()
    };

    Products.update({productSId: "007"}, {$push: {"prod": par}}, function (err, doc) {
      if (err) {
        res.json({
          ststus: '1',
          msg: err.message,
          result: 'err'
        })
      } else {
        console.log("表单上传成功！");
      }
    });
    //
    // console.log(oldpath);
    //
    let newpath = './static/img/shop-list/' + newfilename;
    // console.warn('oldpath:'+oldpath+' newpath:'+newpath);
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.error("改名失败" + err);
      }
      console.log("文件上传成功！");
    });
    res.end(util.inspect({fields: fields, files: files}));
  });
});

//官方商品删除
router.post("/removedata", function (req, res, next) {
  let productId = req.body.productId;
  // console.log(productId);
  Products.update({productSId: "007"}, {$pull: {"prod": {"productId": productId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: 'err'
      })
    } else {
      res.json({
        status: '0',
        msg: '0',
        result: 'suc'
      })
    }
  })
});

//更新ID（productId）--------官方商品
router.post("/updateId", function (req, res, next) {
  let oldProductId = req.body.oldProductId;
  let newProductId = req.body.newProductId;
  console.log(oldProductId);
  console.log(newProductId);

  Products.update({productSId: '007', 'prod.productId': oldProductId}, {'prod.$.productId': newProductId},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品描述（productTip）--------官方商品
router.post("/updateTip", function (req, res, next) {
  let oldProductTip = req.body.oldProductTip;
  let newProductTip = req.body.newProductTip;
  console.log(oldProductTip);
  console.log(newProductTip);

  Products.update({productSId: '007', 'prod.productTip': oldProductTip}, {'prod.$.productTip': newProductTip},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品品牌名(productName)--------官方商品
router.post("/updateName", function (req, res, next) {
  let oldProductName = req.body.oldProductName;
  let newProductName = req.body.newProductName;
  console.log(oldProductName);
  console.log(newProductName);

  Products.update({productSId: '007', 'prod.productName': oldProductName}, {'prod.$.productName': newProductName},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品原价（productOldPrice）--------官方商品
router.post("/updateOldPrice", function (req, res, next) {
  let oldProductPrice = req.body.oldProductPrice;
  let newOldProductPrice = req.body.newOldProductPrice;

  console.log(oldProductPrice);
  console.log(newOldProductPrice);

  Products.update({
      productSId: '007',
      'prod.productOldPrice': oldProductPrice
    }, {'prod.$.productOldPrice': newOldProductPrice},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品折扣价（productPrice）--------官方商品
router.post("/updatePrice", function (req, res, next) {
  let productPrice = req.body.productPrice;
  let newProductPrice = req.body.newProductPrice;

  console.log(productPrice);
  console.log(newProductPrice);

  Products.update({productSId: '007', 'prod.productPrice': productPrice}, {'prod.$.productPrice': newProductPrice},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});


//更新ID（productId）--------畅销商品
router.post("/updateWellId", function (req, res, next) {
  let oldProductId = req.body.oldProductId;
  let newProductId = req.body.newProductId;
  console.log(oldProductId);
  console.log(newProductId);

  sellwell.update({productSId: '008', 'sellprod.productId': oldProductId}, {'sellprod.$.productId': newProductId},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品描述（productTip）--------畅销商品
router.post("/updateWellTip", function (req, res, next) {
  let oldProductTip = req.body.oldProductTip;
  let newProductTip = req.body.newProductTip;
  console.log(oldProductTip);
  console.log(newProductTip);

  sellwell.update({productSId: '008', 'sellprod.productTip': oldProductTip}, {'sellprod.$.productTip': newProductTip},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品品牌名(productName)--------畅销商品
router.post("/updateWellName", function (req, res, next) {
  let oldProductName = req.body.oldProductName;
  let newProductName = req.body.newProductName;
  // console.log(oldProductName);
  // console.log(newProductName);

  sellwell.update({
      productSId: '008',
      'sellprod.productName': oldProductName
    }, {'sellprod.$.productName': newProductName},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品原价（productOldPrice）--------畅销商品
router.post("/updateWellOldPrice", function (req, res, next) {
  let oldProductPrice = req.body.oldProductPrice;
  let newOldProductPrice = req.body.newOldProductPrice;

  console.log(oldProductPrice);
  console.log(newOldProductPrice);

  sellwell.update({
      productSId: '008',
      'sellprod.productOldPrice': oldProductPrice
    }, {'sellprod.$.productOldPrice': newOldProductPrice},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品折扣价（productPrice）--------畅销商品
router.post("/updateWellPrice", function (req, res, next) {
  let productPrice = req.body.productPrice;
  let newProductPrice = req.body.newProductPrice;

  console.log(productPrice);
  console.log(newProductPrice);

  sellwell.update({
      productSId: '008',
      'sellprod.productPrice': productPrice
    }, {'sellprod.$.productPrice': newProductPrice},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新ID（productId）--------套装商品
router.post("/updateSuitId", function (req, res, next) {
  let oldProductId = req.body.oldProductId;
  let newProductId = req.body.newProductId;
  console.log(oldProductId);
  console.log(newProductId);

  suit.update({productSId: '009', 'suitprod.productId': oldProductId}, {'suitprod.$.productId': newProductId},

    function (err, doc) {
      // console.log(doc);
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
          result: doc
        })
      }
    })
});

//更新商品描述（productTip）--------套装商品
router.post("/updateSuitTip", function (req, res, next) {
  let oldProductTip = req.body.oldProductTip;
  let newProductTip = req.body.newProductTip;
  console.log(oldProductTip);
  console.log(newProductTip);

  suit.update({productSId: '009', 'suitprod.productTip': oldProductTip}, {'suitprod.$.productTip': newProductTip},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品品牌名(productName)--------套装商品
router.post("/updateSuitName", function (req, res, next) {
  let oldProductName = req.body.oldProductName;
  let newProductName = req.body.newProductName;
  // console.log(oldProductName);
  // console.log(newProductName);

  suit.update({productSId: '009', 'suitprod.productName': oldProductName}, {'suitprod.$.productName': newProductName},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品原价（productOldPrice）--------套装商品
router.post("/updateSuitOldPrice", function (req, res, next) {
  let oldProductPrice = req.body.oldProductPrice;
  let newOldProductPrice = req.body.newOldProductPrice;

  console.log(oldProductPrice);
  console.log(newOldProductPrice);

  suit.update({
      productSId: '009',
      'suitprod.productOldPrice': oldProductPrice
    }, {'suitprod.$.productOldPrice': newOldProductPrice},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//更新商品折扣价（productPrice）--------套装商品
router.post("/updateSuitPrice", function (req, res, next) {
  let productPrice = req.body.productPrice;
  let newProductPrice = req.body.newProductPrice;

  console.log(productPrice);
  console.log(newProductPrice);

  suit.update({productSId: '009', 'suitprod.productPrice': productPrice}, {'suitprod.$.productPrice': newProductPrice},
    function (err, doc) {
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
          result: doc
        })
      }
    })
});

//订单管理
router.post("/ordermanagement", function (req, res, next) {
  User.findOne({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: 'err'
      })
    } else {
      // console.log(doc.orderList);
      res.json({
        status: '0',
        msg: 'suc',
        result: doc.orderList
      })
    }
  })
});


module.exports = router;































































