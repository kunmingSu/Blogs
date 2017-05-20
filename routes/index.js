var express = require('express');
var router = express.Router();
const db=require('../model/db');
var Blog=db.Blog;
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userId){
        var uid=req.session.userId;
    }
    Blog.find({}).then(function(data){
      if(data){
        console.log(data);
        res.render('index',{userId:uid,data:data});
      }
    }).catch(function(err){
      console.log(err);
    });
  
});




//注册页面信息提交路由
module.exports = router;
