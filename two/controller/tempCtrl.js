const stuDao=require('../dao/app1Dao')

const iot = require('alibabacloud-iot-device-sdk');
var cz = "NORMAL"
var tem = '';
var tem1 = '';
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
   stuDao.getStuDao("SELECT temp1 FROM temp1 WHERE id = 013" ,[],function(err,result1){
     const te = JSON.parse(JSON.stringify(result1));
     //console.log(te)
     tem = Number(te[0].temp1)+3;
     tem1= Number(te[0].temp1)-3;
   })
   const mid=JSON.parse(JSON.stringify(result));
   if(JSON.stringify(mid) === '[]'){
  
   }else{
    //console.log(tem)
    const zz=mid[0].value;
    //console.log(zz)
    if(zz > tem){
      cz = "HIGH"
      //console.log(zt)
    }else if(zz < tem1){
      cz = "LOW"
     }else{
      cz = "NORMAL"
     }
   }
    })
  }, 500);
module.exports={ 
    temp(req,resp){
     //var t2 = new Date().toLocaleString();
     //console.log(req.params)
    const id = req.params['id'];   
    const values = req.params['values']
    const wen=parseInt(values);
    console.log(wen)
    var zz=[id,'temp',values,cz];
    var zzz=[values,cz,id]
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
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
  })
    var xx = "true";
    const obj = {
    id: id,
    success: xx,
    };
    //console.log(obj)
    resp.write(JSON.stringify(obj));
// 结束应答
    resp.end();
    device.postProps({
      CurrentTemperature: wen 
      }, (res) => {
      });
  },


}