const Core = require('@alicloud/pop-core');
const stuDao=require('../dao/app1Dao')

module.exports={
  echarts(req,resp){
    const id = req.params["id"];
    const temp = req.params["temp"];
    const humd = req.params["humd"];
    const dogT = req.params["dogT"];
    let sql = 'INSERT INTO environment VALUES(\'' + id + '\','+ Date.now() + ',' + humd + ',' + temp + ',' + dogT + ')';
    stuDao.getStuDao(sql,[],function(err,data){
      if(err){
        console.log('[UPDATE ERROR] -',err.message);
        resp.send('修改失败')
        return;
      }
      resp.send({ id:id,status:'success' });
      resp.end();
    })
  },
  echarts1(req,resp){
    const id = req.params["id"];
    const count = req.params["count"];
    var sql = "select * from environment WHERE id = '" + id + "' order by time desc limit " + count;
    stuDao.getStuDao(sql,[],function(err,result){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        resp.send(JSON.stringify({
          succ:false,
          msg:'查询失败'
        }));
        return;
      }
      const resp1 ={
        id:id,
        data:result
      };
      resp.send(JSON.stringify(resp1));
      resp.end();
    })
  }
}
