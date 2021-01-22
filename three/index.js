const exp =require("express");
const container = require('rhea'); 
const crypto = require('crypto');
const logger=require("morgan");
var bodyParser = require('body-parser');
const route=require("./routers/indexRouter")
const app=exp();
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
app.listen(8080,()=>{
    console.log("express启动");
})
var d=new Date();
const stuDao=require('./dao/app1Dao')
var connection = container.connect({  
      //接入域名，请参见AMQP客户端接入说明文档。 
        'host': '1537168617511384.iot-amqp.cn-shanghai.aliyuncs.com',  
        'port': 5671, 
         'transport':'tls',  
        'reconnect':true, 
          'idle_time_out':60000,   
      // 7C-2A-31-40-8F-3A
        //userName组装方法，请参见AMQP客户端接入说明文档。其中的iotInstanceId，购买的实例请填写实例ID，公共实例请填 空字符串""。  
         'username':'7C-2A-31-40-8F-3A|authMode=aksign,signMethod=hmacsha1,timestamp='+d.getTime()+',authId=LTAI4Ft1B2xSEDTD3YqEYVPo,iotInstanceId=,consumerGroupId=DEFAULT_GROUP|',     
        //计算签名，password组装方法，请参见AMQP客户端接入说明文档。  
          'password': hmacSha1('9LJHJcCtBaM1uJVRq2HfubrDJrQWmE','authId=LTAI4Ft1B2xSEDTD3YqEYVPo&timestamp='+d.getTime()), 
        });
