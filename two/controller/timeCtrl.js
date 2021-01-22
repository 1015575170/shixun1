const stuDao=require('../dao/app1Dao')
const iot = require('alibabacloud-iot-device-sdk');

var cz = "off"
var aliLedStatus = '0';
const device = iot.device({
  productKey: 'a1U4Jd1KDYN', //将<productKey>修改为实际产品的ProductKey
  deviceName: 'feed',//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: '0251ae78aab396adcd97cb387a36021b',//将<deviceSecret>修改为实际设备的DeviceSecret
})
device.on('connect', () => {
  //将<productKey> <deviceName>修改为实际值
  device.subscribe('/a1U4Jd1KDYN/feed/user/get'); 
 // console.log('connect successfully!');
  //发送消息给谁
  device.publish('/a1U4Jd1KDYN/feed/user/update', 'hello world!');
});
device.on('message', (topic, payload) => {
//  /   console.log(topic, payload.toString());
}); 

const int = setInterval(() => {
    var sql="SELECT value FROM device WHERE id = "+'011' ;
    stuDao.getStuDao(sql,[],function(err,result){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
   //console.log(result)
   const mid=JSON.parse(JSON.stringify(result));
   if(JSON.stringify(mid) === '[]'){
  
   }else{
    //console.log(mid)
    const zz=mid[0].value;
    //console.log(zz)
    if(zz === "1"){
      cz = "on"
      //console.log(cz)
    }else{
      cz = "off"
     }
   }
    })
  }, 500);
//===============================================================================================================

module.exports={
    time(req,resp){
        let id = '011';
        let time = req.body.time;
        console.log(id,time)
          var sql='UPDATE time SET time = ? WHERE id = 011';
          stuDao.getStuDao(sql,[time],function(err,data){
              //console.log(err)
               resp.send({ succ: true });
          })
    },
    // read(req,resp){
    //     console.log(req.query);
    //     stuDao.getStuDao("SELECT * FROM time;",[],function(err,data){
    //         if(data.length>0){
    //             let queryData = JSON.stringify(data);
    //             console.log(queryData)
    //             resp.send(queryData);
    //         }
    //     })
    // },
    time1(req,resp){
         const id = req.params['id'];   
         const status = req.params['status']
         console.log(status);
         var zz=[id,'feed',status,cz];
         var zzz=[status,cz,id];
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
    //===============================================================================================================

            device.postProps({
              LightStatus: Number(status)
              }, (res) => {
            //console.log(res);
            });	 
            device.onProps((cmd)=>{
           //console.log('>>>onProps',cmd); //打印完整的属性设置消息
           for(var key in cmd.params){ 
             if(key=='LightStatus'){ //判断是否设置的是LightSwitch属性
           //   //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
              aliLedStatus = cmd.params.LightStatus; 
              console.log(aliLedStatus);
           //   //本地设置完毕之后，将更新后的状态报告给云端。
           //   //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
                  device.postProps({'LightStatus': aliLedStatus});
              }
            }
            })
            const obj = {
                id: id,
                success: true, // 是否成功
                status: aliLedStatus,
                };
                int.unref();
               // console.log(obj)
                resp.write(JSON.stringify(obj));
        // 结束应答
                resp.end(); 
        
    
  },
  feedon(req,resp){
    cz = "on"
    aliLedStatus = '1';
    resp.end();
  },
  feedoff(req,resp){
    cz = "off"
  aliLedStatus = '0';
  resp.end();
  }
  // time2(req,resp){
  //   stuDao.getStuDao("SELECT time2 FROM time;",[],function(err,data){
  //     if(data.length>0){
  //         var time22 = JSON.parse(JSON.stringify(data));
  //         //console.log(queryData)
  //         //console.log(queryData[0].time)
  //         const obj = {
  //             time2: time22[0].time2// 将云服务器的设备状态放入status字段里
  //             };
  //            // console.log(obj)
  //             resp.write(JSON.stringify(obj));
  //     // 结束应答
  //             resp.end(); 
  //     }
  // })
  // }
}