const Core = require('@alicloud/pop-core');

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
creq(req,resp){
var ProductName=req.body.name 
var params = {
  "RegionId": "cn-hangzhou",
  "NodeType": "0",
  "ProductName":ProductName

}
client.request('CreateProduct', params, requestOption).then((result) => {
  console.log(JSON.stringify(result));
}, (ex) => {
  console.log(ex);
})  
resp.send({ succ: true });
},
deleq(req,resp){
  var ProductKey=req.body.ProductKey
  var params = {
    "RegionId": "cn-shanghai",
    "ProductKey": ProductKey
  }
  client.request('DeleteProduct', params, requestOption).then((result) => {
    console.log(JSON.stringify(result));
  }, (ex) => {
    console.log(ex);
  })
  resp.send({ succ: true });
    },
serch(req,resp){
        var params = {
            "RegionId": "cn-shanghai",
            "CurrentPage": 1,
            "PageSize": 200
          }
          client.request('QueryProductList', params, requestOption).then((result) => {
           // console.log(JSON.stringify(result));
          var zc=JSON.stringify(result) 
          var za=JSON.parse(zc)
          var zb=za.Data
          var zd=zb.List
          var ze=zd.ProductInfo 
          resp.send(ze)
         // console.log(ze)
          }, (ex) => {
          console.log(ex);
          
          } 
          ) 
          //  resp.end();     
    },
}
