const stuDao=require('../dao/app1Dao')
const iot = require('alibabacloud-iot-device-sdk');
var cz = "off"
var zt = 0;
var tem = '';
const int = setInterval(() => {
  var sql="SELECT value FROM device WHERE id = "+'013' ;
  stuDao.getStuDao(sql,[],function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
   stuDao.getStuDao("SELECT temp1 FROM temp1 WHERE id = 013" ,[],function(err,result1){
   const te = JSON.parse(JSON.stringify(result1));
   //console.log(te)
   tem = Number(te[0].temp1)-3;
 })
 //console.log(result)
 const mid=JSON.parse(JSON.stringify(result));
 if(JSON.stringify(mid) === '[]'){

 }else{
  //console.log(tem)
  const zz=mid[0].value;
  //console.log(zz)
  if(zz < tem){
    zt = 1
    cz = "on"
    //console.log(zt)
  }else{
    zt = 0
    cz = "off"
   }
 }
  })
}, 500);

const device = iot.device({
  productKey: 'a1GNbY1iJTo', //将<productKey>修改为实际产品的ProductKey
  deviceName: 'baowen1',//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: '4f7e93ff1c4c1a365e0ebbc04ec5511a',//将<deviceSecret>修改为实际设备的DeviceSecret
})
device.on('connect', () => {
  //将<productKey> <deviceName>修改为实际值
  device.subscribe('/a1GNbY1iJTo/baowen1/user/get'); 
 // console.log('connect successfully!');
  //发送消息给谁
  device.publish('/a1GNbY1iJTo/baowen1/user/update', 'hello world!');
});
device.on('message', (topic, payload) => {

});
module.exports={ 
   hot(req,resp){
     const id = req.params['id'];   
     const status = req.params['status']
     var zz=[id,'hot',status,cz];
     var zzz=[status,cz,id]
    var sq="INSERT INTO device (id,type,value,cz) VALUES (?,?,?,?)";
    stuDao.getStuDao(sq,zz,function(err,data){
      if(err){
       // console.log('[SELECT ERROR] - ',err.message);
        return;
      }
  })
 
  var s='UPDATE device SET value = ?, cz= ? WHERE id = ?';
  stuDao.getStuDao(s,zzz,function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
})  
device.postProps({
    LightStatus:Number(zt),
     }, (res) => {
   //console.log(res);
   });	
   //console.log(zt);
   device.onProps((cmd)=>{
    console.log('>>>onProps',cmd); //打印完整的属性设置消息
    for(var key in cmd.params){ 
      if(key=='LightStatus'){ //判断是否设置的是LightSwitch属性
    //   //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
          zt = cmd.params.LightStatus;
          clearInterval(int);
    //   //本地设置完毕之后，将更新后的状态报告给云端。
    //   //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
           device.postProps({'LightStatus':zt});
           //console.log(zt);
       }
     }
     })
    const obj = {
      id: id,
      success: true, // 是否成功
      status: zt
      };
      int.unref();
      resp.write(JSON.stringify(obj));
// 结束应答
      resp.end();       
}
}