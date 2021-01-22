const stuDao=require('../dao/app1Dao')
var aliSXTStatus = 0;
var cz = "off"
const iot = require('alibabacloud-iot-device-sdk');
const device = iot.device({
  productKey: 'a1FUt2muta3', //将<productKey>修改为实际产品的ProductKey
  deviceName: 'jiankong',//将<deviceName>修改为实际设备的DeviceName
  deviceSecret: '9d4c345de7cc355a027725436807dbb4',//将<deviceSecret>修改为实际设备的DeviceSecret
})
device.on('connect', () => {
  //将<productKey> <deviceName>修改为实际值
  device.subscribe('/a1FUt2muta3/jiankong/user/get'); 
  //发送消息给谁
  device.publish('/a1FUt2muta3/jiankong/user/update', 'hello world!');
});
device.on('message', (topic, payload) => {

});

const int = setInterval(() => {
    var sql="SELECT value FROM device WHERE id = "+'001' ;
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
    if(zz == "1"){
      cz = "on"
      //console.log(cz)
    }else{
      cz = "off"
     }
   }
    })
  }, 1000);
module.exports={
    sxt(req,resp){
         const id = req.params['id'];   
         const status = req.params['status'];
         console.log(status)
         var zz=[id,'sxt',status,cz];
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
    device.postProps({
        WorkState: Number(status)
      }, (res) => {
    //console.log(res);
    });	 
    device.onProps((cmd)=>{
   //console.log('>>>onProps',cmd); //打印完整的属性设置消息
   for(var key in cmd.params){ 
     if(key=='WorkState'){ //判断是否设置的是LightSwitch属性
   //   //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
      aliSXTStatus = cmd.params.WorkState; 
      //console.log(aliSXTStatus);
      clearInterval(int);
   //   //本地设置完毕之后，将更新后的状态报告给云端。
   //   //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
          device.postProps({'WorkState': aliSXTStatus});
      }
    }
    })
         const obj = {
          id: id,
          success: true, // 是否成功
          status: aliSXTStatus // 将云服务器的设备状态放入status字段里
          };
          int.unref();
         // console.log(obj)
          resp.write(JSON.stringify(obj));
  // 结束应答
          resp.end();        
          
  },
  sxton(req,resp){
    aliSXTStatus = 1;
    cz = "on",
    resp.end();
   },
   sxtoff(req,resp){
     aliSXTStatus = 0;
     cz = "off",
     resp.end();
   }
}