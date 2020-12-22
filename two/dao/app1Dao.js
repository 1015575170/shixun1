const dbpool = require("../config/poolcig")


module.exports={
    getStuDao(sql,arr,cb){
        dbpool.connect(sql,arr,function(err,data){
            cb(err,data);
        })
    },   

}