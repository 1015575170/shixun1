const stuDao=require('../dao/app1Dao')
module.exports={ 
    login(req,resp){
          var sql="SELECT * FROM user;";
          let founded = false;
          stuDao.getStuDao(sql,[],function(err,data){
              for (let user of data) {
                  if (user.userName === req.body.userName) {   
                   if ( user.password === req.body.password) {
                    founded = true;
                    break;
                 }
              break;
              }
              
          }
              console.log(founded);
                if (founded) {
                  resp.send({ succ: true });
               }
                else {
                  resp.send({ succ: false, msg: '没有找到用户!' });
               }
                resp.end();
             })
    },
    checks : (req,resp) => {//查一群
      console.log(req.query);
      stuDao.getStuDao("SELECT * FROM user;",[],function(err,data){
          if(data.length>0){
              let queryData = JSON.stringify(data);
              console.log(queryData)
              resp.send(queryData);
          }
           resp.end();
      })
  },
  
  delete : (req,resp) => {//删除
    let id = req.body.id;
    console.log(id);
    stuDao.getStuDao("DELETE FROM user WHERE id = ?;",[id],function(err,data){
        console.log(err);
        console.log(data);
        resp.send({ succ:true });
         resp.end();
  })
},
    update(req,resp){
      let id = req.body.id;
      let password = req.body.password;
          var sql='UPDATE user SET password = ? WHERE id = ?';
          stuDao.getStuDao(sql,[password,id],function(err,result){
            if(err){
             // console.log('[SELECT ERROR] - ',err.message);
              return;
            }
        resp.send({ succ: true });
          resp.end();
          })
    }
}

