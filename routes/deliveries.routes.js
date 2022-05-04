const { Router } = require("express");
const router = Router();
const { Delivery } = require("../model/delivery.model");
const { Package } = require("../model/package.model");
const { Payment } = require("../model/payment.model");

router.post("/addDelivery", async (req, res) => {
    // console.log("req.body in /addDelivery ", req.body)
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
    const newDelivery = new Delivery(
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
    )

    // console.log("newDelivery inside addDelivery", newDelivery.toString())
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
    newDelivery.setIdDeliveries(response.insertId);
    // console.log("newDelivery:", newDelivery.toString());
    if (response.affectedRows > 0) {
        return res.status(200).json({ response: { ...req.body, iddeliveries: newDelivery.getIdDeliveries() } });

    } else {
        return res.status(500).json({ response: { message: "Internal Server Error" } });
    }
})


router.post("/addWholeDelivery", async (req, res) => {
    console.log("req.body in /addWholeDelivery ", req.body)
    const { delivery, package, payment } = req.body;

    // const {
    //     iddeliveries,
    //     packages_idpackages,
    //     priority,
    //     payment_idpayment,
    //     international,
    //     start_location,
    //     end_location,
    //     message,
    //     estimated_date,
    //     start_date,
    //     end_date,
    //     uid
    // } = req.body;
    // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    const newPackage = new Package(
        package.idpackages,
        package.user_iduser,
        package.weight,
        package.height,
        package.width,
        package.depth,
        package.fragile,
        package.electronics,
        package.oddsized,
        package.receiver_iduser
    )
    // console.log("newPackage inside /addPackage", newPackage.toString())
    const newPayment = new Payment(
        payment.idpayment,
        payment.typeofpayment_idtypeofpayment,
        payment.amount,
        payment.payed,
        payment.prepaid,
        payment.transactionid,
        payment.billing_address
    )
    console.log("newPayment inside /addPayment", newPayment.toString())
    const newDelivery = new Delivery(
        delivery.iddeliveries,
        delivery.packages_idpackages,
        delivery.priority,
        delivery.payment_idpayment,
        delivery.international,
        delivery.start_location,
        delivery.end_location,
        delivery.message,
        delivery.estimated_date,
        delivery.start_date,
        delivery.end_date,
        delivery.uid
    )

    const packageResponse = await Package.createPackage(newPackage);
    newPackage.setIdPackage(packageResponse.insertId);
    const paymentResponse = await Payment.createPayment(newPayment);
    newPayment.setIdPayment(paymentResponse.insertId)
    if ((packageResponse.affectedRows > 0) && (paymentResponse.affectedRows > 0)) {
        newDelivery.setPackagesId(newPackage.getIdPackage());
        newDelivery.setPaymentId(newPayment.getIdPayment());
        const deliveryResponse = await Delivery.createDelivery(newDelivery);
        newDelivery.setIdDeliveries(deliveryResponse.insertId);
        console.log("newDelivery: ", newDelivery.toString())
        return res.status(200).json({
            response:
            {
                delivery: {
                    ...req.body.delivery, iddeliveries: newDelivery.getIdDeliveries(),
                    packages_idpackages: newDelivery.getPackageId(), payment_idpayment: newDelivery.getPaymentId()
                },
                package: {
                    ...req.body.package, idpackages: newPackage.getIdPackage()
                },
                payment: {
                    ...req.body.payment, idpayment: newPayment.getIdPayment()
                }
            }
        });

    } else {
        return res.status(500).json({ response: { message: "Internal Server Error" } });
    }
    // console.log("newDelivery inside addDelivery", newDelivery.toString())
    // const response = await Delivery.createDelivery(newDelivery);
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
    // newDelivery.setIdDeliveries(response.insertId);
    // // console.log("newDelivery:", newDelivery.toString());
    // if (response.affectedRows > 0){
    //     return res.status(200).json({ response: { ...req.body, iddeliveries: newDelivery.getIdDeliveries() } });

    // }else{
    //     return res.status(500).json({ response: { message: "Internal Server Error" } });
    // }
    // const response = "all good from deliveries"
    return res.json({ response: packageResponse });
})


router.post("/nothing", async (req, res) => {
    const response = "all good from deliveries"
    return res.json({ response: response });
})

router.get("/test", async (req, res) => {
    const response = await Delivery.getAllDeliveries()
    // console.log(response.toString())
    // console.log("get endDate: ", response.getPackageId())
    // console.log(await Delivery.getDelivery("1"))
    // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    return res.json({ response });
})

module.exports = router;