//创建Receiver连接。 
var receiver = connection.open_receiver();
//接收云端推送消息的回调函数。 
//摄像头
container.on('message', function (context) {  
       var msg = context.message;   
       var messageId = msg.message_id;  
       var topic = msg.application_properties.topic;  
       var content = Buffer.from(msg.body.content).toString();
        if(topic === '/a1FUt2muta3/jiankong/thing/event/property/post'){       
            // 针对msg.body.content进行简单的处理
           var aaa = JSON.parse(content);
           //console.log(aaa.items.WorkState.value)
           var zzz = [aaa.items.WorkState.value];
           var sql='UPDATE device SET value = ? WHERE id = 012';
           stuDao.getStuDao(sql,zzz,function(err,result){
           if(err){
         // console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })
          } 
    //发送ACK，注意不要在回调函数有耗时逻辑。
     context.delivery.accept(); });


//喂食器
//   container.on('message', function (context) {
//       var msg = context.message;   
//       var messageId = msg.message_id;  
//       var topic = msg.application_properties.topic;  
//       var content = Buffer.from(msg.body.content).toString();
//        if(topic === '/a1U4Jd1KDYN/feed/thing/event/property/post'){       
//            // 针对msg.body.content进行简单的处理
//          // console.log(content)
//           var aaa1 = JSON.parse(content);
//          // console.log(aaa1.items.LightStatus.value)
//           var zzz = [aaa1.items.LightStatus.value];
//           var sql='UPDATE device SET value = ? WHERE id = 011';
//           stuDao.getStuDao(sql,zzz,function(err,result){
//           if(err){
//         // console.log('[SELECT ERROR] - ',err.message);
//          return;
//        }
//    })
//  } 
//    //发送ACK，注意不要在回调函数有耗时逻辑。
//     context.delivery.accept(); });

//降温
container.on('message', function (context) {
      var msg = context.message;   
      var messageId = msg.message_id;  
      var topic = msg.application_properties.topic;  
      var content = Buffer.from(msg.body.content).toString();
       if(topic === '/a1zOjPl8REu/baowen/thing/event/property/post'){       
           // 针对msg.body.content进行简单的处理
         // console.log(content)
          var aaa2 = JSON.parse(content);
          //console.log(aaa2.items.LightStatus.value)
          var zzz = [aaa2.items.LightStatus.value];
          var sql='UPDATE device SET value = ? WHERE id = 014';
          stuDao.getStuDao(sql,zzz,function(err,result){
          if(err){
        // console.log('[SELECT ERROR] - ',err.message);
         return;
       }
   })
         } 
   //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept(); });
 //升温
 container.on('message', function (context) {
      var msg = context.message;   
      var messageId = msg.message_id;  
      var topic = msg.application_properties.topic;  
      var content = Buffer.from(msg.body.content).toString();
       if(topic === '/a1GNbY1iJTo/baowen1/thing/event/property/post'){       
           // 针对msg.body.content进行简单的处理
         // console.log(content)
          var aaa3 = JSON.parse(content);
         // console.log(aaa2.items.LightStatus.value)
          var zzz = [aaa3.items.LightStatus.value];
          var sql='UPDATE device SET value = ? WHERE id = 015';
          stuDao.getStuDao(sql,zzz,function(err,result){
          if(err){
        // console.log('[SELECT ERROR] - ',err.message);
         return;
       }
   })
         } 
   //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept(); });

 //除湿
 container.on('message', function (context) {
      var msg = context.message;   
      var messageId = msg.message_id;  
      var topic = msg.application_properties.topic;  
      var content = Buffer.from(msg.body.content).toString();
       if(topic === '/a1ljXt4OJUl/hum1/thing/event/property/post'){       
           // 针对msg.body.content进行简单的处理
          //console.log(content)
          var aaa4 = JSON.parse(content);
          //console.log(aaa4.items.LightStatus.value)
          var zzz = [aaa4.items.LightStatus.value];
          var sql='UPDATE device SET value = ? WHERE id = 017';
          stuDao.getStuDao(sql,zzz,function(err,result){
          if(err){
        // console.log('[SELECT ERROR] - ',err.message);
         return;
       }
   })
         } 
   //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept(); });

 //狗粮温度
//  container.on('message', function (context) {
//       var msg = context.message;   
//       var messageId = msg.message_id;  
//       var topic = msg.application_properties.topic;  
//       var content = Buffer.from(msg.body.content).toString();
//        if(topic === '/a12KMp6q0o8/hum777/thing/event/property/post'){       
//            // 针对msg.body.content进行简单的处理
//           console.log(content)
//           var aaa5 = JSON.parse(content);
//           if(aaa5 === null){

//           }else{
//               console.log(aaa5.items.CurrentHumidity.value)
//         var zzz = [aaa5.items.CurrentHumidity.value];
//           var sql='UPDATE device SET value = ? WHERE id = 016';
//           stuDao.getStuDao(sql,zzz,function(err,result){
//           if(err){
//         // console.log('[SELECT ERROR] - ',err.message);
//          return;
//        }
//    })
//          } 
//           }
        
//    //发送ACK，注意不要在回调函数有耗时逻辑。
//     context.delivery.accept(); });
//计算password签名。

//挡位 
container.on('message', function (context) {
      var msg = context.message;   
      var messageId = msg.message_id;  
      var topic = msg.application_properties.topic;  
      var content = Buffer.from(msg.body.content).toString();
       if(topic === '/a1cK7OVdRqZ/dangwei/thing/event/property/post'){       
           // 针对msg.body.content进行简单的处理
          console.log(content)
          var aaa5 = JSON.parse(content);
          console.log(aaa5.items.LightLux.value)
          var zzz = [aaa5.items.LightLux.value];
          var sql='UPDATE time SET time2 = ? WHERE id = 011';
          stuDao.getStuDao(sql,zzz,function(err,result){
          if(err){
        // console.log('[SELECT ERROR] - ',err.message);
         return;
       }
   })
         } 
   //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept(); });
 function hmacSha1(key, context) {  
       return Buffer.from(crypto.createHmac('sha1', key).update(context).digest()).toString('base64'); }
      process.on('uncaughtException', function (err) {
        //打印出错误
        console.log(err);
        //打印出错误的调用栈方便调试
        console.log(err.stack);
      });