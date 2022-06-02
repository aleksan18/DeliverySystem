const { Router } = require("express");
const { check, validationResult } = require("express-validator");

const Vehicle = require("../models/Vehicle")

const router = Router()
router.get("/getVehicles",async(req,res)=>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const allVehicles = await Vehicle.find({});
        // const updatedOrder = await C.findByIdAndUpdate(order._id, order, { new: true });
        //console.log(updatedOrder);
        return res.status(200).json(allVehicles);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
  })

  router.post("/getVehicle", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const { id } = req.body
        const vehicle = await Vehicle.findOne({ _id : id });
        return res.status(200).json(vehicle);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/createVehicle", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { vehicle } = req.body
        console.log("req.body",req.body)
        const createdVehicle = new Vehicle({ type: vehicle.type, identifier: vehicle.identifier, storage_size: vehicle.storage_size, free: vehicle.free});
        await createdVehicle.save();
        const size = new TextEncoder().encode(JSON.stringify(createdVehicle)).length
        const size2 = Buffer.byteLength(JSON.stringify(createdVehicle))
        console.log("createdVehicle size: ", size)
        console.log("createdVehicle size 2: ", size2)
        
        if (createdVehicle) {
            return res.status(200).json({ createdVehicle });
        } else {
            return res.status(500).json({ createdVehicle }); // actually I dont know what sata type will be createdStudent if saving fails
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error, message: error.message })

    }
});

router.post("/updateVehicle", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        
        const { vehicle } = req.body
        const updatedVehicle = await Vehicle.findOneAndUpdate(vehicle._id, vehicle, { new: true })
        if (updatedVehicle) {
            return res.status(200).json({ vehicleUpdated: true });
        } else {
            return res.status(500).json({ vehicleUpdated: false });
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