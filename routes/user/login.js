const express=require('express');
const router=express.Router();
const db=require('../../model/db');
var User=db.User;
var Blog=db.Blog;
var UserBlog=db.UserBlog
//登录页面路由
router.get('/login',(req,res)=>{
    res.render('user/login');
});

// 登录判断处理
 router.post('/login',(req,res)=>{
    //  console.log(req.body);
     var user_info=req.body;
     if(user_info.user_name =='admin' && user_info.user_pwd =='admin'){
         req.session.userId='1';
         res.json({status:280,msg:'管理员登录就绪，准备跳转...'});
     }else{
    //  var userPwd=req.body.user_pwd;
     User.findOne({username:user_info.user_name},function(err,data){
         if(!data){
            res.json({status:400,msg:'用户名不存在，请确认输入!'});
         }else{
             User.findOne({username:user_info.user_name,password:user_info.user_pwd},function(err,data2){
                if(!data2){
                    res.json({status:400,msg:'密码错误，请重新输入!'});
                }else{
                    req.session.userId =data2.id;
                    res.json({status:200,msg:'登录成功，准备跳转...'});
                }
             });
         }
     });
     }
 });
//注册页面路由
router.get('/reg',(req,res)=>{
    res.render('user/register');
});

//注册页面信息提交路由
router.post('/register',(req,res)=>{
    console.log(req.body);
        var user_info=req.body;
        //删除多余数据--确认密码
        delete user_info.reupwd;
        //判断用户名是否重复(改用promise的方式进行数据库操作)
        User.findOne({username:user_info.username}).then(function(data){
            if(data){
                res.json({status:400,msg:'用户名已存在'});
            }else{
                //新建一条记录
                User.create(user_info).then(function(data2){
                    res.json({status:200,msg:'注册成功!'})
                }).catch(function(err2){
                    console.log(err2);
                    res.json({status:400,msg:'注册失败!'});
                });
            }
        }).catch(function(err){
            console.log(err);res.json({status:400,msg:'注册失败!'})
        });
    
});

//发表页面路由
router.get('/post',(req,res)=>{
    res.render('user/post');
});
// 发表页面信息提交路由
router.post('/api/v1/get_data',(req,res)=>{
    console.log(req.body);
    var blog_info=req.body;
    Blog.create(blog_info).then(function(data){
        res.json({status:200,msg:'博文发表成功!'});
    }).catch(function(err){
        console.dir(err);
    }); 
});
//博文列表路由
router.get('/blog',(req,res)=>{
    if(req.session.userId){
        var uid=req.session.userId;
    }
    Blog.find({}).then(function(data){
      if(data){
        res.render('user/article',{userId:uid,data:data});
      }
    }).catch(function(err){
      console.log(err);
    });
});






module.exports=router;