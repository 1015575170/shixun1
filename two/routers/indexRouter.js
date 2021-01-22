const exp=require('express')
const router=exp.Router();
// const userCtrl=require("../controller/userCtrl")
// const acCtrl=require("../controller/acCtrl")
// const fanCtrl=require("../controller/fanCtrl")
// const ledCtrl=require("../controller/ledCtrl")
const tempCtrl=require("../controller/tempCtrl")
const humCtrl=require("../controller/humCtrl")
// const eqCtrl=require("../controller/eqCtrl")
const sxtCtrl=require("../controller/sxtCtrl")
// const doorCtrl=require("../controller/doorCtrl")
// const smokeCtrl=require("../controller/smokeCtrl")
// const motionCtrl=require("../controller/motionCtrl")
const timeCtrl=require("../controller/timeCtrl")
const oneCtrl=require("../controller/oneCtrl")
const one1Ctrl=require("../controller/one1Ctrl")
const coolCtrl=require("../controller/coolCtrl")
const hotCtrl=require("../controller/hotCtrl")
const hum1Ctrl=require("../controller/hum1Ctrl")
const temp1Ctrl=require("../controller/temp1Ctrl")
const dogTCtrl=require("../controller/dogTCtrl")
const userCtrl=require("../controller/userCtrl");
const eqCtrl=require("../controller/eqCtrl")
const csCtrl=require("../controller/csCtrl")


router.post("/login",userCtrl.login);


router.put("/env/:id/:temp/:humd/:dogT",eqCtrl.echarts)
router.get("/env/:id/:count",eqCtrl.echarts1)


router.put("/sxt/:id/:status",sxtCtrl.sxt)
//定时投喂
router.post('/time',timeCtrl.time)
// router.get('/read',timeCtrl.read)
router.put('/time1/:id/:status',timeCtrl.time1)
router.put('/time2/:id',oneCtrl.time2)
router.put('/time3/:id',oneCtrl.time3)


//挡位路由阿里云
router.post('/one',oneCtrl.one)
router.post('/two',oneCtrl.two)
router.post('/three',oneCtrl.three)
router.post('/four',oneCtrl.four)
router.post('/five',oneCtrl.five)
router.post('/six',oneCtrl.six)

// 挡位路由本地
router.put('/one/:id/:status',one1Ctrl.one)
router.put('/two/:id/:status',one1Ctrl.two)
router.put('/three/:id/:status',one1Ctrl.three)
router.put('/four/:id/:status',one1Ctrl.four)
router.put('/five/:id/:status',one1Ctrl.five)
router.put('/six/:id/:status',one1Ctrl.six)

//狗粮温湿度监控/保温
router.put('/temp/:id/:values',tempCtrl.temp)
router.put('/cool/:id/:status',coolCtrl.cool)
router.put('/hot/:id/:status',hotCtrl.hot)
router.put('/hum/:id/:values',humCtrl.hum)
router.put('/hum1/:id/:status',hum1Ctrl.hum1)

//设定湿度
router.post('/temp1',temp1Ctrl.temp1)

//狗子的体温
router.put('/dogT/:id/:values',dogTCtrl.dogT)
router.post('/dogT',dogTCtrl.Tips)

//用户登录
router.get('/checks',userCtrl.checks)
router.get('/checks1/:id',userCtrl.checks1)
router.post('/delete',userCtrl.delete)
router.post('/update',userCtrl.update)
router.post('/add',userCtrl.add)

//本地设备
router.get('/sbs',csCtrl.select)
//led

// router.put('/led/:id/:status',ledCtrl.led)




//本地控制
router.get('/sxton',sxtCtrl.sxton)
router.get('/sxtoff',sxtCtrl.sxtoff)
router.get('feedon',timeCtrl.feedon)
router.get('/feedoff',timeCtrl.feedoff)

module.exports = router;
