const { Router } = require("express");
const router = Router();
const { Delivery } = require("../model/delivery.model");
const { Package } = require("../model/package.model");
const { Payment } = require("../model/payment.model");
const { check, validationResult } = require("express-validator")

router.post("/addDelivery",
    [
        check("packages_idpackages").exists({ checkFalsy: true }).withMessage("Package not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("priority").exists({ checkFalsy: true }).withMessage("Information about delivery priority wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("payment_idpayment").exists({ checkFalsy: true }).withMessage("Payment not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("international").exists({ checkFalsy: true }).withMessage("Information if delivery is international wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("start_location").exists({ checkFalsy: true }).withMessage("Start location not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("end_location").exists({ checkFalsy: true }).withMessage("End location not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("message").optional().exists().withMessage("Message not provided").trim()
            .isLength({ max: 150 }).withMessage("Message should be no more than 150 characters long"),
        check("start_date").exists({ checkFalsy: true }).withMessage("Start date not provided").trim()
            .isDate({ format: "YYYY-MM-DD hh:mm:ss" }).withMessage("Date has wrong format (should be 'YYYY-MM-DD hh:mm:ss')")
            .isAfter().withMessage("Date selected can't be today's date.")
            .toDate().withMessage("Value provided is not a date")

    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            // console.log("req.body in /addDelivery ", req.body)
            const {
                packages_idpackages,
                priority,
                payment_idpayment,
                international,
                start_location,
                end_location,
                message,
                start_date
            } = req.body;
            // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
            const newDelivery = new Delivery(
                null,
                packages_idpackages,
                priority,
                payment_idpayment,
                international,
                start_location,
                end_location,
                message,
                start_date,
                null,
                null
            )

            // console.log("newDelivery inside addDelivery", newDelivery.toString())
            const { deliveryCreated, createdDelivery } = await Delivery.createDelivery(newDelivery);
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
            // console.log("newDelivery:", newDelivery.toString());

            if (deliveryCreated) {
                return res.status(200).json({ response: { createdDelivery } });

            } else {
                return res.status(500).json({ response: { message: "Internal Server Error" } });
            }
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

router.post("/updateDelivery",
    [
        check("iddeliveries").exists({ checkFalsy: true }).withMessage("Delivery not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("packages_idpackages").exists({ checkFalsy: true }).withMessage("Package not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("priority").exists({ checkFalsy: true }).withMessage("Information about delivery priority wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("payment_idpayment").exists({ checkFalsy: true }).withMessage("Payment not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("international").exists({ checkFalsy: true }).withMessage("Information if delivery is international wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("start_location").exists({ checkFalsy: true }).withMessage("Start location not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("end_location").exists({ checkFalsy: true }).withMessage("End location not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("message").optional().exists().withMessage("Message not provided").trim()
            .isLength({ max: 150 }).withMessage("Message should be no more than 150 characters long"),
        check("start_date").exists({ checkFalsy: true }).withMessage("Start date not provided").trim()
            .isDate({ format: "YYYY-MM-DD hh:mm:ss" }).withMessage("Date has wrong format (should be 'YYYY-MM-DD hh:mm:ss')")
            .isAfter().withMessage("Date selected can't be earlier than today's date.")
            .toDate().withMessage("Value provided is not a date"),
        check("estimated_date").exists({ checkFalsy: true }).withMessage("Estimated date not provided").trim()
            .isDate({ format: "YYYY-MM-DD hh:mm:ss" }).withMessage("Date has wrong format (should be 'YYYY-MM-DD hh:mm:ss')")
            .isAfter().withMessage("Date selected can't be earlier than today's date.")
            .toDate().withMessage("Value provided is not a date"),
        check("end_date").optional().exists({ checkFalsy: true }).withMessage("End date not provided").trim()
            .isDate({ format: "YYYY-MM-DD hh:mm:ss" }).withMessage("Date has wrong format (should be 'YYYY-MM-DD hh:mm:ss')")
            .isAfter().withMessage("Date selected can't be  earlier than today's date.")
            .toDate().withMessage("Value provided is not a date"),
        check("uid").optional().exists().withMessage("UUID not provided").trim()
            .isLength({ max: 20 }).withMessage("Message should be no more than 20 characters long"), // MUST BE CHANGED
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            console.log("req.body in /updateDelivery ", req.body)
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
            const delivery = new Delivery(
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
                ((end_date != null) ? new Date(end_date) : null),
                uid
            )
            console.log("delivery inside /updateDelivery", delivery.toString())
            const { deliveryInfoIsSame, updatedDelivery } = await Delivery.updateDelivery(delivery);
            console.log("updatedDelivery ", updatedDelivery);
            console.log("deliveryInfoIsSame ", deliveryInfoIsSame);

            if (!deliveryInfoIsSame && typeof updatedDelivery === 'object') {
                return res.status(200).json({ response: updatedDelivery });
            } else if (!deliveryInfoIsSame && updatedDelivery === undefined) {
                return res.status(500).json({ response: { message: "Internal Server Error" } });
            } else if (deliveryInfoIsSame) {
                return res.status(400).json({ response: updatedDelivery, message: "Delivery was not updated, because the delivery info is the same" });
            }
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


// router.post("/addWholeDelivery", async (req, res) => {
//     console.log("req.body in /addWholeDelivery ", req.body)
//     const { delivery, package, payment } = req.body;

//     // const {
//     //     iddeliveries,
//     //     packages_idpackages,
//     //     priority,
//     //     payment_idpayment,
//     //     international,
//     //     start_location,
//     //     end_location,
//     //     message,
//     //     estimated_date,
//     //     start_date,
//     //     end_date,
//     //     uid
//     // } = req.body;
//     // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
//     const newPackage = new Package(
//         package.idpackages,
//         package.user_iduser,
//         package.weight,
//         package.height,
//         package.width,
//         package.depth,
//         package.fragile,
//         package.electronics,
//         package.oddsized,
//         package.receiver_iduser
//     )
//     // console.log("newPackage inside /addPackage", newPackage.toString())
//     const newPayment = new Payment(
//         payment.idpayment,
//         payment.typeofpayment_idtypeofpayment,
//         payment.amount,
//         payment.payed,
//         payment.prepaid,
//         payment.transactionid,
//         payment.billing_address
//     )
//     console.log("newPayment inside /addPayment", newPayment.toString())
//     const newDelivery = new Delivery(
//         delivery.iddeliveries,
//         delivery.packages_idpackages,
//         delivery.priority,
//         delivery.payment_idpayment,
//         delivery.international,
//         delivery.start_location,
//         delivery.end_location,
//         delivery.message,
//         new Date(estimated_date),
//         new Date(start_date),
//         ((end_date != null) ? new Date(end_date) : null),
//         delivery.uid
//     )

//     const packageResponse = await Package.createPackage(newPackage);
//     newPackage.setIdPackage(packageResponse.insertId);
//     const paymentResponse = await Payment.createPayment(newPayment);
//     newPayment.setIdPayment(paymentResponse.insertId)
//     if ((packageResponse.affectedRows > 0) && (paymentResponse.affectedRows > 0)) {
//         newDelivery.setPackagesId(newPackage.getIdPackage());
//         newDelivery.setPaymentId(newPayment.getIdPayment());
//         const deliveryResponse = await Delivery.createDelivery(newDelivery);
//         newDelivery.setIdDeliveries(deliveryResponse.insertId);
//         console.log("newDelivery: ", newDelivery.toString())
//         return res.status(200).json({
//             response:
//             {
//                 delivery: {
//                     ...req.body.delivery, iddeliveries: newDelivery.getIdDeliveries(),
//                     packages_idpackages: newDelivery.getPackageId(), payment_idpayment: newDelivery.getPaymentId()
//                 },
//                 package: {
//                     ...req.body.package, idpackages: newPackage.getIdPackage()
//                 },
//                 payment: {
//                     ...req.body.payment, idpayment: newPayment.getIdPayment()
//                 }
//             }
//         });

//     } else {
//         return res.status(500).json({ response: { message: "Internal Server Error" } });
//     }
//     // console.log("newDelivery inside addDelivery", newDelivery.toString())
//     // const response = await Delivery.createDelivery(newDelivery);
//     // example of what Delivery.createDelivery() should return 
//     // OkPacket {
//     //     fieldCount: 0,
//     //     affectedRows: 1,
//     //     insertId: 14,
//     //     serverStatus: 2,
//     //     warningCount: 0,
//     //     message: '',
//     //     protocol41: true,
//     //     changedRows: 0
//     //   }
//     // values can be accessed through response.insertId
//     // newDelivery.setIdDeliveries(response.insertId);
//     // // console.log("newDelivery:", newDelivery.toString());
//     // if (response.affectedRows > 0){
//     //     return res.status(200).json({ response: { ...req.body, iddeliveries: newDelivery.getIdDeliveries() } });

//     // }else{
//     //     return res.status(500).json({ response: { message: "Internal Server Error" } });
//     // }
//     // const response = "all good from deliveries"
//     return res.json({ response: packageResponse });
// })

// router.delete("deleteDelivery/:id", [
//     check("deliveryId", "Id of delivery not provided").exists(),
// ], async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Invalid data while deleting a Delivery",
//             });
//         }

//         const { deliveryId } = req.body
//         const response = await Driver.deleteDriver(deliveryId)
//         return res.status(200).json({ response })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Invalid data",
//             errors: [
//                 { value: error, msg: error.message },
//             ],
//         });
//     }
// })

module.exports = router;


// select get_estimated_date(1,15,'2021-07-19 03:30:07') as estimated_date
