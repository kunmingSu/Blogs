var db=require('mongoose');
//连接数据库
//改用nodejs自带的promise
db.Promise = global.Promise;
db.connect('mongodb://localhost/blog');

//用户
var UserSchema=db.Schema({
    username:String,
    password:String,
    email:String,
    registerTime:{
        type:Date,
        default:Date.now
    }
});
var User=db.model('User',UserSchema);


//博文
var BlogSchema=db.Schema({
    title:String,
    classify:String,
    txt:String,
    postTime:{
        type:Date,
        default:Date.now
    }
});

//用户博文
var UserBlogSchema=db.Schema({
    uId:{
        type:String,
        ref:'Blog'
    },
    bId:{
        type:String,
        ref:'User'
    }
});
var Blog=db.model('Bolg',BlogSchema);

BlogSchema.methods.getPostTime=function(){
    var year=this.postTime.getFullYear();
    var month=this.postTime.getMonth()+1;
    var date=this.postTime.getDate();
    var h=this.postTime.getHours();
    var m=this.postTime.getMinutes();
    var s=this.postTime.getSeconds();
    return (year+"-"+month+"-"+date+' '+h+":"+m+":"+s);
}
var UserBlog=db.model('UserBlog',UserBlogSchema);
//模块导出
module.exports={
    User:User,
    Blog:Blog,
    UserBlog:UserBlog
}