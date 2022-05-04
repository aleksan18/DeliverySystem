const { Router } = require("express");
const router = Router();
const {check,validationResult} = require("express-validator")
const {execute} = require("../database/mysql.connector")

router.post("/",  (req, res)=>{
    

})

router.delete("deletePayment/:id",[
    check("paymentId","Paymnet Id not provided").exists(),
  ],async(req,res)=>{
    try {
      const errors =validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid data while deleting a Vehicle",
          });
       }
       
       var {paymentId} = req.body
       const response = await Driver.deleteDriver(paymentId)
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
