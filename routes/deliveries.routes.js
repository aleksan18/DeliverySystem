const { Router } = require("express");
const router = Router();
const {Delivery} = require("../model/delivery.model");
router.post("/",  async(req, res)=>{
    const response=await Delivery.getAllDeliveries()
    console.log(await Delivery.getDelivery(1))
    console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    return res.json({response:response} );
})



module.exports = router;
