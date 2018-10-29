//2018.7.7  15:40

let express = require('express');
let router = express.Router();

//加载数据库模型
let admin = require("./../models/admin");      //加载后台管理员model

//路由控制
router.post("/logins", function (req, res, next) {
  // console.log(888888);
  let leName = req.body.leName;
  let lePwd = req.body.lePwd;
  admin.findOne({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: 'err'
      })
    } else {
//循环查找用户
      let have = false;
      doc.admin.forEach(function (item) {
        if (item.leName === leName && item.lePwd === lePwd) {
//记录cookies
          have = true;
          res.cookie('leName', item.leName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          });
          // res.cookie('lePwd', item.lePwd, {     //安全问题不能存储管理员密码
          //   path: '/',
          //   maxAge: 1000 * 60 * 60
          // });

          res.json({
            status: 'YES',
            msg: 'suc',
            result: 'YESUSER'
          });
        }
      });
      if (!have) {
        res.json({
          status: 'NULL',
          msg: 'NO',
          result: 'NOUSER'
        });
      }
//找不到用户
    }
  })
});


module.exports = router;









































