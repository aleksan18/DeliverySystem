const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const req = require("express/lib/request");
const { execute } = require("../database/mysql.connector")
const { Driver } = require("../model/driver.model");
const { Vehicle } = require("../model/vehicle.model")

router.post("/addDriver",
[
    check("firstName", "First name not provided").exists(),
    check("secondName", "Second name not provided").exists(),
    check("email", "Email not provided").exists(),
    check("phone", "Phone not provided").exists(),
    check("free", "Free status not provided").exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while creating a Driver",
            });
        }
        const { firstName, secondName, email, phone, free } = req.body;
        const newDriver = new Driver(null, firstName, secondName, email, phone, free);
        console.log("newDriver: ", newDriver)
        const { driverCreated, createdDriver } = await Driver.createDriver(newDriver)
        if (driverCreated) {
            return res.status(200).json({ response: { createdDriver } });
    
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

router.post("/updateDriver",
[
    check("firstName", "First name not provided").exists(),
    check("secondName", "Second name not provided").exists(),
    check("email", "Email not provided").exists(),
    check("phone", "Phone not provided").exists(),
    check("free", "Free status not provided").exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while creating a Driver",
            });
        }
        const { idemployees, firstName, secondName, email, phone, free } = req.body;
        const driver = new Driver(idemployees, firstName, secondName, email, phone, free);
        console.log("newDriver: ", driver)
        const { driverInfoIsSame, updatedDriver } = await Driver.updateDriver(driver)
        if (!driverInfoIsSame && typeof updatedDriver === 'object') {
            return res.status(200).json({ response: updatedDriver });
        } else if (!driverInfoIsSame && updatedDriver === undefined) {
            return res.status(500).json({ response: { message: "Internal Server Error" } });
        } else if (driverInfoIsSame) {
            return res.status(400).json({ response: updatedDriver, message: "Driver was not updated, because the driver info is the same" });
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


// router.delete("deleteDriver/:id", [
//     check("idDriver", "Id of driver not provided").exists(),
// ], async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Invalid data while deleting a Vehicle",
//             });
//         }

//         var { id } = req.body
//         const response = await Driver.deleteDriver(id)
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

router.post("/addVehicle",
    [
        check("typeOfVehicle", "Type of Vehicle not provided").exists(),
        check("identifier", "Identifier not provided").exists(),
        check("storageSize", "Storage size name not provided").exists(),
        check("free", "Free status not provided").exists(),
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a Vehicle",
                });
            }
            const { 
                typeOfVehiclesId,
                identifier,
                storage_size,
                free, } = req.body;
            const newVehicle = new Vehicle(null, typeOfVehiclesId,identifier,
                                        storage_size, free);
            console.log("Vehicle: ", newVehicle);
            const { vehicleCreated, createdVehicle } = await Vehicle.createVehicle(newVehicle)
            if (vehicleCreated) {
                return res.status(200).json({ response: { createdVehicle } });
        
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

    
router.post("/updateVehicle", [
    check("idVehicle", "Id of vehicle not provided").exists(),
    check("typeOfVehicle", "Type of Vehicle not provided").exists(),
    check("identifier", "Identifier not provided").exists(),
    check("storageSize", "Storage size name not provided").exists(),
    check("free", "Free status not provided").exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while creating a Vehicle",
            });
        }
        const { idVehicle, typeOfVehiclesId, identifier, storage_size, free } = req.body;
        const vehicle = new Vehicle(idVehicle, typeOfVehiclesId, identifier, storage_size, free);
        console.log(vehicle);
        const { vehicleInfoIsSame, updatedVehicle } = await Vehicle.updateVehicle(vehicle)
        if (!vehicleInfoIsSame && typeof updatedVehicle === 'object') {
            return res.status(200).json({ response: updatedVehicle });
        } else if (!vehicleInfoIsSame && updatedVehicle === undefined) {
            return res.status(500).json({ response: { message: "Internal Server Error" } });
        } else if (vehicleInfoIsSame) {
            return res.status(400).json({ response: updatedVehicle, message: "Vehicle was not updated, because the vehicle info is the same" });
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

// router.delete("deleteVehicle/:id", [
//     check("idVehicle", "Id of vehicle not provided").exists(),
// ], async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: "Invalid data while deleting a Vehicle",
//             });
//         }

//         var { id } = req.body
//         const response = await Vehicle.deleteVehicle(id)
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
