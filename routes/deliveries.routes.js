const { Router } = require("express");
const router = Router();
const {Delivery} = require("../model/delivery.model");
const {check,validationResult} = require("express-validator")
router.post("/",  async(req, res)=>{
    const response=await Delivery.getAllDeliveries()
    //console.log(await Delivery.getDelivery(1))
    //console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    return res.json({response:response} );
})


router.delete("deleteDelivery/:id",[
    check("deliveryId","Id of delivery not provided").exists(),
  ],async(req,res)=>{
    try {
      const errors =validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid data while deleting a Vehicle",
          });
       }
       
       var {deliveryId} = req.body
       const response = await Driver.deleteDriver(deliveryId)
       return res.status(200).json({response})
    } catch (error) {
      console.log(error);
      return res.status(500).json({
      message: "Invalid data",
      errors: [
          { value: error, msg: error.message },
      ],
  });
  }
  })

module.exports = router;
