const stuDao=require('../dao/app1Dao')
const iot = require('alibabacloud-iot-device-sdk');
var aliLedStatus = '';
const device = iot.device({
    productKey: 'a1cK7OVdRqZ', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'dangwei',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '9a62e52038c7b3c35016e97b6158c78c',//将<deviceSecret>修改为实际设备的DeviceSecret
  })
  device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a1cK7OVdRqZ/dangwei/user/get'); 
   // console.log('connect successfully!');
    //发送消息给谁
    device.publish('/a1cK7OVdRqZ/dangwei/user/update', 'hello world!');
  });
  device.on('message', (topic, payload) => {
//  /   console.log(topic, payload.toString());
  }); 

module.exports={ 
   one(req,resp){
    let id = '011';
    let time = req.body.time;
    console.log(id,time)
      var sql='UPDATE time SET time2 = ? WHERE id = 011';
      stuDao.getStuDao(sql,[time],function(err,data){
          //console.log(err)
           resp.send({ succ: true });
      })
   },
   two(req,resp){
    let id = '011';
    let time = req.body.time;
    console.log(id,time)
      var sql='UPDATE time SET time2 = ? WHERE id = 011';
      stuDao.getStuDao(sql,[time],function(err,data){
          //console.log(err)
           resp.send({ succ: true });
      })
   },
   three(req,resp){
    let id = '011';
    let time = req.body.time;
    console.log(id,time)
      var sql='UPDATE time SET time2 = ? WHERE id = 011';
      stuDao.getStuDao(sql,[time],function(err,data){
          //console.log(err)
           resp.send({ succ: true });
      })
   },
   four(req,resp){
    let id = '011';
    let time = req.body.time;
    console.log(id,time)
      var sql='UPDATE time SET time2 = ? WHERE id = 011';
      stuDao.getStuDao(sql,[time],function(err,data){
          //console.log(err)
           resp.send({ succ: true });
      })
   },
   five(req,resp){
    let id = '011';
    let time = req.body.time;
    console.log(id,time)
      var sql='UPDATE time SET time2 = ? WHERE id = 011';
      stuDao.getStuDao(sql,[time],function(err,data){
          //console.log(err)
           resp.send({ succ: true });
      })
   },
   six(req,resp){
    let id = '011';
    let time = req.body.time;
    console.log(id,time)
      var sql='UPDATE time SET time2 = ? WHERE id = 011';
      stuDao.getStuDao(sql,[time],function(err,data){
          //console.log(err)
           resp.send({ succ: true });
      })
   },
   time2(req,resp){
    stuDao.getStuDao("SELECT time2 FROM time;",[],function(err,data){
      if(data.length>0){
          var time22 = JSON.parse(JSON.stringify(data));
          //console.log(queryData)
          //console.log(queryData[0].time)
          const obj = {
              time2: time22[0].time2// 将云服务器的设备状态放入status字段里
              };
             // console.log(obj)
              resp.write(JSON.stringify(obj));
      // 结束应答
              resp.end(); 
      }
  device.postProps({
    LightLux: Number(time22[0].time2)
  }, (res) => {
  });
  device.onProps((cmd)=>{
    //console.log('>>>onProps',cmd); //打印完整的属性设置消息
    for(var key in cmd.params){ 
      if(key=='LightLux'){ //判断是否设置的是LightSwitch属性
    //   //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
       aliLedStatus = cmd.params.LightLux; 
       console.log(aliLedStatus);
    //   //本地设置完毕之后，将更新后的状态报告给云端。
    //   //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
           device.postProps({'LightLux': aliLedStatus});
       }
     }
     var sql='UPDATE time SET time2 = ? WHERE id = 011';
     stuDao.getStuDao(sql,[aliLedStatus],function(err,data){
          //console.log(err)
          //resp.send({ succ: true });
     })
     })

  })

  },
  time3(req,resp){
    stuDao.getStuDao("SELECT time FROM time;",[],function(err,data){
      if(data.length>0){
          var time33 = JSON.parse(JSON.stringify(data));
          //console.log(time33)
          //console.log(time33[0].time)
          const obj = {
              time: time33[0].time// 将云服务器的设备状态放入status字段里
              };
             // console.log(obj)
              resp.write(JSON.stringify(obj));
      // 结束应答
              resp.end(); 
      }
  })   
}
}
