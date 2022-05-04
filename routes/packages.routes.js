const { Router } = require("express");
const router = Router();
const { execute } = require("../database/mysql.connector")
const { Package } = require("../model/package.model")
const { check, validationResult } = require("express-validator")

router.post("/addPackage", async (req, res) => {
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
    const response = await Package.createPackage(newPackage);
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
    newPackage.setIdPackage(response.insertId);
    if (response.affectedRows > 0){
        return res.status(200).json({ response: { ...req.body, idpackages: newPackage.getIdPackage() } });

    }else{
        return res.status(500).json({ response: { message: "Internal Server Error" } });
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

module.exports = router;
