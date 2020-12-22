const stuDao=require('../dao/app1Dao')
  var zt = 0;  
  var cz = "off"
  const iot = require('alibabacloud-iot-device-sdk');
  const device = iot.device({
    productKey: 'a10s9Rjg0py', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'fan777',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'a2b33e361c7e759263b4479e98363574',//将<deviceSecret>修改为实际设备的DeviceSecret
  })
  device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a10s9Rjg0py/fan777/user/get'); 
    console.log('connect successfully!');
    //发送消息给谁
    device.publish('/a10s9Rjg0py/fan777/user/update', 'hello world!');
  });
  device.on('message', (topic, payload) => {
  
  });
  var kg=0;
  var ws=0;
module.exports={ 
    fan(req,resp){
       const id = req.params['id'];   
       const status = req.params['status']
       var zz=[id,'fan',status,cz];
       //console.log(zz)
       var zzz=[status,cz,id]
       //console.log(zzz)
  var sq="INSERT INTO device (id,type,value,cz) VALUES (?,?,?,?)";
  stuDao.getStuDao(sq,zz,function(err,result){
    if(err){
     // console.log('[SELECT ERROR] - ',err.message);
      return;
    }
})
      var sql='UPDATE device SET value = ?, cz= ? WHERE id = ?';
      stuDao.getStuDao(sql,zzz,function(err,result){
        if(err){
          //console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })
    device.postProps({  	
     PowerSwitch:kg,
     WindSpeed:ws
      }, (res) => {
    //console.log(res);
    });	 
    device.onProps((cmd)=>{
      console.log('>>>onProps',cmd); //打印完整的属性设置消息
      for(var key in cmd.params){ 
        if(key=='WindSpeed'){ //判断是否设置的是LightSwitch属性
      //   //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            zt = cmd.params.WindSpeed; 
      //   //本地设置完毕之后，将更新后的状态报告给云端。
      //   //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
             device.postProps({'WindSpeed': zt});
         }
       }
       })
       ws=zt;
      if(zt>0){
        cz="on"
        kg=1
      }else{
        cz="off"
        kg=0
      }
       const obj = {
        id: id,
        success: true, // 是否成功
        status: zt,
        zt: cz
        };
        resp.write(JSON.stringify(obj));
// 结束应答
        resp.end();       
},
fanoff(req,resp){
  kg=0;
  zt = 0;  
  ws=0;
  cz = "off"
  resp.send({ succ: true });
  resp.end();
},
fanlow(req,resp){
  kg=1;
  ws=1;
  zt = 1;  
  cz = "low speed"
  resp.send({ succ: true });
  resp.end();
},
fanhigh(req,resp){
  kg=1;
  ws=2;
  zt = 2;  
  cz = "high speed"
  resp.send({ succ: true });
  resp.end();
}
}