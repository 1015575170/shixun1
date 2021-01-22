const Core = require('@alicloud/pop-core');
const stuDao=require('../dao/app1Dao')
var client = new Core({
    accessKeyId: 'LTAI4Ft1B2xSEDTD3YqEYVPo',
    accessKeySecret: '9LJHJcCtBaM1uJVRq2HfubrDJrQWmE',
  endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
  apiVersion: '2018-01-20'
});
var requestOption = {
  method: 'POST'
};
module.exports={ 
jkCtrl(req,resp){//led灯控制
const obj = req.body;
const items = {
WorkState: obj.status
};
var params = {
"RegionId": "cn-shanghai",
"Items": JSON.stringify(items),
"ProductKey": "a1FUt2muta3",
"DeviceName": "jiankong"
}
var requestOption = {
method: 'POST'
};
client.request('SetDeviceProperty', params, requestOption).then((result) => {
console.log(JSON.stringify(result));
}, (ex) => {
console.log(ex);
});
var result = {
succ: true
};
resp.end(JSON.stringify(result));
resp.end();
    },
    feedCtrl(req,resp){//狗盆控制
      const obj = req.body;
      const items = {
      LightStatus: obj.status
      };
      var params = {
      "RegionId": "cn-shanghai",
      "Items": JSON.stringify(items),
      "ProductKey": "a1U4Jd1KDYN",
      "DeviceName": "feed"
      }
      var requestOption = {
      method: 'POST'
      };
      client.request('SetDeviceProperty', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
      }, (ex) => {
      console.log(ex);
      });
      var result = {
      succ: true
      };
      resp.end(JSON.stringify(result));
      resp.end();
          },
          baowenCtrl(req,resp){//狗粮保温(降)控制
            const obj = req.body;
            const items = {
            LightStatus: obj.status
            };
            var params = {
            "RegionId": "cn-shanghai",
            "Items": JSON.stringify(items),
            "ProductKey": "a1zOjPl8REu",
            "DeviceName": "baowen"
            }
            var requestOption = {
            method: 'POST'
            };
            client.request('SetDeviceProperty', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            }, (ex) => {
            console.log(ex);
            });
            var result = {
            succ: true
            };
            resp.end(JSON.stringify(result));
            resp.end();
                },
                baowen1Ctrl(req,resp){//狗粮保温(升)控制
                  const obj = req.body;
                  const items = {
                  LightStatus: obj.status
                  };
                  var params = {
                  "RegionId": "cn-shanghai",
                  "Items": JSON.stringify(items),
                  "ProductKey": "a1GNbY1iJTo",
                  "DeviceName": "baowen1"
                  }
                  var requestOption = {
                  method: 'POST'
                  };
                  client.request('SetDeviceProperty', params, requestOption).then((result) => {
                  console.log(JSON.stringify(result));
                  }, (ex) => {
                  console.log(ex);
                  });
                  var result = {
                  succ: true
                  };
                  resp.end(JSON.stringify(result));
                  resp.end();
                      },
                dangweiCtrl(req,resp){//档位控制
                  const obj = req.body;
                  console.log(req.body)
                  const items = {
                    LightLux: obj.status
                  };
                  var params = {
                  "RegionId": "cn-shanghai",
                  "Items": JSON.stringify(items),
                  "ProductKey": "a1cK7OVdRqZ",
                  "DeviceName": "dangwei"
                  }
                  var requestOption = {
                  method: 'POST'
                  };
                  client.request('SetDeviceProperty', params, requestOption).then((result) => {
                  console.log(JSON.stringify(result));
                  }, (ex) => {
                  console.log(ex);
                  });
                  var result = {
                  succ: true
                  };
                  resp.end(JSON.stringify(result));
                  resp.end();
                      },
getjk(req,resp){//获取灯状态
  //console.log(1111)
var sql=" SELECT value FROM device WHERE id = 012";
stuDao.getStuDao(sql,[],function(err,result){
    if(err){
      return;
    }
    //console.log(JSON.stringify(result));
const zz=result[0].value
const zzz={
    value:zz
}
//console.log(zzz);
resp.send(zzz);
resp.end();
  })
 },
 getdangwei(req,resp){//获取灯状态
  //console.log(1111)
  var sql="SELECT time2 FROM time WHERE id = 011";
  stuDao.getStuDao(sql,[],function(err,result){
      if(err){
        return;
      }
  //console.log(JSON.stringify(result));
  const zz=result[0].time2
  //console.log(zz)
  const zzz={
      value:zz
  }
  console.log(zzz);
  resp.send(zzz);
  resp.end();
    })
   },  
   getbaowen1(req,resp){//获取灯状态
    var sql=" SELECT value FROM device WHERE id = 015";
    stuDao.getStuDao(sql,[],function(err,result){
        if(err){
          return;
        }
        //console.log(JSON.stringify(result));
    const zz=result[0].value
    const zzz={
        value:zz
    }
    //console.log(zzz);
    resp.send(zzz);
    resp.end();
      })
     },  
     getbaowen(req,resp){//获取灯状态
      var sql=" SELECT value FROM device WHERE id = 014";
      stuDao.getStuDao(sql,[],function(err,result){
          if(err){
            return;
          }
          //console.log(JSON.stringify(result));
      const zz=result[0].value
      const zzz={
          value:zz
      }
      //console.log(zzz);
      resp.send(zzz);
      resp.end();
        })
       }, 
       getfeed(req,resp){//获取灯状态
        var sql=" SELECT value FROM device WHERE id = 011";
        stuDao.getStuDao(sql,[],function(err,result){
            if(err){
              return;
            }
            //console.log(JSON.stringify(result));
        const zz=result[0].value
        const zzz={
            value:zz
        }
        //console.log(zzz);
        resp.send(zzz);
        resp.end();
          })
         },
         gethum1(req,resp){//获取灯状态
          var sql=" SELECT value FROM device WHERE id = 017";
          stuDao.getStuDao(sql,[],function(err,result){
              if(err){
                return;
              }
              //console.log(JSON.stringify(result));
          const zz=result[0].value
          const zzz={
              value:zz
          }
          //console.log(zzz);
          resp.send(zzz);
          resp.end();
            })
           },
           gettemp(req,resp){//获取灯状态
            var sql=" SELECT value FROM device WHERE id = 013";
            stuDao.getStuDao(sql,[],function(err,result){
                if(err){
                  return;
                }
                //console.log(JSON.stringify(result));
            const zz=result[0].value
            const zzz={
                value:zz
            }
            //console.log(zzz);
            resp.send(zzz);
            resp.end();
              })
             },  
             gethum(req,resp){//获取灯状态
              var sql=" SELECT value FROM device WHERE id = 016";
              stuDao.getStuDao(sql,[],function(err,result){
                  if(err){
                    return;
                  }
                  //console.log(JSON.stringify(result));
              const zz=result[0].value
              const zzz={
                  value:zz
              }
              //console.log(zzz);
              resp.send(zzz);
              resp.end();
                })
               },  
               getdogT(req,resp){//获取灯状态
                var sql=" SELECT value FROM device WHERE id = 018";
                stuDao.getStuDao(sql,[],function(err,result){
                    if(err){
                      return;
                    }
                    //console.log(JSON.stringify(result));
                const zz=result[0].value
                const zzz={
                    value:zz
                }
                //console.log(zzz);
                resp.send(zzz);
                resp.end();
                  })
                 },  
}