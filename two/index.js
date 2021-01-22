const exp =require("express");
const logger=require("morgan");
var bodyParser = require('body-parser');
const route=require("./routers/indexRouter")
const app=exp();
const container = require('rhea'); 
const crypto = require('crypto');
app.all('*', function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept,X-Requested-With");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By", ' 3.2.1')
      if (req.method == "OPTIONS") res.send(200);
      else next();
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(route);
app.use(logger("dev"));
app.use(exp.static(__dirname+"/static"))
app.listen(3000,()=>{
    console.log("express启动");
})
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
  });
