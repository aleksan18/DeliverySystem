const { Router } = require("express");

const Driver = require("../models/Driver")

const router = Router()
router.get("/getDrivers",async(req,res)=>{

    try {
        const allDrivers = await Driver.find({});
        console.log(allDrivers)
        
        return res.status(200).json(allDrivers);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
  })

  router.post("/getDriver", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const { id } = req.body
        const driver = await Driver.findOne({ id });
        return res.status(200).json(driver);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/createDriver", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { driver } = req.body
        const createdDriver = new Driver({ first_name: driver.first_name, second_name: driver.second_name, email: driver.email, phone: driver.phone, free: driver.free});
        await createdDriver.save();
        const size = new TextEncoder().encode(JSON.stringify(createdDriver)).length
        const size2 = Buffer.byteLength(JSON.stringify(createdDriver))
        console.log("Driver size: ", size)
        console.log("Driver size 2: ", size2)
        if (createdDriver) {
            return res.status(200).json({ createdDriver });
        } else {
            return res.status(500).json({ createdDriver }); // actually I dont know what sata type will be createdStudent if saving fails
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/updateDriver", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { driver } = req.body
        const updatedDriver = await Driver.findOneAndUpdate(driver._id, driver, { new: true })
        if (updatedDriver) {
            return res.status(200).json({ driverUpdated: true });
        } else {
            return res.status(500).json({ driverUpdated: false });
        }
        // .then(function (err, doc) {
        //     if (err) {
        //         console.log("inside student.routes.js > saveStudent > error: ", err);
        //         return res.status(500).json({ studentUpdated: false });
        //     } else {
        //         console.log("inside student.routes.js > saveStudent > all good:")
        //         return res.status(200).json({ studentUpdated: true });
        //     }
        // });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

  module.exports = router;