const stuDao=require('../dao/app1Dao')
const iot = require('alibabacloud-iot-device-sdk');
var cz = 'NORMAL';
const device = iot.device({
    productKey: 'a1byi9jjmMr', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'dogT',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '1d035b8bb5a4b4e04828f01edcda2f48',//将<deviceSecret>修改为实际设备的DeviceSecret
  })
  device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a1byi9jjmMr/dogT/user/get'); 
   // console.log('connect successfully!');
    //发送消息给谁
    device.publish('/a1byi9jjmMr/dogT/user/update', 'hello world!');
  });
    device.on('message', (topic, payload) => {
//  /   console.log(topic, payload.toString());
  });
const int = setInterval(() => {
    var sql="SELECT value FROM device WHERE id = "+'018' ;
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
    if(zz > 39){
      cz = "HIGH"
      //console.log(zt)
    }else if(zz < 38){
      cz = "LOW"
     }else{
      cz = "NORMAL"
     }
   }
    })
  }, 500);
module.exports={
    dogT(req,resp){
        const id = req.params['id'];   
        const values = req.params['values']
        var zz = [id,'dogT',values,cz]
        var zzz = [values,cz,id]
        
        const wen=parseInt(values);
        //console.log(wen)
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
          resp.end();
          device.postProps({
            CurrentTemperature: wen
            }, (res) => {
            });
    },
    Tips(req,resp){
        var sql1="SELECT value FROM device WHERE id = "+'018' ;
        stuDao.getStuDao(sql1,[],function(err,data){
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            //console.log(data);
            console.log(data[0].value);
            var data1 = data[0].value;
             if(data1 === "38"){
                resp.send({ succ: true });
                resp.end();
             }else{
                resp.send({ succ: false });
                resp.end();
             }
        })
        },

    }
