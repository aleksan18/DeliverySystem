const { Router } = require("express");
const router = Router();
const {check,validationResult} = require("express-validator")

const {Location} = require("../model/location.model");

router.post("/createLocation",
    [
    check("typeOfLocationId","Type of lcoation id not provided").exists(),
    check("address","Address not provided").exists(),
    check("zipCode","Zipc ode name not provided").exists(),
    check("cityId","City id not provided").exists(),
    
    ],async(req, res)=>{
    try {
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array(),
              message: "Invalid data while creating a location",
            });
         }
         const {typeOfLocationId, address, zipCode, cityId} = req.body;
         const location = new Location(undefined, typeOfLocationId,address,zipCode,cityId);
         console.log(location)
         const response= await Location.createLocation(location)
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

router.post("/getLocation", (req, res)=>{


})

module.exports = router;