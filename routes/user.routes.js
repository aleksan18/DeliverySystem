const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator")
const { execute } = require("../database/mysql.connector")
const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//add password to database
//add password to object
//
//error catching in models
router.post("/register",
    [
        check("typeOfUser", "Type of user not provided").exists(),
        check("firstName", "First name not provided").exists(),
        check("secondName", "Second name not provided").exists(),
        check("companyName", "Company not provided").exists(),
        check("email", "Email not provided").exists(),
        check("phone", "Phone not provided").exists(),
        check("address", "Address not provided").exists(),
        check("duns", "Duns not provided").exists(),
        check("zipcode", "Zip code not provided").exists(),
        check("city", "City not provided").exists(),
        check("password", "Password not provided").exists(),
        check("confirmPassword", "Password not provided").exists(),
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            const { typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city,password,confirmPassword} = req.body;
            
            if(password !== confirmPassword){
                return res.status(400).json({
                  message: "Confirm password is not correct",
                  errors: [{ value: "confirmPassword", msg: "Confirm password is not correct", param: "confirmPassword" }],
                });
              }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User(null, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city,hashedPassword);
            console.log(user)
            const { userCreated, createdUser }   = await User.createUser(user)
            if (userCreated) {
                return res.status(200).json({ response: { createdUser } });
        
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
router.post("/updateUser", [
    check("idCustomer", "Id of customer not provided").exists(),
    check("typeOfUser", "Type of user not provided").exists(),
    check("firstName", "First name not provided").exists(),
    check("secondName", "Second name not provided").exists(),
    check("companyName", "Company not provided").exists(),
    check("email", "Email not provided").exists(),
    check("phone", "Phone not provided").exists(),
    check("address", "Address not provided").exists(),
    check("duns", "Duns not provided").exists(),
    check("zipcode", "Zip code not provided").exists(),
    check("city", "City not provided").exists(),
    check("password", "Password not provided").exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while creating a user",
            });
        }
        const { idCustomer, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city,password} = req.body;
        const user = new User(idCustomer, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city,password);
        console.log(user);
        const { userInfoIsSame, updatedUser } = await User.updateUser(user)
        if (!userInfoIsSame && typeof updatedUser === 'object') {
            return res.status(200).json({ response: updatedUser });
        } else if (!userInfoIsSame && updatedUser === undefined) {
            return res.status(500).json({ response: { message: "Internal Server Error" } });
        } else if (userInfoIsSame) {
            return res.status(400).json({ response: updatedUser, message: "User was not updated, because the user info is the same" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Invalid data",
            errors: [
                { value: error.value, msg: error.message },
            ],
        });
    }

})
router.post("/login", async (req, res) => {
    try {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: "Invalid authorization data",
          });
        }
  
        const { email, password } = req.body;
        const user = await User.getUserByEmail(email)
        console.log(user);
        if (!user) {
            return res.status(400).json({
              message: "Invalid authorization data",
              errors: [{ value: email, msg: "User not found", param: "email" }],
            });
          }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
              message: "Invalid authorization data",
              errors: [
                { value: "", msg: "Wrong password, try again", param: "password" },
              ],
            });
        }

        const token = jwt.sign({ id: user.idcustomer }, process.env.JWT_SECRET, {
            expiresIn: "30m",
          });
        return res.status(200).json({ user,token:token,exp:token.exp });

    } catch (error) {
        console.log(error.value);
        return res.status(500).json({
          message: "Invalid data",
          errors: [
            { value: error.value, msg: error.message },
          ],
        });
    }
   
})
router.post("/getUser", async (req, res) => {

    const user = await User.getUser(43);
    console.log(user);
    const users = await User.getAllUsers();
    console.log(users);
    return res.status(200).json({ user });
})
router.get("/getUsers", async (req, res) => {

    const users = await User.getAllUsers();
    console.log(users);
    return res.status(200).json({ users });
})

// router.delete("/deleteUser",[
//   check("Id","User id not provided").exists(),
// ], 
// async(req, res)=>{
//   try {
//       const errors =validationResult(req);
//       if (!errors.isEmpty()) {
//           return res.status(400).json({
//             errors: errors.array(),
//             message: "Invalid data while deleting a user",
//           });
//        }
       
//        var {id} = req.body
//        const response = await User.deleteUser(id)
//        return res.status(200).json({response})
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//       message: "Invalid data",
//       errors: [
//           { value: error, msg: error.message },
//       ],
//   });
//   }

// })

module.exports = router;



