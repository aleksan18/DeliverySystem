const { Router } = require("express");
const router = Router();
const { Delivery } = require("../model/delivery.model");
router.get("/test", async (req, res) => {
    const response = await Delivery.getAllDeliveries()
    // console.log(response.toString())
    // console.log("get endDate: ", response.getPackageId())
    // console.log(await Delivery.getDelivery("1"))
    // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    return res.json({ response });
})

router.post("/addWholeDelivery", async (req, res) => {
    // console.log("req.body in /addWholeDelivery ", req.body)
    const {
        iddeliveries,
        packages_idpackages,
        priority,
        payment_idpayment,
        international,
        start_location,
        end_location,
        message,
        estimated_date,
        start_date,
        end_date,
        uid
    } = req.body;
    // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    const newDelivery = new Delivery(iddeliveries, packages_idpackages,
        priority,
        payment_idpayment,
        international,
        start_location,
        end_location,
        message,
        estimated_date,
        start_date,
        end_date,
        uid
    )

    // console.log("newDelivery inside addWholeDelivery", newDelivery.toString())
    const response = await Delivery.createDelivery(newDelivery);
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
    console.log("response from createDelivery inside /addWholeDelivery", response)
    newDelivery.setIdDeliveries(response.insertId);
    console.log("newDelivery:", newDelivery.toString());
    return res.json({ response });
})


router.post("/nothing", async (req, res) => {
    const response = "all good from deliveries"
    return res.json({ response: response });
})


module.exports = router;
