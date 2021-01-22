const stuDao=require('../dao/app1Dao')

module.exports={
    select(req,resp){
        var q="SELECT * FROM device"
        var hh;
        stuDao.getStuDao(q,[],function(err,result){
        gg=JSON.stringify(result);
        hh=JSON.parse(gg)
          resp.send(gg);
        }) 
      }
}