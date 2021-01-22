const stuDao=require('../dao/app1Dao')
module.exports={ 
    one(req,resp){
    const id = req.params['id'];   
    const status = req.params['status']
    console.log(id,status)
       var sql='UPDATE time SET time2 = ? WHERE id = 011';
       stuDao.getStuDao(sql,[status],function(err,data){
           //console.log(err)
            resp.send({ succ: true });
       })
    },
    two(req,resp){
    const id = req.params['id'];   
    const status = req.params['status']
     console.log(id,status)
       var sql='UPDATE time SET time2 = ? WHERE id = 011';
       stuDao.getStuDao(sql,[status],function(err,data){
           //console.log(err)
            resp.send({ succ: true });
       })
    },
    three(req,resp){
    const id = req.params['id'];   
    const status = req.params['status']
     console.log(id,status)
       var sql='UPDATE time SET time2 = ? WHERE id = 011';
       stuDao.getStuDao(sql,[status],function(err,data){
           //console.log(err)
            resp.send({ succ: true });
       })
    },
    four(req,resp){
    const id = req.params['id'];   
    const status = req.params['status']
     console.log(id,status)
       var sql='UPDATE time SET time2 = ? WHERE id = 011';
       stuDao.getStuDao(sql,[status],function(err,data){
           //console.log(err)
            resp.send({ succ: true });
       })
    },
    five(req,resp){
    const id = req.params['id'];   
    const status = req.params['status']
     console.log(id,status)
       var sql='UPDATE time SET time2 = ? WHERE id = 011';
       stuDao.getStuDao(sql,[status],function(err,data){
           //console.log(err)
            resp.send({ succ: true });
       })
    },
    six(req,resp){
    const id = req.params['id'];   
    const status = req.params['status']
     console.log(id,status)
       var sql='UPDATE time SET time2 = ? WHERE id = 011';
       stuDao.getStuDao(sql,[status],function(err,data){
           //console.log(err)
            resp.send({ succ: true });
       })
    },
 }