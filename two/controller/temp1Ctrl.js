const stuDao=require('../dao/app1Dao')
module.exports={
    temp1(req,resp){
        let id = '013';
        let temp1 = req.body.temp1;
        console.log(id,temp1)
          var sql='UPDATE temp1 SET temp1 = ? WHERE id = 013';
          stuDao.getStuDao(sql,[temp1],function(err,data){
              //console.log(err)
               resp.send({ succ: true });
          })
    }
}