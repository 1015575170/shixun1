
const stuDao=require('../dao/app1Dao')
const iot = require('alibabacloud-iot-device-sdk'); 
var cz = "NORMAL"
const device = iot.device({
    productKey: 'a12KMp6q0o8', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'hum777',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '33acd7cfd8516a95b0902c9668fcb41b',//将<deviceSecret>修改为实际设备的DeviceSecret
  })
  device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a12KMp6q0o8/hum777/user/get'); 
   // console.log('connect successfully!');
    //发送消息给谁
    device.publish('/a12KMp6q0o8/hum777/user/update', 'hello world!');
  });
  device.on('message', (topic, payload) => {
//  /   console.log(topic, payload.toString());
  }); 
  const int = setInterval(() => {
    var sql="SELECT value FROM device WHERE id = "+'013' ;
    stuDao.getStuDao(sql,[],function(err,result){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
   //console.log(result)
   const mid=JSON.parse(JSON.stringify(result));
   if(JSON.stringify(mid) === '[]'){
  
   }else{
    //console.log(tem)
    const zz=mid[0].value;
    //console.log(zz)
    if(zz > 60){
      cz = "HIGH"
      //console.log(zt)
    }else{
      cz = "NORMAL"
     }
   }
    })
  }, 500);
module.exports={ 
    hum(req,resp){
      const id = req.params['id'];   
      const values = req.params['values']
      //console.log(values);
      var zz=[id,'hum',values,cz];
      var zzz=[values,cz,id]
      stuDao.getStuDao("INSERT INTO device (id,type,value,cz) VALUES (?,?,?,?)",zz,function(err,data){
        if(err){
         // console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })
    var sql='UPDATE device SET value = ?, cz= ? WHERE id = ?';
    stuDao.getStuDao(sql,zzz,function(err,data){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
  })  
      humi= parseInt(values);
      //console.log(humi);
      device.postProps({
        CurrentHumidity: humi
        }, (res) => {
        });	
        resp.end(); 
},

}