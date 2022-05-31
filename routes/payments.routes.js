const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator")
const { execute } = require("../database/mysql.connector")
const { Payment } = require("../model/payment.model")

router.post("/addPayment",
    [
        check("typeofpayment_idtypeofpayment").exists({ checkFalsy: true }).withMessage("Payment type not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("amount").exists({ checkFalsy: true }).withMessage("Amount not provided").trim().toFloat()
            .isFloat().withMessage("Wrong value provided"),
        check("firstName").exists({ checkFalsy: true }).withMessage("First name not provided").trim()
            .isAlpha().withMessage("First name should contain only characters")
            .isLength({ max: 45 }).withMessage("First name should be no more than 45 characters long"),
        check("payed").exists({ checkFalsy: true }).withMessage("Information if payment is payed wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("prepaid").exists({ checkFalsy: true }).withMessage("Information if payment is prepaid wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("billing_address").exists({ checkFalsy: true }).withMessage("Billing address wasn't provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided")
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            console.log("req.body in /addPayment ", req.body)
            const {
                typeofpayment_idtypeofpayment,
                amount,
                payed,
                prepaid,
                billing_address
            } = req.body;

            const newPayment = new Payment(
                null,
                typeofpayment_idtypeofpayment,
                amount,
                payed,
                prepaid,
                billing_address
            )
            console.log("newPayment inside /addPayment", newPayment.toString())
            const { paymentCreated, createdPayment } = await Payment.createPayment(newPayment);
            if (paymentCreated) {
                return res.status(200).json({ response: { createdPayment } });

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


router.post("/updatePayment",
    [
        check("idpayment").exists({ checkFalsy: true }).withMessage("Payment not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("typeofpayment_idtypeofpayment").exists({ checkFalsy: true }).withMessage("Payment type not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("amount").exists({ checkFalsy: true }).withMessage("Amount not provided").trim().toFloat()
            .isFloat().withMessage("Wrong value provided"),
        check("firstName").exists({ checkFalsy: true }).withMessage("First name not provided").trim()
            .isAlpha().withMessage("First name should contain only characters")
            .isLength({ max: 45 }).withMessage("First name should be no more than 45 characters long"),
        check("payed").exists({ checkFalsy: true }).withMessage("Information if payment is payed wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("prepaid").exists({ checkFalsy: true }).withMessage("Information if payment is prepaid wasn't provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("transactionid").exists({ checkFalsy: true }).withMessage("Transaction id not provided").trim()
            .isLength({ max: 20 }).withMessage("Transaction id can't be no more than 20 characters long"),
        check("billing_address").exists({ checkFalsy: true }).withMessage("Billing address wasn't provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided")
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            console.log("req.body in /updatePayment ", req.body)
            const {
                idpayment,
                typeofpayment_idtypeofpayment,
                amount,
                payed,
                prepaid,
                transactionid,
                billing_address
            } = req.body;

            const payment = new Payment(
                idpayment,
                typeofpayment_idtypeofpayment,
                amount,
                payed,
                prepaid,
                transactionid,
                billing_address
            )
            console.log("updatePayment inside /updatePayment", payment.toString())
            const { paymentInfoIsSame, updatedPayment } = await Payment.updatePayment(payment);
            // console.log("updatedPayment ", updatedPayment);
            // console.log("paymentInfoIsSame ", paymentInfoIsSame);
            // console.log("typeof updatedPayment  === undefined ", updatedPayment === undefined);
            if (!paymentInfoIsSame && typeof updatedPayment === 'object') {
                return res.status(200).json({ response: updatedPayment });
            } else if (!paymentInfoIsSame && updatedPayment === undefined) {
                return res.status(500).json({ response: { message: "Internal Server Error" } });
            } else if (paymentInfoIsSame) {
                return res.status(400).json({ response: updatedPayment, message: "Payment was not updated, because the delivery info is the same" });
            }
            // console.log("response from createDelivery inside /addWholeDelivery", response)
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

// router.delete("deletePayment/:id", [
//     check("paymentId", "Paymnet Id not provided").exists(),
// ], async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Invalid data while deleting a Payment",
//             });
//         }

//         var { paymentId } = req.body
//         const response = await Driver.deleteDriver(paymentId)
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

// router.get("/", async (req, res) => {
//     const response = await Payment.getAllPayments()
//     // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
//     return res.json({ response });
// })


module.exports = router;

