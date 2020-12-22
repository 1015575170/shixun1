const stuDao=require('../dao/app1Dao')
var aliLedStatus = 0;
var cz = "off"
const iot = require('alibabacloud-iot-device-sdk');
const device = iot.device({
  productKey: 'a1Yqscm1PNN', //将<productKey>修改为实际产品的ProductKey
  deviceName: 'LED777',//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: '181ca0df817a84b0b4697600620b3edb',//将<deviceSecret>修改为实际设备的DeviceSecret
})
device.on('connect', () => {
  //将<productKey> <deviceName>修改为实际值
  device.subscribe('/a1Yqscm1PNN/LED777/user/get'); 
  console.log('connect successfully!');
  //发送消息给谁
  device.publish('/a1Yqscm1PNN/LED777/user/update', 'hello world!');
});
device.on('message', (topic, payload) => {

});
module.exports={ 
    led(req,resp){
       const id = req.params['id'];   
       const status = req.params['status']
       var zz=[id,'led',status,cz];
       var zzz=[status,cz,id]
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
       // console.log('[SELECT ERROR] - ',err.message);
        return;
      }
  })
  device.postProps({
    LightStatus: status 
    }, (res) => {
  //console.log(res);
  });	 
  device.onProps((cmd)=>{
 console.log('>>>onProps',cmd); //打印完整的属性设置消息
 for(var key in cmd.params){ 
   if(key=='LightStatus'){ //判断是否设置的是LightSwitch属性
 //   //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
    aliLedStatus = cmd.params.LightStatus; 
 //   //本地设置完毕之后，将更新后的状态报告给云端。
 //   //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
        device.postProps({'LightStatus': aliLedStatus});
    }
  }
  })
       const obj = {
        id: id,
        success: true, // 是否成功
        status: aliLedStatus // 将云服务器的设备状态放入status字段里
        };
        resp.write(JSON.stringify(obj));
// 结束应答
        resp.end();        
        
},
ledon(req,resp){
  aliLedStatus = 1;  
  cz = "on";
  resp.send({ succ: true });
  resp.end();
},
ledoff(req,resp){
  aliLedStatus = 0;
  cz = "off";
  resp.send({ succ: true });
  resp.end();
}
}