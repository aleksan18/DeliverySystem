const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator")
const { execute } = require("../database/mysql.connector")
const { User } = require("../model/user.model");
router.post("/createUser",
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
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data while creating a user",
                });
            }
            const { typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city } = req.body;
            const user = new User(null, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city);
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
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while creating a user",
            });
        }
        const { idCustomer, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city } = req.body;
        const user = new User(idCustomer, typeOfUser, firstName, secondName, companyName, email, phone, address, duns, zipcode, city);
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
                { value: error, msg: error.message },
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



