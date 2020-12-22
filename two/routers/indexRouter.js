const exp=require('express')
const router=exp.Router();
const userCtrl=require("../controller/userCtrl")
const acCtrl=require("../controller/acCtrl")
const fanCtrl=require("../controller/fanCtrl")
const ledCtrl=require("../controller/ledCtrl")
const tempCtrl=require("../controller/tempCtrl")
const humCtrl=require("../controller/humCtrl")
const eqCtrl=require("../controller/eqCtrl")



router.put('/led/:id/:status',ledCtrl.led)
router.put('/ledon',ledCtrl.ledon)
router.put('/ledoff',ledCtrl.ledoff)
router.put('/temp/:id/:values',tempCtrl.temp)
router.put('/hum/:id/:values',humCtrl.hum)

router.put('/fan/:id/:status',fanCtrl.fan)
router.put('/fan/off',fanCtrl.fanoff)
router.put('/fan/low',fanCtrl.fanlow)
router.put('/fan/high',fanCtrl.fanhigh)

router.put('/ac/:id/:status',acCtrl.ac)
router.put('/ac/acon',acCtrl.acon) 
router.put('/ac/acoff',acCtrl.acoff)

router.post("/login",userCtrl.login);
router.get("/checks",userCtrl.checks);
router.post("/delete",userCtrl.delete);
router.post("/update",userCtrl.update);

router.post("/add",eqCtrl.add)
router.get("/checks1",eqCtrl.serch)
router.get("/checks2/:id",eqCtrl.search)
router.post("/change1",eqCtrl.update)
router.post("/delete1",eqCtrl.delete)
router.put("/env/:id/:temp/:humd",eqCtrl.echarts)
router.get("/env/:id/:count",eqCtrl.echarts1)
module.exports = router;