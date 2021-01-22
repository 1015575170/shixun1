const exp=require('express')
const router=exp.Router();

const aliCtrl = require('../controller/aliCtrl');
const eqCtrl=require("../controller/eqCtrl")
const se=require("../controller/se")

router.get('/jk',aliCtrl.getjk)//获取sxt状态
router.post('/jk',aliCtrl.jkCtrl)//sxt控制


router.get('/feed',aliCtrl.getfeed)//获取喂狗器状态
router.post('/feed',aliCtrl.feedCtrl)//喂狗器控制

router.get('/dangwei',aliCtrl.getdangwei)//获取档位状态
router.post('/dangwei',aliCtrl.dangweiCtrl)//档位控制


router.get('/baowen',aliCtrl.getbaowen)//获取保温器状态(降温)
// router.post('/baowen',aliCtrl.baowenCtrl)//保温控制

router.get('/baowen1',aliCtrl.getbaowen1)//(升温)
// router.post('/baowen1',aliCtrl.baowen1Ctrl)//保温控制
router.get('/hum1',aliCtrl.gethum1)//(升温)
router.get('/temp',aliCtrl.gettemp)
router.get('/hum',aliCtrl.gethum)
router.get('/dogT',aliCtrl.getdogT)

router.post('/zzz',se.sercheq)//搜索设备
router.post('/addeq',se.addeq)//增加设备
router.post('/glink',se.glink)//关联设备
router.post('/creq',eqCtrl.creq)//创建产品
router.post('/deleq',eqCtrl.deleq)//删除产品
router.get('/serch',eqCtrl.serch)//搜索产品
router.post('/deleteeq',se.deleteeq)//删除设备




module.exports = router; 