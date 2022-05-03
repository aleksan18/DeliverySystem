const { Router } = require("express");
const router = Router();
const {check,validationResult} = require("express-validator")
const {execute} = require("../database/mysql.connector")
const {User} = require("../model/user.model");
router.post("/createUser",
    [
    check("typeOfUser","Type of user not provided").exists(),
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
              message: "Invalid data while creating a user",
            });
         }
         const {typeOfUser,firstName,secondName,companyName,email,phone,address,duns,zipcode,city} = req.body;
         const user = new User(undefined,typeOfUser,firstName,secondName,companyName,email,phone,address,duns,zipcode,city);
         console.log(user)
         const response= await User.createUser(user)
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
router.post("/updateUser",[
    check("idCustomer","Id of customer not provided").exists(),
    check("typeOfUser","Type of user not provided").exists(),
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
                  message: "Invalid data while creating a user",
                });
             }
             const {idCustomer,typeOfUser,firstName,secondName,companyName,email,phone,address,duns,zipcode,city} = req.body;
             const user = new User(idCustomer,typeOfUser,firstName,secondName,companyName,email,phone,address,duns,zipcode,city);
             console.log(user);
             const response = await User.updateUser(user)
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
router.post("/getUser", (req, res)=>{


})

module.exports = router;



