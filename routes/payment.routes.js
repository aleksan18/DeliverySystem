const { Router } = require("express");
const router = Router();
const { execute } = require("../database/mysql.connector")
const { Payment } = require("../model/payment.model")

router.post("/addPayment", async (req, res) => {
    console.log("req.body in /addPayment ", req.body)
    const {
        idpayment,
        typeofpayment_idtypeofpayment,
        amount,
        payed,
        prepaid,
        transactionid,
        billing_address
    } = req.body;

    const newPayment = new Payment(
        idpayment,
        typeofpayment_idtypeofpayment,
        amount,
        payed,
        prepaid,
        transactionid,
        billing_address
    )
    console.log("newPayment inside /addPayment", newPayment.toString())
    const response = await Payment.createPayment(newPayment);
    // example of what Delivery.createDelivery() should return 
    // OkPacket {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 14,
    //     serverStatus: 2,
    //     warningCount: 0,
    //     message: '',
    //     protocol41: true,
    //     changedRows: 0
    //   }
    // values can be accessed through response.insertId
    newPayment.setIdPayment(response.insertId)
    if (response.affectedRows > 0){
        return res.status(200).json({ response: { ...req.body, idpayment: newPayment.getIdPayment() } });

    }else{
        return res.status(500).json({ response: { message: "Internal Server Error" } });
    }
    // console.log("response from createDelivery inside /addWholeDelivery", response)
})


// router.get("/", async (req, res) => {
//     const response = await Payment.getAllPayments()
//     // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
//     return res.json({ response });
// })


module.exports = router;

