const { Router } = require("express");
const router = Router();
const { execute } = require("../database/mysql.connector")
const { Package } = require("../model/package.model")
const { check, validationResult } = require("express-validator")

router.post("/addPackage",
    [
        check("user_iduser").exists({ checkFalsy: true }).withMessage("User not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("weight").exists({ checkFalsy: true }).withMessage("Weight not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("height").exists({ checkFalsy: true }).withMessage("Height not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("width").exists({ checkFalsy: true }).withMessage("Width not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("depth").exists({ checkFalsy: true }).withMessage("Depth not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("fragile").exists({ checkFalsy: true }).withMessage("Information if packge is fragile not provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("electronics").exists({ checkFalsy: true }).withMessage("Information if has electronics not provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("oddsized").exists({ checkFalsy: true }).withMessage("Information if package is odd sized not provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("receiver_iduser").exists({ checkFalsy: true }).withMessage("Receiver information wasn't provided").trim()
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
            // console.log("req.body in /addPackage ", req.body)
            const {
                user_iduser,
                weight,
                height,
                width,
                depth,
                fragile,
                electronics,
                oddsized,
                receiver_iduser,
            } = req.body;
            // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
            const newPackage = new Package(
                null,
                user_iduser,
                weight,
                height,
                width,
                depth,
                fragile,
                electronics,
                oddsized,
                receiver_iduser
            )
            console.log("newPackage inside /addPackage", newPackage.toString())
            const { packageCreated, createdPackage } = await Package.createPackage(newPackage);
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
            // console.log("response from createDelivery inside /addWholeDelivery", response)

            if (packageCreated) {
                return res.status(200).json({ response: { createdPackage } });
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


router.post("/updatePackage",
    [
        check("idpackages").exists({ checkFalsy: true }).withMessage("Package not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("user_iduser").exists({ checkFalsy: true }).withMessage("User not provided").trim()
            .toInt().isInt({ min: 0 }).withMessage("Wrong value provided"),
        check("weight").exists({ checkFalsy: true }).withMessage("Weight not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("height").exists({ checkFalsy: true }).withMessage("Height not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("width").exists({ checkFalsy: true }).withMessage("Width not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("depth").exists({ checkFalsy: true }).withMessage("Depth not provided").trim().toFloat()
            .isFloat({ min: 0.00 }).withMessage("Wrong value provided"),
        check("fragile").exists({ checkFalsy: true }).withMessage("Information if packge is fragile not provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("electronics").exists({ checkFalsy: true }).withMessage("Information if has electronics not provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("oddsized").exists({ checkFalsy: true }).withMessage("Information if package is odd sized not provided").trim()
            .toInt().isInt({ min: 0, max: 1 }).withMessage("Wrong value provided"),
        check("receiver_iduser").exists({ checkFalsy: true }).withMessage("Receiver information wasn't provided").trim()
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
            // console.log("req.body in /addPackage ", req.body)
            const {
                idpackages,
                user_iduser,
                weight,
                height,
                width,
                depth,
                fragile,
                electronics,
                oddsized,
                receiver_iduser,
            } = req.body;
            // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
            const newPackage = new Package(
                idpackages,
                user_iduser,
                weight,
                height,
                width,
                depth,
                fragile,
                electronics,
                oddsized,
                receiver_iduser
            )
            console.log("newPackage inside /addPackage", newPackage.toString())
            const { packageInfoIsSame, updatedPackage } = await Package.createPackage(newPackage);
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
            // console.log("response from createDelivery inside /addWholeDelivery", response)
            if (!packageInfoIsSame && typeof updatedPackage === 'object') {
                return res.status(200).json({ response: updatedPackage });
            } else if (!packageInfoIsSame && updatedPackage === undefined) {
                return res.status(500).json({ response: { message: "Internal Server Error" } });
            } else if (packageInfoIsSame) {
                return res.status(400).json({ response: updatedPackage, message: "Package was not updated, because the package info is the same" });
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


router.post("/work", async (req, res) => {
    const response = "all good from packages"
    return res.json({ response: response });
})

router.get("/", async (req, res) => {
    const response = await Package.getAllPackages()
    // console.log(await Delivery.updateDeliveries(1,true,1,true,1,1,"","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","2021-07-19T01:30:07.000Z","D332CD90-8A43"))
    return res.json({ response });
})
// router.delete("/deletePackage",[
//     check("Id","Id id not provided").exists(),
// ], 
// async(req, res)=>{
//     try {
//         const errors =validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//               errors: errors.array(),
//               message: "Invalid data while deleting a Package",
//             });
//          }

//          var {id} = req.body
//          const response = await Package.deletePackage(id)
//          return res.status(200).json({response})
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//         message: "Invalid data",
//         errors: [
//             { value: error, msg: error.message },
//         ],
//     });
//     }

// })

module.exports = router;
