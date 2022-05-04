const { Router } = require("express");
const router = Router();
const {check,validationResult} = require("express-validator")
const {execute} = require("../database/mysql.connector")
const {Driver} = require("../model/driver.model");
const {Vehicle} = require("../model/vehicle.model")
router.post("/createDriver",
    [
    check("typeOfDriver","Type of Driver not provided").exists(),
    check("firstName","First name not provided").exists(),
    check("secondName","Second name not provided").exists(),
    check("companyName","Company not provided").exists(),
    check("email","Email not provided").exists(),
    check("phone","Phone not provided").exists(),
    check("address","Address not provided").exists(),
    check("duns","Duns not provided").exists(),
    check("zipcode","Zip code not provided").exists(),
    check("city","City not provided").exists(),
    ],async(req, res)=>{
    try {
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array(),
              message: "Invalid data while creating a Driver",
            });
         }
         const {typeOfDriver,firstName,secondName,companyName,email,phone,address,duns,zipcode,city} = req.body;
         const driver = new Driver(undefined,typeOfDriver,firstName,secondName,companyName,email,phone,address,duns,zipcode,city);
         console.log(Driver)
         const response= await Driver.createDriver(driver)
        return res.status(200).json({response}) 
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



router.post("/updateDriver",[
    check("idCustomer","Id of customer not provided").exists(),
    check("typeOfDriver","Type of Driver not provided").exists(),
    check("firstName","First name not provided").exists(),
    check("secondName","Second name not provided").exists(),
    check("companyName","Company not provided").exists(),
    check("email","Email not provided").exists(),
    check("phone","Phone not provided").exists(),
    check("address","Address not provided").exists(),
    check("duns","Duns not provided").exists(),
    check("zipcode","Zip code not provided").exists(),
    check("city","City not provided").exists(),
    ] ,async (req, res)=>{
        try {
            const errors =validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                  errors: errors.array(),
                  message: "Invalid data while creating a Driver",
                });
             }
             const {idCustomer,typeOfDriver,firstName,secondName,companyName,email,phone,address,duns,zipcode,city} = req.body;
             const driver = new Driver(idCustomer,typeOfDriver,firstName,secondName,companyName,email,phone,address,duns,zipcode,city);
             console.log(Driver);
             const response = await Driver.updateDriver(driver)
             return res.status(200).json({response})
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
router.post("/createVehicle",
    [
    check("typeOfVehicle","Type of Vehicle not provided").exists(),
    check("firstName","First name not provided").exists(),
    check("secondName","Second name not provided").exists(),
    check("companyName","Company not provided").exists(),
    check("email","Email not provided").exists(),
    check("phone","Phone not provided").exists(),
    check("address","Address not provided").exists(),
    check("duns","Duns not provided").exists(),
    check("zipcode","Zip code not provided").exists(),
    check("city","City not provided").exists(),
    ],async(req, res)=>{
    try {
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array(),
              message: "Invalid data while creating a Vehicle",
            });
         }
         const {typeOfVehicle,firstName,secondName,companyName,email,phone,address,duns,zipcode,city} = req.body;
         const vehicle = new Vehicle(undefined,typeOfVehicle,firstName,secondName,companyName,email,phone,address,duns,zipcode,city);
         console.log(vehicle)
         const response= await Vehicle.createVehicle(vehicle)
        return res.status(200).json({response}) 
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
router.post("/updateVehicle",[
    check("idCustomer","Id of customer not provided").exists(),
    check("typeOfVehicle","Type of Vehicle not provided").exists(),
    check("firstName","First name not provided").exists(),
    check("secondName","Second name not provided").exists(),
    check("companyName","Company not provided").exists(),
    check("email","Email not provided").exists(),
    check("phone","Phone not provided").exists(),
    check("address","Address not provided").exists(),
    check("duns","Duns not provided").exists(),
    check("zipcode","Zip code not provided").exists(),
    check("city","City not provided").exists(),
    ] ,async (req, res)=>{
        try {
            const errors =validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                  errors: errors.array(),
                  message: "Invalid data while creating a Vehicle",
                });
             }
             const {idCustomer,typeOfVehicle,firstName,secondName,companyName,email,phone,address,duns,zipcode,city} = req.body;
             const vehicle = new Vehicle(idCustomer,typeOfVehicle,firstName,secondName,companyName,email,phone,address,duns,zipcode,city);
             console.log(vehicle);
             const response = await Vehicle.updateVehicle(vehicle)
             return res.status(200).json({response})
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
module.exports = router;
