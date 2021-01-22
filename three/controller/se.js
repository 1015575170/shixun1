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
  sercheq(req,resp){
    ProductKey=req.body[0]
    console.log(ProductKey)
              var params = {
              "RegionId": "cn-shanghai",
              "ProductKey":ProductKey
          }
          client.request('QueryDevice', params, requestOption).then((result) => {
              //console.log(JSON.stringify(result));
              var za=JSON.stringify(result);
              var zb=JSON.parse(za)
              var zc=zb.Data
              var zd=zc.DeviceInfo
              resp.send(zd)
              console.log(zd)
            }, (ex) => {
              console.log(ex);
            })
          },
          addeq(req,resp){
            var ProductKey=req.body.ProductKey1
            var DeviceName=req.body.DeviceName
          //  console.log(ProductKey,DeviceName)
            var params = {
              "RegionId": "cn-shanghai",
              'DeviceName':DeviceName,
              "ProductKey": ProductKey
            }
            client.request('RegisterDevice', params, requestOption).then((result) => {
            //  console.log(JSON.stringify(result));
            }, (ex) => {
              console.log(ex);
            })   
            resp.send({ succ: true });   
            resp.end()      
          },
          deleteeq(req,resp){
            var ProductKey=req.body.ProductKey1
            var DeviceName=req.body.DeviceName
            console.log(ProductKey,DeviceName)
            var params = {
              "RegionId": "cn-shanghai",
              'DeviceName':DeviceName,
              "ProductKey": ProductKey
            }
            client.request('DeleteDevice', params, requestOption).then((result) => {
          //    console.log(JSON.stringify(result)); 
       if(result.Success){
         console.log(result.Success)
          resp.send({ succ: true });  
          resp.end();
       }
            }, (ex) => {
              console.log(ex);
            })   
         
          } ,
    glink(req,resp){
var id=req.body.id
var ProductKey=req.body.ProductKey1
var DeviceName=req.body.DeviceName
var DeviceSecret=req.body.DeviceSecret
var zzz=[ProductKey,DeviceName,DeviceSecret,id]
var sql=" UPDATE device SET ProductKey=?,DeviceName=?,DeviceSecret=? WHERE id=?";
stuDao.getStuDao(sql,zzz,function(err,result){
  if(err){
    return;
  }
})   
} 
}